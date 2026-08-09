import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { HttpSignatureService } from 'src/app/http/http-signature.service';
import SignaturePad from 'signature_pad';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signature-pad-online',
  templateUrl: './signature-pad-online.component.html',
  styleUrls: ['./signature-pad-online.component.scss']
})
export class SignaturePadOnlineComponent implements OnInit, AfterViewInit {
  @ViewChild('signCanvas') signCanvas!: ElementRef<HTMLCanvasElement>;
  private canvasWidth = 0;
  private canvasHeight = 0;

  form: any = {
    sign: null,
    data: []
  }
  signaturePad!: SignaturePad;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private $signature: HttpSignatureService

  ) { }

  async ngOnInit(): Promise<void> {
    let params: any = this.route.snapshot.queryParams
    if (!params?._id) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ไม่พบข้อมูล',
      }).then(() => {
        window.close();
      })
      return
    }

    const resExp: any = await lastValueFrom(this.$signature.getExp(
      new HttpParams()
        .set('_id', params._id)
        .set('m', params.m)
    ))
    if (!resExp || resExp?.status == false) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: resExp?.message || 'ไม่พบข้อมูล',
      }).then(() => {
        window.close();
      })
      return
    }

    this.form = {
      _id: params._id,
      m: params.m,
      Customer: resExp?.data?.machine?.Customer,
      Machine: resExp?.data?.machine?.Machine,
      Model: resExp?.data?.machine?.Model,
      Province: resExp?.data?.machine?.Province,
      ServiceTypeName: resExp?.data?.serviceType?.name || '-',
    }

    this.queueSignaturePadInit();
  }

  ngAfterViewInit(): void {
    this.queueSignaturePadInit();
  }

  private queueSignaturePadInit(): void {
    setTimeout(() => {
      this.initSignaturePad();
    }, 0);
  }

  private initSignaturePad(existingData: any[] = []): void {
    if (!this.signCanvas?.nativeElement) {
      return;
    }

    if (this.signaturePad) {
      this.signaturePad.off();
    }

    const canvas = this.signCanvas.nativeElement;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const parentWidth = canvas.parentElement?.getBoundingClientRect().width || 300;
    const width = Math.max(0, Math.floor(parentWidth));
    const height = 200;

    const previousWidth = this.canvasWidth || width;
    const previousHeight = this.canvasHeight || height;
    this.canvasWidth = width;
    this.canvasHeight = height;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext('2d');
    if (context) {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(ratio, ratio);
    }

    this.signaturePad = new SignaturePad(canvas, {
      penColor: '#10304a',
      backgroundColor: '#ffffff',
      minWidth: 1,
      maxWidth: 2.5,
    });

    if (existingData.length) {
      const scaleX = previousWidth > 0 ? width / previousWidth : 1;
      const scaleY = previousHeight > 0 ? height / previousHeight : 1;
      const resizedData = this.scaleSignatureData(existingData, scaleX, scaleY);
      this.signaturePad.fromData(resizedData);
    }
  }

  private scaleSignatureData(data: any[], scaleX: number, scaleY: number): any[] {
    return (data || []).map((strokeGroup: any) => ({
      ...strokeGroup,
      points: (strokeGroup?.points || []).map((point: any) => ({
        ...point,
        x: point.x * scaleX,
        y: point.y * scaleY
      }))
    }));
  }

  private exportSignatureDataUrl(paddingPx = 12): string {
    const sourceCanvas = this.signCanvas.nativeElement;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const extra = Math.round(paddingPx * ratio);
    const exportCanvas = document.createElement('canvas');

    exportCanvas.width = sourceCanvas.width + (extra * 2);
    exportCanvas.height = sourceCanvas.height + (extra * 2);

    const exportContext = exportCanvas.getContext('2d');
    if (!exportContext) {
      return this.signaturePad.toDataURL('image/png');
    }

    exportContext.fillStyle = '#ffffff';
    exportContext.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    exportContext.drawImage(sourceCanvas, extra, extra);
    return exportCanvas.toDataURL('image/png');
  }

  clearPad(): void {
    if (this.signaturePad) {
      this.signaturePad.clear();
    }
    this.form.sign = null;
  }

  async savePad(): Promise<void> {
    try {
      if (!this.signaturePad || this.signaturePad.isEmpty()) {
        Swal.fire({
          icon: 'warning',
          title: 'ยังไม่ได้เซ็น',
          text: 'กรุณาเซ็นก่อนกดบันทึก',
        });
        return;
      }

      this.form.sign = this.exportSignatureDataUrl();

      await firstValueFrom(this.$signature.updateSign({
        _id: this.form._id,
        m: this.form.m,
        sign: this.form.sign
      }))

      Swal.fire({
        icon: 'success',
        title: 'บันทึกสำเร็จ',
        text: 'บันทึกสำเร็จ',
      }).then(() => {
        window.close();
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'เกิดข้อผิดพลาดในการบันทึก',
      });
    }


  }

  onResize(): void {
    if (!this.signCanvas?.nativeElement) {
      return;
    }

    if (!this.signaturePad) {
      this.initSignaturePad();
      return;
    }

    const existingData = this.signaturePad.toData();
    this.initSignaturePad(existingData);
  }



}

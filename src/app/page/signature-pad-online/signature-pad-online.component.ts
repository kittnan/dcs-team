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

    this.initSignaturePad();
  }

  ngAfterViewInit(): void {
    this.initSignaturePad();
  }

  private initSignaturePad(): void {
    if (!this.signCanvas?.nativeElement) {
      return;
    }

    const canvas = this.signCanvas.nativeElement;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const parentWidth = canvas.parentElement?.clientWidth || 300;
    const width = Math.max(0, Math.floor(parentWidth));
    const height = 180;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext('2d');
    if (context) {
      context.scale(ratio, ratio);
    }

    this.signaturePad = new SignaturePad(canvas, {
      penColor: '#10304a',
      minWidth: 1,
      maxWidth: 2.5,
    });
  }

  clearPad(): void {
    if (this.signaturePad) {
      this.signaturePad.clear();
    }
    this.form.sign = null;
  }

  async savePad(): Promise<void> {
    if (!this.signaturePad || this.signaturePad.isEmpty()) {
      Swal.fire({
        icon: 'warning',
        title: 'ยังไม่ได้เซ็น',
        text: 'กรุณาเซ็นก่อนกดบันทึก',
      });
      return;
    }

    this.form.sign = this.signaturePad.toDataURL();

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

  }

  onResize(): void {
    if (!this.signCanvas?.nativeElement || !this.signaturePad) {
      return;
    }

    const existingData = this.signaturePad.toData();
    this.initSignaturePad();
    if (existingData.length && this.signaturePad) {
      this.signaturePad.fromData(existingData);
    }
  }



}

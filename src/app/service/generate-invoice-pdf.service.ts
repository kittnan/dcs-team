import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { lastValueFrom } from 'rxjs';
import { HttpReportService } from '../http/http-report.service';
import { HttpReportSpecialService } from '../http/http-report-special.service';
import { HttpReportPmService } from '../http/http-report-pm.service';
import { HttpReportPmSpecialService } from '../http/http-report-pm-special.service';
@Injectable({
  providedIn: 'root'
})
export class GenerateInvoicePdfService {
  constructor(
    private $loader: NgxUiLoaderService,
    private router: Router,
    private $report: HttpReportService,
    private $report_special: HttpReportSpecialService,
    private $report_pm: HttpReportPmService,
    private $report_pm_special: HttpReportPmSpecialService,

  ) { }
  generatePDF(id: any, name: string, orientation: any = 'p') {


    try {
      this.$loader.start();
      setTimeout(async () => {
        const div: any = document.querySelectorAll('#print');
        const options = {
          background: 'white',
          scale: 2.5,
        };
        var doc: any = new jsPDF(orientation, 'mm', 'a4');
        for (let index = 0; index < div.length; index++) {
          const d = div[index];
          const can = await html2canvas(d, options)
          let img = can.toDataURL('image/PNG');
          const bufferX = 5;
          const bufferY = 2;
          const imgProps = (<any>doc).getImageProperties(img);
          const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          if (div.length === 1) {
            doc = await doc.addImage(
              img,
              'PNG',
              bufferX,
              bufferY,
              pdfWidth,
              pdfHeight,
              undefined,
              'FAST'
            );
            await doc.save(`${name}.pdf`);
            this.$loader.stop()
          } else {
            if (index === 0) {
              doc = await doc.addImage(
                img,
                'PNG',
                bufferX,
                bufferY,
                pdfWidth,
                pdfHeight,
                undefined,
                'FAST'
              );
            } else {
              doc = await doc.addPage('a4', orientation);
              doc = await doc.addImage(
                img,
                'PNG',
                bufferX,
                bufferY,
                pdfWidth,
                pdfHeight,
                undefined,
                'FAST'
              );
              if (index + 1 === div.length) {
                //TODO save

                this.save_file(id, `${name}.pdf`, doc.output('arraybuffer'))
                await doc.save(`${name}.pdf`);
                this.$loader.stop()
              }
            }
          }



        }
      }, 100);
    } catch (error) {
      console.log("🚀 ~ error:", error)
      this.$loader.stop()
    }

  }

  //TODO save_file
  async save_file(id: any, fileName: string, pdfContent: Uint8Array) {
    try {
      if (fileName.includes('engineer-pm-report')) {
        const formData: FormData = new FormData();
        formData.append('path', `report-pm/engineer/${fileName}/`);
        formData.append('file', new Blob([pdfContent], { type: 'application/pdf' }), fileName);
        let resFile = await lastValueFrom(this.$report.upload(formData));
        if (resFile.length != 0) {
          let add_field = await lastValueFrom(this.$report_pm.update(id, { path_file: resFile[0].path }));
        }
      } else if (fileName.includes('special-pm-report')) {
        const formData: FormData = new FormData();
        formData.append('path', `report-pm/special/${fileName}/`);
        formData.append('file', new Blob([pdfContent], { type: 'application/pdf' }), fileName);
        let resFile = await lastValueFrom(this.$report.upload(formData));
        if (resFile.length != 0) {
          let add_field = await lastValueFrom(this.$report_pm_special.update(id, { path_file: resFile[0].path }));
        }
      } else if (fileName.includes('engineer')) {
        const formData: FormData = new FormData();
        formData.append('path', `report/engineer/${fileName}/`);
        formData.append('file', new Blob([pdfContent], { type: 'application/pdf' }), fileName);
        let resFile = await lastValueFrom(this.$report.upload(formData));
        if (resFile.length != 0) {
          let add_field = await lastValueFrom(this.$report.update(id, { path_file: resFile[0].path }));
        }
      } else if (fileName.includes('special')) {
        const formData: FormData = new FormData();
        formData.append('path', `report/special/${fileName}/`);
        formData.append('file', new Blob([pdfContent], { type: 'application/pdf' }), fileName);
        let resFile = await lastValueFrom(this.$report.upload(formData));
        if (resFile.length != 0) {
          let add_field = await lastValueFrom(this.$report_special.update(id, { path_file: resFile[0].path }));
        }
      }


    } catch (error) {
      console.error(error);
    }

  }
}

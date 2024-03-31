import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { lastValueFrom } from 'rxjs';
import { HttpReportService } from '../http/http-report.service';
import { HttpReportSpecialService } from '../http/http-report-special.service';
@Injectable({
  providedIn: 'root'
})
export class GenerateInvoicePdfService {
  constructor(
    private $loader: NgxUiLoaderService,
    private router: Router,
    private $report: HttpReportService,
    private $report_special: HttpReportSpecialService,

  ) { }
  generatePDF(id: any, name: string, orientation: any = 'p') {


    try {
      this.$loader.start();
      setTimeout(async () => {
        const div: any = document.querySelectorAll('#print');
        const options = {
          background: 'white',
          scale: 1.5,
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
                let foo = await doc.save(`${name}.pdf`);
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

      let path = fileName.split("-")[2].split(".")[0]
      const formData: FormData = new FormData();
      formData.append('path', `report/engineer/${path}/`);
      formData.append('file', new Blob([pdfContent], { type: 'application/pdf' }), fileName);
      if (fileName.split("-")[0] == 'engineer') {
        let resFile = await lastValueFrom(this.$report.upload(formData));
        if (resFile.length != 0) {
          let add_field = await lastValueFrom(this.$report.update(id, { path_file: resFile[0].path }));
        }
      }

      if (fileName.split("-")[0] == 'special') {
        let resFile = await lastValueFrom(this.$report.upload(formData));
        if (resFile.length != 0) {
          console.log(id);
          console.log(resFile[0].path);
          let add_field = await lastValueFrom(this.$report_special.update(id, { path_file: resFile[0].path }));

        }
      }
    } catch (error) {
      console.error(error);
    }

  }
}

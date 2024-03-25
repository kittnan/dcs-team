import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpReportSpecialService } from 'src/app/http/http-report-special.service';
import { HttpReportService } from 'src/app/http/http-report.service';
import { GenerateInvoicePdfService } from 'src/app/service/generate-invoice-pdf.service';

@Component({
  selector: 'app-report-multi-print-view',
  templateUrl: './report-multi-print-view.component.html',
  styleUrls: ['./report-multi-print-view.component.scss']
})
export class ReportMultiPrintViewComponent implements OnInit {
  forms: any = null
  dataPerPage: number = 7
  page: number = 1
  pageArr: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private $report: HttpReportService,
    private $reportSpecial: HttpReportSpecialService,
    private $pdf: GenerateInvoicePdfService
  ) { }

  ngOnInit(): void {
    let arr: any = []
    this.route.queryParams.subscribe(async (params: any) => {
      let _ids: any = params['_id']
      let param: HttpParams = new HttpParams().set('_id', JSON.stringify(_ids))
      const res = await lastValueFrom(this.$report.multi(param))
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        for (let ii = 0; ii < element.data.length; ii++) {
          const data = element.data[ii];
          if (data.files.length > 0) {
            let file = await lastValueFrom(this.$report.getFile(data.files[0].path))
            data.files[0].view = this.blobToBase64(file)
          }
        }
      }
      this.forms = res
      this.forms= this.forms.map((form: any) => {
        return {
          ...form,
          page: this.calculatorPageBreak(form.data.length),
          pageArr: Array.from(
            { length: this.page },
            (_, index) => index + 1
          )
        }


      })
      console.log("🚀 ~ this.forms:", this.forms)
    })
  }
  calculatorPageBreak(len: number) {
    return Math.ceil(len / this.dataPerPage);
  }
  blobToBase64(blob: Blob): Promise<string> {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        const base64data = reader.result as string;
        resolve(base64data);
      };
    });
  }

  getData(page: number, form: any) {
    let number = this.dataPerPage
    if (page !== 0) {
      return form.data.slice(page * number, (page * number) + number);
    }
    return form.data.slice(page, number);
  }

  onPrint() {
    try {
      this.$pdf.generatePDF(`engineer-report`, 'p')
    } catch (error) {
    }
  }

}

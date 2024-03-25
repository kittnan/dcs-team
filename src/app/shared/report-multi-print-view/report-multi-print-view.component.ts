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
      for (let i = 0; i < _ids.length; i++) {
        const _id = _ids[i];
        const params: HttpParams = new HttpParams().set('_id', _id)
        let res = await lastValueFrom(this.$report.get(params))
        arr.push(res[0])
        console.log("🚀 ~ arr:", arr)
        if (i + 1 == _ids.length) {
          this.forms = arr
        }
      }
    })
  }

  getData(page: number, form: any) {
    let number = this.dataPerPage
    if (page !== 0) {
      return form.data.slice(page * number, (page * number) + number);
    }
    return form.data.slice(page, number);
  }

  onPrint() {

  }

}

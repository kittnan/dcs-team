import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpReportSpecialService } from 'src/app/http/http-report-special.service';
import { HttpReportService } from 'src/app/http/http-report.service';
import { GenerateInvoicePdfService } from 'src/app/service/generate-invoice-pdf.service';
@Component({
  selector: 'app-report-special-print',
  templateUrl: './report-special-print.component.html',
  styleUrls: ['./report-special-print.component.scss']
})
export class ReportSpecialPrintComponent implements OnInit {


  form: any = null
  dataPerPage: number = 6
  page: number = 1
  pageArr: any[] = [];

  constructor(
    private $pdf: GenerateInvoicePdfService,
    private router: Router,
    private route: ActivatedRoute,
    private $report: HttpReportSpecialService
  ) { }

  ngOnInit(): void {
    try {
      this.route.queryParams.subscribe(async (params: any) => {
        if (params && params['_id']) {
          let _id = params['_id']
          const resReport = await lastValueFrom(this.$report.get(new HttpParams().set('_id', _id)))
          if (resReport && resReport.length > 0) {
            this.form = resReport[0]

            for (let index = 0; index < this.form.data.length; index++) {
              const data = this.form.data[index];
              if (data.files.length > 0) {
                let file = await lastValueFrom(this.$report.getFile(data.files[0].path))
                data.files[0].view = this.blobToBase64(file)
              }
            }

            this.page = this.calculatorPageBreak(this.form.data.length);
            this.pageArr = Array.from(
              { length: this.page },
              (_, index) => index + 1
            );
              this.onPrint()
          }
        }
      })
    } catch (error) {
    }
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    // this.onPrint()
  }

  ngAfterViewInit(): void {

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
  calculatorPageBreak(len: number) {
    return Math.ceil(len / this.dataPerPage);
  }

  onPrint() {
    try {
      this.$pdf.generatePDF(`engineer-report-${this.form.no}`, 'p')
    } catch (error) {
    }
  }
  getData(page: number) {
    let number = this.dataPerPage
    if (page !== 0) {
      return this.form.data.slice(page * number, (page * number) + number);
    }
    return this.form.data.slice(page, number);
  }

}

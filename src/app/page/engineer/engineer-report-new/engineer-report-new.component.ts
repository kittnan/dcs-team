import { Component, OnInit } from '@angular/core';
import { GenerateInvoicePdfService } from 'src/app/service/generate-invoice-pdf.service';

@Component({
  selector: 'app-engineer-report-new',
  templateUrl: './engineer-report-new.component.html',
  styleUrls: ['./engineer-report-new.component.scss']
})
export class EngineerReportNewComponent implements OnInit {
  pageArr: any[] = [];

  options = [
    '0',
    '1',
    '2',
    '3',
  ]
  data: any[] = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
  ]
  constructor(
    private $pdf: GenerateInvoicePdfService
  ) { }

  ngOnInit(): void {
  }
  getData(page: number) {
    let number = 5
    if (page !== 0) {
      return this.data.slice(page * number, (page * number) + number);
    }
    return this.data.slice(page, number);
  }
  onPrint(){
    try {
      this.$pdf.generatePDF('foo','p')
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }

}

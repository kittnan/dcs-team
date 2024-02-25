import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpUsersService } from 'src/app/http/http-api';
import { GenerateInvoicePdfService } from 'src/app/service/generate-invoice-pdf.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-engineer-report-new',
  templateUrl: './engineer-report-new.component.html',
  styleUrls: ['./engineer-report-new.component.scss']
})
export class EngineerReportNewComponent implements OnInit {
  pageArr: any[] = [];
  page: number = 1
  dataPerPage: number = 9

  dataTemplate = {
    img: null,
    text: null,
    no: null
  }
  data: any[] = []

  customerOption: any = []
  customerSelected: any
  machineOption: any = []
  machineSelected: any

  serviceTypeOption: any = [
    {
      value: 1,
      name: 'ติดตั้งเครื่อง (Installation)',
    },
    {
      value: 2,
      name: 'ยกเครื่องกลับ',
    },
    {
      value: 3,
      name: 'เรียกซ่อม',
    },
    {
      value: 4,
      name: 'บำรุงรักษาตามระยะเวลา (PM)',
    },
    {
      value: 5,
      name: 'เปลื่ยนอะไหล่',
    },

  ]
  serviceTypeSelected: any

  userLogin: any
  constructor(
    private $pdf: GenerateInvoicePdfService,
    private $api: HttpUsersService,
    private $local: LocalStorageService
  ) {
    for (let index = 0; index <= 12; index++) {
      let newData: any = this.dataTemplate
      newData.no = index + 1
      this.data.push(newData)
    }
  }

  async ngOnInit(): Promise<void> {
    let user: any = this.$local.getProfile()
    this.userLogin = user
    console.log("🚀 ~ this.userLogin:", this.userLogin)
    const machine = await lastValueFrom(this.$api.Master_getall())
    this.customerOption = machine
    this.page = this.calculatorPageBreak(this.data.length);
    this.pageArr = Array.from(
      { length: this.page },
      (_, index) => index + 1
    );
  }
  getData(page: number) {
    let number = this.dataPerPage
    if (page !== 0) {
      return this.data.slice(page * number, (page * number) + number);
    }
    return this.data.slice(page, number);
  }
  onPrint() {
    try {
      this.$pdf.generatePDF('foo', 'p')
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }

  calculatorPageBreak(len: number) {
    return Math.ceil(len / this.dataPerPage);
  }

  // todo onSelectCustomer
  onSelectCustomer() {
    console.log(this.customerSelected);
    this.machineSelected = null
    this.machineOption = this.customerOption.filter((item: any) => item['Customer'] == this.customerSelected['Customer'])
  }


  // todo signed
  signChange($event: any) {
    console.log($event);
  }

  // todo onAddPage
  onAddPage() {
    let insertArray = [];
    for (let index = 0; index < this.dataPerPage; index++) {
      let newData: any = this.dataTemplate
      newData.no = index + 1
      insertArray.push(newData)
    }
    this.data.splice(this.data.length - 6, 0, ...insertArray);
    console.log("🚀 ~ this.data:", this.data)
    this.page = this.calculatorPageBreak(this.data.length);
    this.pageArr = Array.from(
      { length: this.page },
      (_, index) => index + 1
    );
  }
}

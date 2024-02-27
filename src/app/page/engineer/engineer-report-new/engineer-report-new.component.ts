import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { HttpUsersService } from 'src/app/http/http-api';
import { HttpReportService } from 'src/app/http/http-report.service';
import { GenerateInvoicePdfService } from 'src/app/service/generate-invoice-pdf.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

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
    saveImg: null,
    text: null,
    no: null
  }
  form: any = null
  date = new Date()
  time = null
  end = moment().format('DD-MMM-YY')
  endTime = null

  customerOption: any = []
  machineOption: any = []

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

  userLogin: any
  constructor(
    private $pdf: GenerateInvoicePdfService,
    private $api: HttpUsersService,
    private $local: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private $report: HttpReportService
  ) {

  }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(async (params: any) => {
      if (params && params['_id']) {
        let _id = params['_id']
        const resReport = await lastValueFrom(this.$report.get(new HttpParams().set('_id', _id)))
        if (resReport && resReport.length > 0) {
          this.form = resReport[0]
          console.log("🚀 ~ this.form:", this.form)
          const machine = await lastValueFrom(this.$api.Master_getall())
          this.customerOption = machine

          if (this.form.data && this.form.data.length > 0) {
            this.page = this.calculatorPageBreak(this.form.data.length);
            this.pageArr = Array.from(
              { length: this.page },
              (_, index) => index + 1
            );
          } else {
            this.form.data = []
            for (let index = 0; index <= 12; index++) {
              const newData: any = { ...this.dataTemplate }
              newData.no = index + 1
              this.form.data.push(newData)
            }
            this.page = this.calculatorPageBreak(this.form.data.length);
            this.pageArr = Array.from(
              { length: this.page },
              (_, index) => index + 1
            );

          }
          if (this.form.customer) {
            this.machineOption = this.customerOption.filter((item: any) => item['Customer'] == this.form.customer['Customer'])
          }

        }
      } else {
        for (let index = 0; index <= 12; index++) {
          const newData: any = { ...this.dataTemplate }
          newData.no = index + 1
          this.form.data.push(newData)
        }
        const machine = await lastValueFrom(this.$api.Master_getall())
        this.customerOption = machine
        this.page = this.calculatorPageBreak(this.form.data.length);
        this.pageArr = Array.from(
          { length: this.page },
          (_, index) => index + 1
        );
      }
    })

    let user: any = this.$local.getProfile()
    this.userLogin = user

  }
  getData(page: number) {
    let number = this.dataPerPage
    if (page !== 0) {
      return this.form.data.slice(page * number, (page * number) + number);
    }
    return this.form.data.slice(page, number);
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
    this.form.machine = null
    this.machineOption = this.customerOption.filter((item: any) => item['Customer'] == this.form.customer['Customer'])
  }


  // todo signed
  signChange($event: any) {
    console.log($event);
    this.form.sign = $event
  }

  // todo onAddPage
  onAddPage() {
    let insertArray = [];
    for (let index = 0; index < this.dataPerPage; index++) {
      let newData: any = { ...this.dataTemplate }
      newData.no = index + 1
      insertArray.push(newData)
    }
    this.form.data.splice(this.form.data.length - 6, 0, ...insertArray);
    this.form.data = this.form.data.map((item: any, index: number) => {
      item.no = index + 1
      return item
    })
    console.log("🚀 ~ this.form.data:", this.form.data)
    this.page = this.calculatorPageBreak(this.form.data.length);
    this.pageArr = Array.from(
      { length: this.page },
      (_, index) => index + 1
    );
  }

  // todo onSave
  onSave() {
    try {

      Swal.fire({
        title: 'Do you want to save?',
        icon: 'question',
        showCancelButton: true,
      }).then((v: SweetAlertResult) => {
        if (v.isConfirmed) {
          this.save()
        }
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  async save() {
    try {
      console.log(this.form);
      this.form.userLogin = this.userLogin
      this.form.data = this.form.data
      const res = await lastValueFrom(this.$report.save(this.form))
      console.log("🚀 ~ res:", res)
      Swal.fire({
        title: "Success",
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  // todo onUpload
  async onUpload($event: any, index: number) {
    try {
      const file = $event.target.files[0]
      if (!file) throw 'Please upload file'
      const formData: FormData = new FormData()
      formData.append('file', file)
      const resFile = await lastValueFrom(this.$report.upload(formData))
      this.form.data[index - 1].img = resFile.readPath
      this.form.data[index - 1].saveImg = resFile.savePath
      console.log(this.form.data);
      const res = await lastValueFrom(this.$report.save(this.form))

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }

  }

  onFinish(){
    try {

    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }

  public objectComparisonFunction_id = function (option: any, value: any): boolean {
    return option.id === value.id;
  }
  public objectComparisonFunction_machine = function (option: any, value: any): boolean {
    return option.Machine === value.Machine;
  }
}

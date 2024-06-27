import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { HttpMastersService } from 'src/app/http/http-masters.service';
import { HttpPMService } from 'src/app/http/http-pm.service';
import { HttpReportPmService } from 'src/app/http/http-report-pm.service';
import { HttpReportService } from 'src/app/http/http-report.service';
import { HttpServiceTypeService } from 'src/app/http/http-serviceType.service';
import { HttpTasksService } from 'src/app/http/http-tasks.service';
import { GenerateInvoicePdfService } from 'src/app/service/generate-invoice-pdf.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { SignaturePadComponent } from 'src/app/shared/signature-pad/signature-pad.component';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-engineer-pm-report-new',
  templateUrl: './engineer-pm-report-new.component.html',
  styleUrls: ['./engineer-pm-report-new.component.scss']
})
export class EngineerPmReportNewComponent implements OnInit {
  pageArr: any[] = [];
  page: number = 1
  dataPerPage: number = 6
  dataStarter: number = 21

  dataTemplate = {
    files: [],
    text: null,
    no: null
  }
  form: any = null
  date: any = new Date()
  time: any = null
  end: any = moment().format('DD-MMM-YY')
  endTime: any = null

  customerOption: any = []
  customerCtrl: FormControl = new FormControl('')
  customerOptionStr: any = []
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

  pmOption: any[] = []
  pmItems: any[] = []
  userLogin: any

  formOption: any
  formSelect: any = 1

  @ViewChild('fileUpload') fileUpload!: ElementRef;
  constructor(
    private $pdf: GenerateInvoicePdfService,
    // private $api: HttpUsersService,
    private $master: HttpMastersService,
    private $local: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private $report: HttpReportPmService,
    private $serviceType: HttpServiceTypeService,
    public dialog: MatDialog,
    private $pmList: HttpPMService,
    private $task: HttpTasksService
  ) {

  }

  async ngOnInit(): Promise<void> {
    let serviceType = await lastValueFrom(this.$serviceType.getAll())
    this.serviceTypeOption = serviceType

    let pmOption = await lastValueFrom(this.$pmList.getAll())
    if (pmOption && pmOption.length > 0) {
      pmOption = pmOption.sort((a: any, b: any) => {
        if (a.form < b.form) {
          return -1;
        } else if (a.form > b.form) {
          return 1;
        } else {
          if (a.no < b.no) {
            return -1;
          } else if (a.no > b.no) {
            return 1;
          } else {
            return 0;
          }
        }
      });
    }
    // this.formOption = [...new Set(pmOption.map((item: any) => item.form))]
    this.formOption = [...new Map(pmOption.map((item: any) =>
      [item['form'], item])).values()];
    this.pmItems = pmOption
    this.pmOption = pmOption.filter((data: any) => data.form == this.formSelect)
    this.dataStarter = this.pmOption.length

    this.route.queryParams.subscribe(async (params: any) => {
      if (params && params['_id']) {
        let _id = params['_id']
        const resReport = await lastValueFrom(this.$report.get(new HttpParams().set('_id', _id)))
        if (resReport && resReport.length > 0) {
          this.form = resReport[0]
          this.formSelect = this.form.form ? this.form.form : 1
          if (this.form.startDate) {
            this.date = moment(this.form.startDate)
            this.time = moment(this.form.startDate).format('HH:mm')
          }
          if (this.form.finishDate) {
            this.end = moment(this.form.finishDate)
            this.endTime = moment(this.form.finishDate).format('HH:mm')
          }
          const machine = await lastValueFrom(this.$master.Master_getall())
          this.customerOption = machine
          const customers = this.customerOption.map((m: any) => m['Customer'])
          this.customerOptionStr = [...new Set(customers)]



          if (this.form.data && this.form.data.length > 0) {
            for (let index = 0; index < this.form.data.length; index++) {
              const data = this.form.data[index];
              if (data && data.files.length > 0) {
                let file = await lastValueFrom(this.$report.getFile(data.files[0].path))
                data.files[0].view = this.blobToBase64(file)
              }
            }
            this.page = this.calculatorPageBreak(this.form.data.length);
            this.pageArr = Array.from(
              { length: this.page },
              (_, index) => index + 1
            );


          } else {
            this.form.data = []
            for (let index = 0; index < this.dataStarter; index++) {
              const newData: any = { ...this.dataTemplate }
              newData.no = index + 1
              newData.text = `${this.pmOption[index].no.toString().padStart(2, '0')}.${this.pmOption[index].name}`
              this.form.data.push(newData)
            }
            this.page = this.calculatorPageBreak(this.form.data.length);
            this.pageArr = Array.from(
              { length: this.page },
              (_, index) => index + 1
            );

          }
          if (this.form.customer) {
            this.customerCtrl.setValue(this.form.customer['Customer'])
            this.machineOption = this.customerOption.filter((item: any) => item['Customer'] == this.form.customer['Customer'])

          }

        }
      } else {

      }
    })

    let user: any = this.$local.getProfile()
    this.userLogin = user
  }

  onSelectForm() {
    this.pmOption = this.pmItems.filter((data: any) => data.form == this.formSelect)
    this.dataStarter = this.pmOption.length

    this.form.data = []
    for (let index = 0; index < this.dataStarter; index++) {
      const newData: any = { ...this.dataTemplate }
      newData.no = index + 1
      newData.text = `${this.pmOption[index].no.toString().padStart(2, '0')}.${this.pmOption[index].name}`
      this.form.data.push(newData)
    }
    this.page = this.calculatorPageBreak(this.form.data.length);
    this.pageArr = Array.from(
      { length: this.page },
      (_, index) => index + 1
    );

    if (this.form.customer) {
      this.customerCtrl.setValue(this.form.customer['Customer'])
      this.machineOption = this.customerOption.filter((item: any) => item['Customer'] == this.form.customer['Customer'])

    }
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
  getData(page: number) {
    let number = this.dataPerPage
    if (page !== 0) {
      return this.form.data.slice(page * number, (page * number) + number);
    }
    return this.form.data.slice(page, number);
  }

  calculatorPageBreak(len: number) {
    return Math.ceil(len / this.dataPerPage);
  }

  // todo onSelectCustomer
  onSelectCustomer(event: any) {
    this.form.machine = null
    const customer = this.customerOption.find((cus: any) => cus['Customer'] == event)
    this.form.customer = customer
    this.machineOption = this.customerOption.filter((item: any) => item['Customer'] == event)
  }



  // todo signed
  onClickSignature() {
    const dialog = this.dialog.open(SignaturePadComponent, {
      data: null,
      disableClose: true,

    })

    dialog.afterClosed().subscribe(async (data: any) => {
      if (data) {
        this.form.sign = data
        await this.saveCustom()

      }
    })
  }



  // todo onSave
  onSave() {
    try {

      Swal.fire({
        title: 'Save?',
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
      this.form.form = this.formSelect
      this.form.userLogin = this.userLogin
      this.form.data = this.form.data
      let timeStr1: string = this.time ? this.time.toString() : ''
      let sps1: any = timeStr1.split(':')
      if (sps1 && sps1.length == 2) {
        this.form.startDate = moment(this.date).set('hour', sps1[0]).set('minute', sps1[1])
      }

      let timeStr2: string = this.endTime ? this.endTime.toString() : ''
      let sps2: any = timeStr2.split(':')
      if (sps2 && sps2.length == 2) {
        this.form.finishDate = moment(this.end).set('hour', sps2[0]).set('minute', sps2[1])
      }

      await this.saveCustom()
      Swal.fire({
        title: "Success",
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.router.navigate(['engineer/pm-report'])
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
      formData.append('path', `report-pm/engineer/${this.form.no}/`)
      formData.append('file', file)
      const resFile = await lastValueFrom(this.$report.upload(formData))
      this.form.data[index - 1]['files'] = resFile


      await this.saveCustom()

      let newFile = await lastValueFrom(this.$report.getFile(this.form.data[index - 1]['files'][0].path))
      let fileBase64 = this.blobToBase64(newFile)
      this.form.data[index - 1]['files'][0]['view'] = fileBase64

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }

  }

  // todo on delete file
  onDeleteFile(file: any, itemNo: number) {
    try {
      Swal.fire({
        title: 'Delete?',
        icon: 'warning',
        showCancelButton: true
      }).then(async (v: SweetAlertResult) => {
        if (v.isConfirmed) {
          await lastValueFrom(this.$report.delete({
            path_file: file.delete_path
          }))
          const item = this.form.data.find((item: any) => item.no == itemNo)
          item['files'] = []

          await this.saveCustom()
          Swal.fire({
            title: 'Success',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }


  onFinish() {
    try {
      Swal.fire({
        title: 'Finish ?',
        icon: 'question',
        showCancelButton: true
      }).then(async (v: SweetAlertResult) => {
        if (v.isConfirmed) {
          this.form.form = this.formSelect
          this.form.status = 'finish'
          let timeStr1: string = this.time ? this.time.toString() : ''
          let sps1: any = timeStr1.split(':')
          if (sps1 && sps1.length == 2) {
            this.form.startDate = moment(this.date).set('hour', sps1[0]).set('minute', sps1[1])
          }

          let timeStr2: string = this.endTime ? this.endTime.toString() : ''
          let sps2: any = timeStr2.split(':')
          if (sps2 && sps2.length == 2) {
            this.form.finishDate = moment(this.end).set('hour', sps2[0]).set('minute', sps2[1])
          }
          await this.saveCustom()
          await lastValueFrom(this.$task.updateLastPM({ machine_id: this.form.machine._id }))
          Swal.fire({
            title: "Success",
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['engineer/pm-report'])
          })
        }
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }

  onCancel() {
    try {
      Swal.fire({
        title: 'Cancel ?',
        icon: 'warning',
        showCancelButton: true
      }).then(async (v: SweetAlertResult) => {
        if (v.isConfirmed) {
          this.form.status = 'cancel'
          const res = await lastValueFrom(this.$report.update(this.form._id, { status: 'cancel' }))
          Swal.fire({
            title: "Success",
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['engineer/pm-report'])
          })
        }
      })
    } catch (error) {

    }
  }

  public objectComparisonFunction_id = function (option: any, value: any): boolean {
    return option._id === value._id;
  }
  public objectComparisonFunction_machine = function (option: any, value: any): boolean {
    return option.Machine === value.Machine;
  }
  public objectComparisonFunction_form = function (option: any, value: any): boolean {
    return option === value;
  }

  // todo custom save without base64
  saveCustom() {
    let newForm: any = JSON.parse(JSON.stringify(this.form));
    const newData = newForm.data.map((data: any) => {
      data.files = data.files.map((file: any) => {
        delete file.view
        return file
      })
      return data
    })
    newForm.data = newData
    return lastValueFrom(this.$report.save(newForm))
  }
}

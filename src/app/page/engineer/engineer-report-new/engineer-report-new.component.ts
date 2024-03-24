import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { HttpMastersService } from 'src/app/http/http-masters.service';
import { HttpReportService } from 'src/app/http/http-report.service';
import { HttpServiceTypeService } from 'src/app/http/http-serviceType.service';
import { GenerateInvoicePdfService } from 'src/app/service/generate-invoice-pdf.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { SignaturePadComponent } from 'src/app/shared/signature-pad/signature-pad.component';
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
    files: [],
    text: null,
    no: null
  }
  form: any = null
  date : any= new Date()
  time: any = null
  end : any= moment().format('DD-MMM-YY')
  endTime: any = null

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

  @ViewChild('fileUpload') fileUpload!: ElementRef;
  constructor(
    private $pdf: GenerateInvoicePdfService,
    // private $api: HttpUsersService,
    private $master: HttpMastersService,
    private $local: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private $report: HttpReportService,
    private $serviceType: HttpServiceTypeService,
    public dialog: MatDialog,
  ) {

  }

  async ngOnInit(): Promise<void> {
    let serviceType = await lastValueFrom(this.$serviceType.getAll())
    this.serviceTypeOption = serviceType

    this.route.queryParams.subscribe(async (params: any) => {
      if (params && params['_id']) {
        let _id = params['_id']
        const resReport = await lastValueFrom(this.$report.get(new HttpParams().set('_id', _id)))
        console.log("🚀 ~ resReport:", resReport)
        if (resReport && resReport.length > 0) {
          this.form = resReport[0]
          if(this.form.startDate){
            this.date = moment(this.form.startDate)
            this.time = moment(this.form.startDate).format('HH:mm')
            console.log("🚀 ~ this.time:", this.time)
          }
          if(this.form.finishDate){
            this.end = moment(this.form.finishDate)
            console.log("🚀 ~ this.end:", this.end)
            this.endTime = moment(this.form.finishDate).format('HH:mm')
          }
          const machine = await lastValueFrom(this.$master.Master_getall())
          this.customerOption = machine



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
        const machine = await lastValueFrom(this.$master.Master_getall())
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
  onClickSignature() {
    const dialog = this.dialog.open(SignaturePadComponent, {
      data: null,
      disableClose: true,
      // width:'100%',
      // height:'100%'
    })

    dialog.afterClosed().subscribe(async (data: any) => {
      if (data) {
        this.form.sign = data
        const res = await lastValueFrom(this.$report.save(this.form))
        Swal.fire({
          title: "Success",
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
        })
      }
    })
  }


  // todo onAddPage
  onAddPage() {
    let insertArray = [];
    let lastNo = this.form.data.slice(-1)
    lastNo = lastNo[0].no
    for (let index = 0; index < this.dataPerPage; index++) {
      let newData: any = { ...this.dataTemplate }
      newData.no = lastNo + 1 + index
      insertArray.push(newData)
    }
    this.form.data.push(...insertArray)

    // this.form.data.splice(this.form.data.length - 6, 0, ...insertArray);
    // this.form.data = this.form.data.map((item: any, index: number) => {
    //   item.no = index + 1
    //   return item
    // })
    // console.log("🚀 ~ this.form.data:", this.form.data)
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
      const res = await lastValueFrom(this.$report.save(this.form))
      Swal.fire({
        title: "Success",
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.router.navigate(['engineer'])
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  // // todo click img
  // onClickImage(no:any){
  //   this._bottomSheet.open(BottomSheetEngComponent).afterDismissed().subscribe((data:any)=>{
  //     console.log(data);
  //     if(data && data=='edit'){
  //       this.fileUpload.nativeElement.click();
  //     }
  //   })
  // }

  // todo onUpload
  async onUpload($event: any, index: number) {
    try {
      const file = $event.target.files[0]
      if (!file) throw 'Please upload file'
      const formData: FormData = new FormData()
      formData.append('path', `report/${this.form.no}/engineer/`)
      formData.append('file', file)
      const resFile = await lastValueFrom(this.$report.upload(formData))
      this.form.data[index - 1]['files'] = resFile
      const res = await lastValueFrom(this.$report.save(this.form))
      for (let index = 0; index < this.form.data.length; index++) {
        const data = this.form.data[index];
        if (data.files.length > 0) {
          let file = await lastValueFrom(this.$report.getFile(data.files[0].path))
          data.files[0].view = this.blobToBase64(file)
        }
      }
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
          const res = await lastValueFrom(this.$report.save(this.form))
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
          const res = await lastValueFrom(this.$report.save(this.form))
          Swal.fire({
            title: "Success",
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['engineer'])
          })
        }
      })
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

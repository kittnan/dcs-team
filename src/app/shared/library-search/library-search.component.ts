import { SelectionModel } from '@angular/cdk/collections';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { HttpMastersService } from 'src/app/http/http-masters.service';
import { HttpReportSpecialService } from 'src/app/http/http-report-special.service';
import { HttpReportService } from 'src/app/http/http-report.service';
import { HttpServiceTypeService } from 'src/app/http/http-serviceType.service';
import { HttpUsersService } from 'src/app/http/http-users.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-library-search',
  templateUrl: './library-search.component.html',
  styleUrls: ['./library-search.component.scss']
})
export class LibrarySearchComponent implements OnInit {


  displayedColumns: string[] = ['select', 'reportNo', 'report', 'type', 'createdAt', 'province', 'customer', 'model', 'serviceType', 'status'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource()

  userLogin: any

  dataFilter: any = {}

  selected: any = null
  typeOption: string[] = ['engineer', 'special']
  reportOption: string[] = ['report', 'pm']
  serviceTypeOption: any = []

  customerOption: any = []
  customerCtrl: FormControl = new FormControl('')
  customerOptionStr: any = []
  machineOption: any = []

  userOption: any = []


  show: boolean = true
  constructor(
    private router: Router,
    private $report: HttpReportService,
    private $reportSpecial: HttpReportSpecialService,
    private $local: LocalStorageService,
    private $serviceType: HttpServiceTypeService,
    private $master: HttpMastersService,
    private $user: HttpUsersService
  ) {
    let user: any = this.$local.getProfile()
    this.userLogin = user
  }

  async ngOnInit(): Promise<void> {
    try {
      let serviceType = await lastValueFrom(this.$serviceType.getAll())
      this.serviceTypeOption = serviceType

      let userOption = await lastValueFrom(this.$user.getByCondition(new HttpParams().set('permission', JSON.stringify(['engineer', 'special']))))
      this.userOption = userOption

      const machine = await lastValueFrom(this.$master.Master_get())
      this.customerOption = machine
      const customers = this.customerOption.map((m: any) => m['Customer'])
      this.customerOptionStr = [...new Set(customers)]

      this.machineOption = [...new Map(machine.map((item: any) =>
        [item['Machine'], item])).values()];

    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }

  // todo onSelectCustomer
  onSelectCustomer(event: any) {
    this.dataFilter.customer = event
    this.dataFilter.machine = null
    const customer = this.customerOption.find((cus: any) => cus['Customer'] == event)
    this.dataFilter.customer = customer

    if (this.dataFilter.customer) {
      this.machineOption = this.customerOption.filter((item: any) => item['Customer'] == event)
    } else {
      this.machineOption = [...new Map(this.customerOption.map((item: any) =>
        [item['Machine'], item])).values()];
    }
  }

  async onSubmit() {
    try {


      let customer: any = this.dataFilter.customer ? JSON.stringify(this.dataFilter.customer.Customer) : null
      let machine: any = this.dataFilter.machine ? JSON.stringify(this.dataFilter.machine.Machine) : null
      let service: any = this.dataFilter.service ? JSON.stringify(this.dataFilter.service.value) : null
      let report: any = this.dataFilter.report ? JSON.stringify(this.dataFilter.report) : null
      let type: any = this.dataFilter.type ? JSON.stringify(this.dataFilter.type) : null
      let user: any = this.dataFilter.user ? JSON.stringify(this.dataFilter.user) : null
      let sn: any = this.dataFilter.sn ? JSON.stringify(this.dataFilter.sn) : null
      let finishPeriodDateStart: any = this.dataFilter.finishPeriodDateStart ? JSON.stringify(this.dataFilter.finishPeriodDateStart) : null
      let finishPeriodDateEnd: any = this.dataFilter.finishPeriodDateEnd ? JSON.stringify(this.dataFilter.finishPeriodDateEnd) : null
      let installPeriodDateStart: any = this.dataFilter.installPeriodDateStart ? JSON.stringify(this.dataFilter.installPeriodDateStart) : null
      let installPeriodDateEnd: any = this.dataFilter.installPeriodDateEnd ? JSON.stringify(this.dataFilter.installPeriodDateEnd) : null

      let params: HttpParams = new HttpParams()
      params = params.set('customer', customer)
      params = params.set('machine', machine)
      params = params.set('report', report)
      params = params.set('service', service)
      params = params.set('type', type)
      params = params.set('user', user)
      params = params.set('sn', sn)
      params = params.set('finishPeriodDateStart', finishPeriodDateStart)
      params = params.set('finishPeriodDateEnd', finishPeriodDateEnd)
      params = params.set('installPeriodDateStart', installPeriodDateStart)
      params = params.set('installPeriodDateEnd', installPeriodDateEnd)
      const res = await lastValueFrom(this.$report.multi(params))
      this.dataSource = new MatTableDataSource(res.map((item: any) => {
        return {
          ...item,
          reportNo: item.no,
          createdAt: moment(item.createdAt).format('DD-MMM-YY, HH:mm'),
          province: item.customer?.Province || item.province || '',
          customer: item.customer?.Customer || item.customer || '',
          machine: item.customer?.Machine || item.machine || '',
          model: item.customer?.Model || item.model || '',
          serviceType: item.serviceType?.name || item.serviceType || '',
          status: item.status,
          action: '',
          _id: item._id
        }
      }))
      this.onRefresh()

      // if (this.selected == 'engineer') {
      //   const res = await lastValueFrom(this.$report.get(params))
      //   this.dataSource = new MatTableDataSource(res.map((r: any) => {
      //     return {
      //       reportNo: r.no,
      //       province: r.customer ? r.customer['Province'] : '',
      //       customer: r.customer ? r.customer['Customer'] : "",
      //       machine: r.customer ? r.customer['Machine'] : '',
      //       sn: r.customer ? r.customer['S/N'] : "",
      //       status: r.status,
      //       _id: r._id
      //     }
      //   }))
      // }
      // if (this.selected == 'special') {

      // }
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  onRefresh() {
    this.show = false
    setTimeout(() => {
      this.show = true
    }, 200);
  }

  onClearFilter() {
    this.dataFilter = {}
    this.customerCtrl.setValue('')
    this.machineOption = [...new Map(this.customerOption.map((item: any) =>
      [item['Machine'], item])).values()]
  }

  onExportCsv() {
    const rows = this.dataSource.data || []
    if (rows.length === 0) {
      return
    }

    const headers = ['Report No', 'Report', 'Type', 'Created At', 'Province', 'Customer', 'Model', 'Service Type', 'Status']
    const csvRows = rows.map((item: any) => [
      item.reportNo,
      item.report,
      item.type,
      item.createdAt,
      item.province,
      item.customer,
      item.model,
      item.serviceType,
      item.status
    ].map((value: any) => this.escapeCsv(value)).join(','))

    const csvContent = [headers.join(','), ...csvRows].join('\r\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, 19)
    link.setAttribute('download', `library-search-${timestamp}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  private escapeCsv(value: any): string {
    const safeValue = value === null || value === undefined ? '' : String(value)
    return `"${safeValue.replace(/"/g, '""')}"`
  }

  public objectComparisonFunction_id = function (option: any, value: any): boolean {
    return option._id === value._id;
  }
  public objectComparisonFunction_machine = function (option: any, value: any): boolean {
    return option.Machine === value.Machine;
  }

}

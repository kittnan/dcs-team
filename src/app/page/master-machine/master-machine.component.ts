import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
// import { HttpService } from 'src/app/service/http.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-master-machine',
  templateUrl: './master-machine.component.html',
  styleUrls: ['./master-machine.component.scss']
})
export class MasterMachineComponent {

  displayedColumns: string[] = ['No', 'Customer', 'M/C', 'S/N', 'Action'];
  dataSource: any = new MatTableDataSource
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  county: any
  dataExcel: any = []
  dataSourceX: any

  Province: any

  var_Province: any

  constructor(
    // private api: HttpService,
  ) { }


  ngOnInit(): void {
    // this.getData()
  }


  // async getData() {
  //   let data :any= await lastValueFrom(this.api.Master_getall())
  //   this.dataSourceX = data.sort((a: any, b: any) => a['No'] - b['No'])
  //   this.Province = [...new Set(data.map((item: any) => item.Province))]; // [ 'A', 'B']
  //   this.Province = this.Province.sort()
  //   this.var_Province = this.Province[12]
  //   this.selectData()
  // }


  // selectData() {
  //   let data = this.dataSourceX.filter((d: any) => d['Province'] == this.var_Province)
  //   data = data.map((d:any,i:any)=>{
  //     return {
  //       ...d,
  //       "No" : i + 1
  //     }
  //   })
  //   this.dataSource = new MatTableDataSource(data)
  //   this.dataSource.paginator = this.paginator;
  // }


  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }


  // def_import(evt: any) {
  //   const target: DataTransfer = (evt.target);
  //   if (target.files.length !== 1) throw new Error('Cannot use multiple files');
  //   const reader: FileReader = new FileReader();

  //   reader.onload = async (e: any) => {
  //     /* read workbook */
  //     const bstr: string = e.target.result;
  //     const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
  //     /* grab first sheet */

  //     const data: any[] = []
  //     const files = evt.target.files
  //     data.push(...files)
  //     this.MasterData(wb, data)
  //   };
  //   reader.readAsBinaryString(target.files[0]);
  // }


  // async MasterData(wb: any, data: any) {
  //   let input: any = document.getElementById("files") as HTMLInputElement
  //   input.value = null
  //   const wsname: string = wb.SheetNames[0];
  //   const ws: XLSX.WorkSheet = wb.Sheets[wsname];

  //   // this.fullData = []
  //   let text = "OfficePC"
  //   if (wsname == text) {

  //   }

  //   // /* save data */
  //   this.dataExcel = (XLSX.utils.sheet_to_json(ws, { header: 1 }));



  //   let value: any = []
  //   for (let row = 1; row < this.dataExcel.length; row++) {
  //     let obj: any = {}
  //     let temp = this.dataExcel[0].map((a: any, index: any) => {
  //       let data = this.dataExcel[row][index]
  //       obj[`${a.toString().replace('.', '')}`] = data || null
  //     })
  //     value.push(obj)
  //   }



  //   let del = await lastValueFrom(this.api.Master_DelByCondition({}))
  //   if (del) {
  //     for (const iterator of value) {
  //       let add = lastValueFrom(this.api.Master_add(iterator))
  //     }
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'success',
  //       title: 'Success',
  //       showConfirmButton: false,
  //       timer: 1500,
  //     }).then(() => {
  //       this.getData()
  //     })
  //   }

  // }


  // deleteBySelect(e: any) {
  //   Swal.fire({
  //     title: `Do you want to delete data ?<br> ${e.Province}  <br> ${e.Customer} <br> ${e['M/C']}`,
  //     icon: 'question',
  //     showCancelButton: true,
  //   }).then(async r => {
  //     if (r.isConfirmed) {
  //       //code start

  //       let data = this.dataSourceX.filter((d: any) => d['Province'] == this.var_Province)
  //       data = data.filter((d: any) => d._id != e._id)
  //       this.dataSource = new MatTableDataSource(data)
  //       this.dataSource.paginator = this.paginator;
  //       let del = await lastValueFrom(this.api.Master_DelByCondition({ _id: e._id }))
  //       //code end
  //       setTimeout(() => {
  //         Swal.fire('Success', '', 'success')
  //       }, 200);
  //     }
  //   })
  // }


  // async EditBySelect(e: any) {
  //   const { value: formValues } = await Swal.fire({
  //     title: "Master manage",
  //     html: `
  //     <div class="input-group mb-3">
  //     <div class="input-group-prepend">
  //         <span class="input-group-text" style="width: 6rem;justify-content: center;">Customer</span>
  //     </div>
  //     <input type="text" class="form-control"  aria-label="Customer"
  //         aria-describedby="basic-addon1" id="swal-input1" value='${e.Customer || ''}'>
  //     </div>

  //     <div class="input-group mb-3">
  //     <div class="input-group-prepend">
  //         <span class="input-group-text" style="width: 6rem;justify-content: center;">	M/C  </span>
  //     </div>
  //     <input type="text" class="form-control"  aria-label="M/C"
  //         aria-describedby="basic-addon1" id="swal-input2" value='${e['M/C'] || ''}'>
  //     </div>

  //     <div class="input-group mb-3">
  //     <div class="input-group-prepend">
  //         <span class="input-group-text" style="width: 6rem;justify-content: center;">	S/N  </span>
  //     </div>
  //     <input type="text" class="form-control"  aria-label="S/N"
  //         aria-describedby="basic-addon1" id="swal-input3" value='${e['S/N'] || ''}'>
  //     </div>
  //     `,
  //     focusConfirm: false,
  //     showCancelButton: true,
  //     preConfirm: () => {
  //       let input1 = document.getElementById("swal-input1") as HTMLInputElement
  //       let input2 = document.getElementById("swal-input2") as HTMLInputElement
  //       let input3 = document.getElementById("swal-input3") as HTMLInputElement
  //       return {
  //         "_id": e._id,
  //         "Customer": input1.value,
  //         "M/C": input2.value,
  //         "S/N": input3.value
  //       }
  //     }
  //   });
  //   if (formValues) {
  //     if (formValues.Province && formValues.Customer && formValues['M/C']) {
  //       let update = await lastValueFrom(this.api.Master_update(formValues._id, formValues))
  //       if (update) {
  //         Swal.fire({
  //           position: 'center',
  //           icon: 'success',
  //           title: 'Success',
  //           showConfirmButton: false,
  //           timer: 1500,
  //         }).then(async () => {
  //           let data :any = await lastValueFrom(this.api.Master_getall())
  //           this.dataSourceX = data.sort((a: any, b: any) => a['No'] - b['No'])
  //           this.selectData()
  //         })
  //       }
  //     } else {
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'error',
  //         title: 'Error',
  //         showConfirmButton: false,
  //         timer: 1500,
  //       })
  //     }

  //   }
  // }


  // async addData() {
  //   const { value: formValues } = await Swal.fire({
  //     title: "Master manage",
  //     html: `
  //     <div class="input-group mb-3">
  //     <div class="input-group-prepend">
  //         <span class="input-group-text" style="width: 6rem;justify-content: center;">Customer</span>
  //     </div>
  //     <input type="text" class="form-control"  aria-label="Customer"
  //         aria-describedby="basic-addon1" id="swal-input1" >
  //     </div>

  //     <div class="input-group mb-3">
  //     <div class="input-group-prepend">
  //         <span class="input-group-text" style="width: 6rem;justify-content: center;">	M/C  </span>
  //     </div>
  //     <input type="text" class="form-control"  aria-label="M/C"
  //         aria-describedby="basic-addon1" id="swal-input2">
  //     </div>

  //     <div class="input-group mb-3">
  //     <div class="input-group-prepend">
  //         <span class="input-group-text" style="width: 6rem;justify-content: center;">	S/N  </span>
  //     </div>
  //     <input type="text" class="form-control"  aria-label="S/N"
  //         aria-describedby="basic-addon1" id="swal-input3">
  //     </div>
  //     `,
  //     focusConfirm: false,
  //     showCancelButton: true,
  //     preConfirm: async () => {
  //       let input1 = document.getElementById("swal-input1") as HTMLInputElement
  //       let input2 = document.getElementById("swal-input2") as HTMLInputElement
  //       let input3 = document.getElementById("swal-input3") as HTMLInputElement
  //       let data :any = await lastValueFrom(this.api.Master_getall())
  //       this.dataSourceX = data.sort((a: any, b: any) => b['No'] - a['No'])
  //       return {
  //         "No": Number(this.dataSourceX[0].No) + 1,
  //         "Province": this.var_Province,
  //         "Customer": input1.value,
  //         "M/C": input2.value,
  //         "S/N": input3.value
  //       }
  //     }
  //   });
  //   if (formValues) {
  //     if (
  //       formValues.Province && formValues.Customer && formValues['M/C']
  //     ) {
  //       let update = await lastValueFrom(this.api.Master_add(formValues))
  //       if (update) {
  //         Swal.fire({
  //           position: 'center',
  //           icon: 'success',
  //           title: 'Success',
  //           showConfirmButton: false,
  //           timer: 1500,
  //         }).then(async () => {
  //           let data:any = await lastValueFrom(this.api.Master_getall())
  //           this.dataSourceX = data.sort((a: any, b: any) => a['No'] - b['No'])
  //           this.selectData()
  //         })
  //       }

  //     } else {
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'error',
  //         title: 'Error',
  //         showConfirmButton: false,
  //         timer: 1500,
  //       })
  //     }

  //   }
  // }



}


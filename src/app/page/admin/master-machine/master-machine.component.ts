import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { HttpUsersService } from 'src/app/http/http-api';
// import { HttpService } from 'src/app/service/http.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { Cell, Row, Workbook, Worksheet } from 'ExcelJs';
import { MatDialog } from '@angular/material/dialog';
import { MasterMachineEditorComponent } from '../master-machine-editor/master-machine-editor.component';
import * as moment from 'moment';
var fs = require('file-saver');

@Component({
  selector: 'app-master-machine',
  templateUrl: './master-machine.component.html',
  styleUrls: ['./master-machine.component.scss']
})
export class MasterMachineComponent {

  displayedColumns: string[] = ['No','District', 'Customer', 'Machine', 'S/N', 'PIC', 'TARGETS', 'Action'];
  dataSource: any = new MatTableDataSource
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  county: any
  dataExcel: any = []
  dataSourceX: any

  Province: any

  var_Province: any
  data: any
  province: any = ''

  constructor(
    private api: HttpUsersService,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.getData()
  }


  async getData() {
    let data: any = await lastValueFrom(this.api.Master_getall())
    if (data.length != 0) {
      this.data = data
      this.dataSourceX = data
      this.Province = [...new Set(data.map((item: any) => item.Province))]; // [ 'A', 'B']
      this.Province = this.Province.sort()
      this.province = this.Province.map((d: any) => {
        return {
          list: `${d}`,
        }
      })
      this.var_Province = this.Province[0]
      this.selectData()
    }
  }


  async selectData() {
    setTimeout(async () => {
      // console.log(this.var_Province);
      let data = this.dataSourceX.filter((d: any) => d['Province'] == this.var_Province)
      let user = await lastValueFrom(this.api.Master_User_getall())
      data = data.map((d: any, i: any) => {
        let koo = d['PIC'].map((e: any) => {
          let data = user.filter((s: any) => s._id == e)
          return data.length != 0 ? data[0].name : ''
        })
        return {
          ...d,
          "No": i + 1,
          "name": koo

        }
      })

      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    }, 100);

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  def_import(evt: any) {

    const target: DataTransfer = (evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();

    reader.onload = async (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      /* grab first sheet */

      const data: any[] = []
      const files = evt.target.files
      data.push(...files)
      let doo: any = document.getElementById("files") as HTMLInputElement
      doo.value = null
      Swal.fire({
        title: 'Do you want to update data ?',
        icon: 'question',
        showCancelButton: true,
      }).then(async r => {
        if (r.isConfirmed) {
          //code start
          this.MasterData(wb, data)
          //code end
        }
      })

    };
    reader.readAsBinaryString(target.files[0]);
  }


  async MasterData(wb: any, data: any) {
    let input: any = document.getElementById("files") as HTMLInputElement
    input.value = null
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    var timestamp = Number(wsname); // timestamp ที่ต้องการถอดค่ากลับ
    var momentObject = moment.unix(timestamp / 1000);
    if (moment().diff(momentObject, 'hour') < 5) {

      // /* save data */
      this.dataExcel = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

      let value: any = []
      for (let row = 1; row < this.dataExcel.length; row++) {
        let obj: any = {}
        let temp = this.dataExcel[0].map((a: any, index: any) => {
          let data = this.dataExcel[row][index]
          obj[`${a.toString().replace('.', '')}`] = data || null
        })
        value.push(obj)
      }
      value = value.filter((d: any) => d['Province'] != null)
      value = value.map((d: any) => {
        return {
          ...d,
          PIC: d.PIC ? d.PIC.split(",") : []
        }
      })

      for (const iterator of value) {
        if (iterator.id) {
          //update
          delete iterator.PIC
          let add = lastValueFrom(this.api.Master_update(iterator.id, iterator))
        } else {
          //add
          let add = lastValueFrom(this.api.Master_add(iterator))
        }
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Success',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.getData()
      })
    }else{
      Swal.fire('"ไฟล์ ( master_machine.xlsx ) หมดอายุ"', '', 'error')
    }




  }


  deleteBySelect(e: any) {
    Swal.fire({
      title: `Do you want to delete data ?<br> ${e.Province}  <br> ${e.Customer} <br> ${e['Machine']}`,
      icon: 'question',
      showCancelButton: true,
    }).then(async r => {
      if (r.isConfirmed) {
        //code start

        let data = this.dataSourceX.filter((d: any) => d['Province'] == this.var_Province)
        data = data.filter((d: any) => d._id != e._id)
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator;
        let del = await lastValueFrom(this.api.Master_DelByCondition({ _id: e._id }))
        //code end
        setTimeout(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success',
            showConfirmButton: false,
            timer: 1500,
          })
        }, 200);
      }
    })
  }


  async addData() {
    const { value: formValues } = await Swal.fire({
      title: "Master manage",
      html: `
      <style>
      table, th, td {
        border:1px solid black;
      }
      </style>
      <table style="width:100%">
      <tr style>
        <td style="text-align: end;padding-right: 5px;background-color: rgba(128, 128, 128, 0.116);width: 30%;"> Customer </td>
        <td><input id="swal-input1" class="swal2-input" style="margin: 0px;
        width: -webkit-fill-available;text-align: center;" ></td>
      </tr>
      <tr>
        <td style="text-align: end;padding-right: 5px;background-color: rgba(128, 128, 128, 0.116);">Machine</td>
        <td><input id="swal-input2" class="swal2-input" style="margin: 0px;
        width: -webkit-fill-available;text-align: center;" ></td>
      </tr>
      <tr>
        <td style="text-align: end;padding-right: 5px;background-color: rgba(128, 128, 128, 0.116);">S/N</td>
        <td><input id="swal-input3" class="swal2-input" style="margin: 0px;
        width: -webkit-fill-available;text-align: center;" ></td>
      </tr>
      </table>


      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: async () => {
        let input1 = document.getElementById("swal-input1") as HTMLInputElement
        let input2 = document.getElementById("swal-input2") as HTMLInputElement
        let input3 = document.getElementById("swal-input3") as HTMLInputElement
        let data: any = await lastValueFrom(this.api.Master_getall())
        this.dataSourceX = data.sort((a: any, b: any) => b['No'] - a['No'])
        return {
          "No": Number(this.dataSourceX[0].No) + 1,
          "Province": this.var_Province,
          "Customer": input1.value,
          "Machine": input2.value,
          "S/N": input3.value
        }
      }
    });
    if (formValues) {
      if (
        formValues.Province && formValues.Customer && formValues['Machine']
      ) {
        let update = await lastValueFrom(this.api.Master_add(formValues))
        if (update) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Success',
            showConfirmButton: false,
            timer: 1500,
          }).then(async () => {
            let data: any = await lastValueFrom(this.api.Master_getall())
            this.dataSourceX = data.sort((a: any, b: any) => a['No'] - b['No'])
            this.selectData()
          })
        }

      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          showConfirmButton: false,
          timer: 1500,
        })
      }

    }
  }


  export() {
    if (this.data.length > 0) {
      this.http.get('assets/excel/master_mc.xlsx', { responseType: "arraybuffer" })
        // this.http.get('http://localhost:4200/mastereletrical/report product electrical space.xlsx', { responseType: "arraybuffer" })
        .subscribe(
          data => {
            // console.log(data);
            const workbook = new Workbook();
            const arrayBuffer = new Response(data).arrayBuffer();
            let firstRow = 2
            arrayBuffer.then((data) => {
              workbook.xlsx.load(data)
                .then(async () => {
                  let ABC = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                    "AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "AN", "AO", "AP", "AQ", "AR", "AS", "AT", "AU", "AV", "AW", "AX", "AY", "AZ"
                    , "BA", "BB", "BC", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BK", "BL", "BM", "BN", "BO", "BP", "BQ", "BR", "BS", "BT", "BU", "BV", "BW", "BX", "BY", "BZ"]
                  // console.log(ABC.split(""));
                  const worksheet: any = workbook.getWorksheet(1);
                  var now = moment();
                  var timestamp = now.valueOf();
                  worksheet._name = timestamp

                  let user = await lastValueFrom(this.api.Master_User_getall())
                  if (user.length) {
                    this.data = this.data.map((d: any, i: any) => {
                      let koo = d['PIC'].map((e: any) => {
                        let data = user.filter((s: any) => s._id == e)
                        return data.length != 0 ? data[0].name : ''
                      })
                      return {
                        ...d,
                        "PIC": koo
                      }
                    })
                  }

                  // if (this.dataTable == 4) {
                  let header = [
                    'Province',
                    'District',
                    'Customer',
                    'Machine',
                    'S/N',
                    'CODE',
                    'PIC',
                    'Last PM',
                    'Targets',
                    '_id'
                  ]



                  // console.log(this.data);

                  for (const [index, item] of this.data.entries()) {
                    for (const [position, name] of header.entries()) {
                      if (item[name]) {
                        worksheet.getCell(`${ABC[position]}${index + firstRow}`).value = { 'richText': [{ 'text': `${item[name]}`, 'font': { 'bold': false, 'size': 11, 'name': 'arial' } }] }
                      }
                    }

                    // alignment(worksheet, `A${index + firstRow}`, 'middle', 'center')

                    // border(worksheet, `A${index + firstRow}`, '000000', 'medium', 0, 1, 1, 1)

                    // fill(worksheet, `${ABC[i]}${index + firstRow}`, 'DDEBF7') //red

                  }

                  workbook.xlsx.writeBuffer().then(async (data: any) => {
                    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                    // let loo = await this.api.sendExcelData({ test: data }).toPromise()
                    this.getData()
                    fs.saveAs(blob, `master_machine.xlsx`);

                  });
                });
            });
          },
          error => {
            console.log(error);
          }
        );


      function Bold(str: string) {
        return { 'richText': [{ 'text': str, 'font': { 'bold': true, 'size': 16, 'name': 'Calibri' } }] };
      }

      function fill(worksheet: any, cell: string, color: string) {
        worksheet.getCell(cell).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: color },
        };
      }

      function border(ws: any, cells: string, colors: string, styles: string, tops: any, lefts: any, bottoms: any, rights: any) {
        ws.getCell(cells).border = {
          top: tops ? { style: styles, color: { argb: colors } } : null,
          left: lefts ? { style: styles, color: { argb: colors } } : null,
          bottom: bottoms ? { style: styles, color: { argb: colors } } : null,
          right: rights ? { style: styles, color: { argb: colors } } : null
        };
      }

      function alignment(ws: any, cells: string, verticals: string, horizontals: string) {
        ws.getCell(cells).alignment = { vertical: verticals, horizontal: horizontals };
      }
      function generateToken(n: number) {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var token = '';
        for (var i = 0; i < n; i++) {
          token += chars[Math.floor(Math.random() * chars.length)];
        }
        return token;
      }
    }
  }


  edit(item: any) {
    let closeDialog = this.dialog.open(MasterMachineEditorComponent, {
      width: '300px',
      data: item
    });
    closeDialog.afterClosed().subscribe(close => {
      if (close == 'ok') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500,
        }).then(async () => {
          let data: any = await lastValueFrom(this.api.Master_getall())
          console.log("🚀 ~ closeDialog.afterClosed ~ data:", data)
          if (data.length != 0) {
            this.dataSourceX = data.filter((d: any) => d['Province'] == this.var_Province)
            this.selectData()
          }

        })

      }
    })
  }
  //---------------------------------------------------------------//

  add() {
    let closeDialog = this.dialog.open(MasterMachineEditorComponent, {
      width: '300px',
      data: null
    });
    closeDialog.afterClosed().subscribe(close => {
      if (close == 'ok') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.getData()
        })

      }
    })
  }

  filterOptions(list: string, data: any) {
    const filterValue = list?.toLowerCase();
    return data.filter((option: any) => option.list?.toLowerCase()?.includes(filterValue));
  }

  clear() {
    console.log('4444444444444444');
    let doo = document.getElementById("clear") as HTMLInputElement
    doo.value = ""
    this.var_Province = ''
  }
}


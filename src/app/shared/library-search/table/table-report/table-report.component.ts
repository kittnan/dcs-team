import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GenerateInvoicePdfService } from 'src/app/service/generate-invoice-pdf.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.scss']
})
export class TableReportComponent implements OnInit {

  @Input() displayedColumns: string[] = []
  @Input() dataSource!: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<any>(true, []);

  constructor(
    private $pdf: GenerateInvoicePdfService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    }, 300);
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  async onPrint() {
    if (this.selection.selected.length === 0) {
      Swal.fire({
        title: 'ไม่พบรายการ',
        text: 'กรุณาเลือกรายการก่อนพิมพ์',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      })
      return
    }

    const canDownloadNow = this.selection.selected.filter((item: any) => !!item.path_file)
    const needGenerate = this.selection.selected.filter((item: any) => !item.path_file)

    const toLabel = (item: any) => item.reportNo || item.report_no || item.no || item._id
    const canDownloadText = canDownloadNow.length > 0
      ? canDownloadNow.map((item: any) => `- ${toLabel(item)}`).join('<br>')
      : '- ไม่มี'
    const needGenerateText = needGenerate.length > 0
      ? needGenerate.map((item: any) => `- ${toLabel(item)}`).join('<br>')
      : '- ไม่มี'

    const confirmResult = await Swal.fire({
      title: 'ยืนยันการพิมพ์?',
      html: `
        <div style="text-align:left">
          <div>ทั้งหมด ${this.selection.selected.length} รายการ</div>
          <div style="margin-top:8px"><b>มี ไฟล์เดิม (ดาวน์โหลดได้ทันที):</b></div>
          <div>${canDownloadText}</div>
          <div style="margin-top:8px"><b>ไม่มี ไฟล์เดิม (ต้อง generate ใหม่):</b></div>
          <div>${needGenerateText}</div>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    })

    if (!confirmResult.isConfirmed) {
      return
    }

    for (let i = 0; i < this.selection.selected.length; i++) {
      const element = this.selection.selected[i];
      const apiUrl = element.path_file
      if (apiUrl) {
        const authToken = 'a54a136512ef8a7d46cc5f88092997bcf8cfa01f4cc3aabe51fefd9a4ac9e316';
        fetch(apiUrl, {
          headers: {
            'authentication': authToken
          }
        })
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = apiUrl.split("/")[apiUrl.split("/").length - 1];
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          })
          .catch(error => console.error('Error fetching report:', error));
      } else {
        try {
          if (element.type === 'engineer') {
            this.openRouteInNewTab('engineer/report-print', element._id)
          }
          if (element.type === 'special') {
            this.openRouteInNewTab('special/report-print', element._id)
          }
        } catch (error) {
          console.log("🚀 ~ error:", error)
        }
      }

    }

  }

  private openRouteInNewTab(path: string, id: string) {
    const urlTree = this.router.createUrlTree([path], {
      queryParams: { _id: id }
    })
    const url = this.router.serializeUrl(urlTree)
    window.open(url, '_blank')
  }

}

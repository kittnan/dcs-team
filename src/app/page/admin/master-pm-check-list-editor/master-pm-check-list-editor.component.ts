import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpServiceTypeService } from 'src/app/http/http-serviceType.service';

@Component({
  selector: 'app-master-pm-check-list-editor',
  templateUrl: './master-pm-check-list-editor.component.html',
  styleUrls: ['./master-pm-check-list-editor.component.scss']
})
export class MasterPmCheckListEditorComponent implements OnInit {

  rawData: any = {}
  check: any

  constructor(
    private dialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {
    this.rawData = { ...this.data }
  }

  submit() {
    this.dialog.close(this.rawData)
  }

  cancel() {
    this.dialog.close()
  }


}

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpUsersService } from 'src/app/http/http-api';

@Component({
  selector: 'app-master-machine-editor',
  templateUrl: './master-machine-editor.component.html',
  styleUrls: ['./master-machine-editor.component.scss']
})
export class MasterMachineEditorComponent implements OnInit {

  rawData: any = {}

  constructor(
    private dialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: HttpUsersService,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.rawData = {...this.data}
    }
  }


  debug_before(){

  }
}

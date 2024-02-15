import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpUsersService } from 'src/app/http/http-api';

@Component({
  selector: 'app-master-manage-editor',
  templateUrl: './master-manage-editor.component.html',
  styleUrls: ['./master-manage-editor.component.scss']
})
export class MasterManageEditorComponent implements OnInit {

  constructor(
    private dialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: HttpUsersService,
  ) { }

  ngOnInit(): void {
    console.log(this.data);

  }

}

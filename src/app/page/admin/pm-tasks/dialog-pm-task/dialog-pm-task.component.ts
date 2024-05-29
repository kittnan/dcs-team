import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { HttpTasksService } from 'src/app/http/http-tasks.service';

@Component({
  selector: 'app-dialog-pm-task',
  templateUrl: './dialog-pm-task.component.html',
  styleUrls: ['./dialog-pm-task.component.scss']
})
export class DialogPmTaskComponent implements OnInit {

  constructor(
    private dialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private $tasks: HttpTasksService,
  ) { }

  ngOnInit(): void {
  }
  async onSave() {
    await lastValueFrom(this.$tasks.updateDataGroup(this.data))
    this.dialog.close(true)
  }

}

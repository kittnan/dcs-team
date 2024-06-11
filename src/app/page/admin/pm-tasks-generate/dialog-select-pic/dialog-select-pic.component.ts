import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { HttpUsersService } from 'src/app/http/http-users.service';

@Component({
  selector: 'app-dialog-select-pic',
  templateUrl: './dialog-select-pic.component.html',
  styleUrls: ['./dialog-select-pic.component.scss']
})
export class DialogSelectPicComponent implements OnInit {

  pics: any = []
  mode: any = 'month'
  // select: any
  constructor(
    private dialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private $user: HttpUsersService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      let params: HttpParams = new HttpParams()
      params = params.set('permission', JSON.stringify(['engineer']))
      let res: any = await lastValueFrom(this.$user.getByCondition(params))
      this.pics = res.map((item: any) => item.name)
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  onSubmit() {
    this.dialog.close({ mode: this.mode, data: this.data })
  }
  onCancel() {
    this.dialog.close(false)
  }

}

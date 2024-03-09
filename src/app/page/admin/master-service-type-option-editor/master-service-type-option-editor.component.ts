import { filter } from 'rxjs/operators';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpServiceTypeService } from 'src/app/http/http-serviceType.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-master-service-type-option-editor',
  templateUrl: './master-service-type-option-editor.component.html',
  styleUrls: ['./master-service-type-option-editor.component.scss']
})
export class MasterServiceTypeOptionEditorComponent implements OnInit {

  rawData: any = {}
  check: any

  constructor(
    private dialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: HttpServiceTypeService,
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

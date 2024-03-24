import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet-eng',
  templateUrl: './bottom-sheet-eng.component.html',
  styleUrls: ['./bottom-sheet-eng.component.scss']
})
export class BottomSheetEngComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<any>) {}


  ngOnInit(): void {
  }
  openLink(event: MouseEvent,key:string): void {
    this._bottomSheetRef.dismiss(key);
    event.preventDefault();
  }


}

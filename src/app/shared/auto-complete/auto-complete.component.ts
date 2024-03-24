import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {

  @Input()myControl = new FormControl('');
  @Input()title = 'โรงพยาบาล/ลูกค้า'
  @Input() options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  @Output() optionsChange: EventEmitter<any> = new EventEmitter()
  constructor() { }

  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '')),
    );
  }
  onEmit() {
    this.optionsChange.emit(this.myControl.value)
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}

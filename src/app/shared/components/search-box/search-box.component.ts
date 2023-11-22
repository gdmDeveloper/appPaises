import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})

export class SearchBoxComponent implements OnInit, OnDestroy{


  private debouncer: Subject<string> = new Subject<string>;
  private debouncerSuscription?: Subscription;
  @Input()
  public placeholder: string = "";

  @Input()
  public initialValue: string = "";

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  enviarCadena(term :string){
    this.onValue.emit(term);
  }

  ngOnInit(): void {
   this.debouncerSuscription = this.debouncer.pipe(
    debounceTime(300)
   )

   .subscribe(value => {
      this.onDebounce.emit(value);
   })

  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  onKeyPress(value: string) {
    this.debouncer.next(value);
  }






}


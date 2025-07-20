import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostListener, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import * as fileSaver from 'file-saver';
import { interval, Subject, Subscription, switchMap, takeUntil, takeWhile } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class AppComponent {
  

  ngOnInit() {
    
  }


}
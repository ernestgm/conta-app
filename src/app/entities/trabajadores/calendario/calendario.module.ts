import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CalendarModule } from 'angular-calendar';
import {CalendarioComponent} from './calendario.component';
import {CalendarNextViewDirective} from 'angular-calendar/modules/common/calendar-next-view.directive';

@NgModule({
    imports: [
        CommonModule,
        CalendarModule.forRoot(),
    ],
    declarations: [CalendarioComponent],
    exports: [CalendarioComponent]
})
export class CalendarioModule {
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarEvent, CalendarMonthViewDay} from 'angular-calendar';

@Component({
    selector: 'app-calendario',
    templateUrl: './calendario.component.html',
    styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {


    view: String = 'month';
    viewDate: Date = new Date();

    clickedDate: Date;

    /**
     * Called when an event title is clicked
     */
    @Output()
    clickDay: EventEmitter<CalendarMonthViewDay> = new EventEmitter<CalendarMonthViewDay>();

    @Output()
    beforeView: EventEmitter<CalendarMonthViewDay[]> = new EventEmitter<CalendarMonthViewDay[]>();

    @Input() events: CalendarEvent[] = [];
    @Input() template: any;

    constructor() {
    }

    ngOnInit() {
    }

    changeDate( day: CalendarMonthViewDay ) {
        this.clickDay.emit(day);
    }

    beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
        this.beforeView.emit(body);
    }

}

import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';

@Component({
    selector: 'app-nomina',
    templateUrl: './nomina.component.html',
    styleUrls: ['./nomina.component.scss'],
    animations: [routerTransition()]
})
export class NominaComponent implements OnInit {

    fabrica_id: Number = -1;
    constructor() {
    }

    ngOnInit() {
    }

}

import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';

@Component({
    selector: 'app-trabajadores',
    templateUrl: './trabajadores.component.html',
    styleUrls: ['./trabajadores.component.css'],
    animations: [routerTransition()]
})
export class TrabajadoresComponent implements OnInit {

    fabrica_id: Number = -1;

    constructor() {
    }

    ngOnInit() {
    }


}
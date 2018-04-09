import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {TrabajadoresService} from '../../entities/trabajadores/trabajadores.service';
import {FabricasService} from '../../entities/fabricas/fabricas.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    public cantidad_trabajadores: Number = 0;
    public cantidad_fabricas: Number = 0;

    constructor(private _trabajadoresService: TrabajadoresService, private _fabricaService: FabricasService) {

        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: '',
                text:
                    ''
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: '',
                text: ''
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: '',
                text:
                    ''
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {
        this._fabricaService.getAll().subscribe(
            resultArray => {
                this.cantidad_fabricas = resultArray.length;
            },
            error => console.log('Error :: ' + error)
        );

        this._trabajadoresService.getAll(-1).subscribe(
            resultArray => {
                this.cantidad_trabajadores = resultArray.length;
            },
            error => console.log('Error :: ' + error)
        );
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}

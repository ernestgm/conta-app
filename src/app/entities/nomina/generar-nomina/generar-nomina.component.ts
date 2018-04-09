import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FabricasService} from '../../fabricas/fabricas.service';
import {NominaComponent} from '../nomina.component';
import {Fabrica} from '../../fabricas/fabrica';

@Component({
    selector: 'app-generar-nomina',
    templateUrl: './generar-nomina.component.html',
    styleUrls: ['./generar-nomina.component.scss']
})
export class GenerarNominaComponent implements OnInit {
    fabrica_id: Number = -1;
    fabricas: Fabrica[];
    fabrica: Fabrica;
    private sub: any;

    constructor(
        private _fabricaService: FabricasService,
        private route: ActivatedRoute,
        private _nominaComponent: NominaComponent
    ) {
    }

    ngOnInit() {
        this._fabricaService.getAll().subscribe(
            resultArray => {
                this.fabricas = resultArray;
                this.sub = this.route.params.subscribe(params => {
                    if (params['fabrica_id'] !== undefined) {
                        this.fabrica_id = +params['fabrica_id']; // (+) converts string 'id' to a number
                        this._nominaComponent.fabrica_id = this.fabrica_id;
                        this.fabrica = this.fabricas.find(fabrica => fabrica.id === this.fabrica_id);
                    }
                });
            },
            error => console.log('Error :: ' + error)
        );
    }

}

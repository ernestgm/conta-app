import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {Trabajadores} from './trabajadores';
import {TrabajadoresService} from './trabajadores.service';
import {routerTransition} from '../../router.animations';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Fabrica} from '../fabricas/fabrica';
import {ActivatedRoute} from '@angular/router';
import {FabricasService} from '../fabricas/fabricas.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-trabajadores',
    templateUrl: './trabajadores.component.html',
    styleUrls: ['./trabajadores.component.css'],
    animations: [routerTransition()]
})
export class TrabajadoresComponent implements OnInit, OnDestroy {
    displayedColumns = ['id', 'first_name', 'last_name', 'ci', 'salario_x_dia', 'actions'];
    dataSource: MatTableDataSource<Trabajadores>;
    editMode: Boolean = false;
    fabrica_id: Number = -1;
    private sub: any;
    closeResult: string;

    fabricas: Fabrica[];
    fabrica: Fabrica;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    formGroup: FormGroup;
    trabajadores: Trabajadores[];


    constructor(private modalService: NgbModal,
                private _trabajadoresService: TrabajadoresService,
                private _formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private _fabricaService: FabricasService) {

        this.formGroup = _formBuilder.group({
            'id': '',
            'first_name': '',
            'last_name': '',
            'ci': '',
            'salario_x_dia': '',
            'fabrica_id': '',
        });
    }

    ngOnInit() {
        this._fabricaService.getAll().subscribe(
            resultArray => {
                this.fabricas = resultArray;
                this.sub = this.route.params.subscribe(params => {
                    if (params['fabrica_id'] !== undefined) {
                        this.fabrica_id = +params['fabrica_id']; // (+) converts string 'id' to a number
                        this.fabrica = this.fabricas.find(fabrica => fabrica.id === this.fabrica_id);
                        this.formGroup = this._formBuilder.group({
                            'id': '',
                            'first_name': '',
                            'last_name': '',
                            'ci': '',
                            'salario_x_dia': '',
                            'fabrica_id': this.fabrica.id,
                        });
                    }
                    this.getTrabajadores();
                });
            },
            error => console.log('Error :: ' + error)
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getTrabajadores() {
        this._trabajadoresService.getAll(this.fabrica_id).subscribe(
            resultArray => {
                this.trabajadores = resultArray;
                this.initTable();
            },
            error => console.log('Error :: ' + error)
        );
    }

    editarTrabajador(id: Number) {
        let trabajador = this.trabajadores.find(trabajador => trabajador.id === id);
        this.editMode = true;

        this.formGroup = this._formBuilder.group({
            'id': trabajador.id,
            'first_name': trabajador.first_name,
            'last_name': trabajador.last_name,
            'ci': trabajador.ci,
            'salario_x_dia': trabajador.salario_x_dia,
            'fabrica_id': trabajador.fabrica_id,
        });
    }

    /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
    initTable() {
        this.dataSource = new MatTableDataSource(this.trabajadores);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    saveTrabajador(trabajador: Trabajadores) {
        if (trabajador.id) {
            this._trabajadoresService.updateTrabajador(trabajador).subscribe(
                res => {
                    this.cancelarEdicion();
                    this.getTrabajadores();
                },
                (err: HttpErrorResponse) => {
                    console.log(err.error);
                    console.log(err.name);
                    console.log(err.message);
                    console.log(err.status);
                    return false;
                }
            );
        } else {
            this._trabajadoresService.addTrabajador(trabajador).subscribe(
                res => {
                    this.getTrabajadores();
                },
                (err: HttpErrorResponse) => {
                    console.log(err.error);
                    console.log(err.name);
                    console.log(err.message);
                    console.log(err.status);
                    return false;
                }
            );
        }
    }

    deleteTrabajador(id: Number) {
        let filteredElements = this.trabajadores.find(trabajador => trabajador.id === id);
        this.trabajadores.splice(this.trabajadores.indexOf(filteredElements), 1);
        this._trabajadoresService.removeTrabajador(id).subscribe(
            res => {
                this.initTable();
            },
            (err: HttpErrorResponse) => {
                console.log(err.error);
                console.log(err.name);
                console.log(err.message);
                console.log(err.status);
                return false;
            }
        );

    }

    cancelarEdicion() {
        this.editMode = false;
        this.formGroup = this._formBuilder.group({
            'id': '',
            'first_name': '',
            'last_name': '',
            'ci': '',
            'salario_x_dia': '',
            'fabrica_id': this.fabrica !== undefined ? this.fabrica.id : '',
        });
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

}
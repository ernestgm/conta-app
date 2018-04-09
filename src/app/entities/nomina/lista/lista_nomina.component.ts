import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Fabrica} from '../../fabricas/fabrica';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FabricasService} from '../../fabricas/fabricas.service';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {CalendarEvent, CalendarMonthViewDay} from 'angular-calendar';
import {Nomina} from '../nomina';
import {NominaService} from '../nomina.service';
import { NominaComponent } from '../nomina.component';

@Component({
    selector: 'app-lista-nomina',
    templateUrl: './lista_nomina.component.html',
    styleUrls: ['./lista_nomina.component.scss']
})
export class ListaNominaComponent implements OnInit, OnDestroy {

    displayedColumns = ['id', 'nombre', 'fecha_inicio', 'fecha_fin', 'actions'];
    dataSource: MatTableDataSource<Nomina>;
    editMode: Boolean = false;
    showHorarioForm: Boolean;
    fabrica_id: Number = -1;
    private sub: any;
    closeResult: string;

    fabricas: Fabrica[];
    fabrica: Fabrica;

    currentDate: Date = new Date();
    events: CalendarEvent[] = [];
    dayClickeado: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    formGroup: FormGroup;
    formAsist: FormGroup;
    nominas: Nomina[];
    current_nomina: Nomina;

    constructor(private modalService: NgbModal,
                private _nominaService: NominaService,
                private _formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private _fabricaService: FabricasService,
                private _nominaComponent: NominaComponent) {

        this.formGroup = _formBuilder.group({
            'id': '',
            'first_name': '',
            'last_name': '',
            'ci': '',
            'salario_x_dia': '',
            'fabrica_id': '',
        });

        this.formAsist = _formBuilder.group({
            'id': '',
            'horas_trabajadas': '',
        });

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
                    this.getNominas();
                });
            },
            error => console.log('Error :: ' + error)
        );

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getNominas() {
        this._nominaService.getAll(this.fabrica_id).subscribe(
            resultArray => {
                this.nominas = resultArray;
                this.initTable();
            },
            error => console.log('Error :: ' + error)
        );
    }

    /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
    initTable() {
        this.dataSource = new MatTableDataSource(this.nominas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    saveNomina(nomina: Nomina) {
        if (nomina.id) {
            this._nominaService.updateNomina(nomina).subscribe(
                res => {
                    this.getNominas();
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
            this._nominaService.updateNomina(nomina).subscribe(
                res => {
                    this.getNominas();
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
        const filteredElements = this.nominas.find(nomina => nomina.id === id);
        this.nominas.splice(this.nominas.indexOf(filteredElements), 1);
        this._nominaService.removeNomina(id).subscribe(
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

}

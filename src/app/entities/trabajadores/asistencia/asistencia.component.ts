import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Trabajadores} from '../trabajadores';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {TrabajadoresService} from '../trabajadores.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Horario} from './horario';

const now = new Date();

@Component({
    selector: 'app-asistencia',
    templateUrl: './asistencia.component.html',
    styleUrls: ['./asistencia.component.scss']
})
export class AsistenciaComponent implements OnInit, OnDestroy {
    displayedColumns = ['id', 'first_name', 'last_name', 'horas'];
    dataSource: MatTableDataSource<Trabajadores>;
    fabrica_id: Number = -1;
    fecha: NgbDateStruct;
    private sub: any;
    horasForm: FormGroup;
    list: FormArray;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    trabajadores: Trabajadores[];
    horarios: Horario[];

    constructor(private _trabajadoresService: TrabajadoresService,
                private _formBuilder: FormBuilder,
                private route: ActivatedRoute) {
        this.fecha = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
        this.horasForm = this._formBuilder.group({
            _trabajadores: this._formBuilder.array([])
        });
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['fabrica_id'] !== undefined) {
                this.fabrica_id = +params['fabrica_id']; // (+) converts string 'id' to a number
            }
            this.loadAsistencias();
        });
    }

    loadAsistencias() {
        this._trabajadoresService.getAllAsistencia(this.fabrica_id, this.fecha).subscribe(
            resultArray => {
                this.trabajadores = resultArray;

                this.list = new FormArray([]);
                //Poner la fecha como string mas corto
                // `${ this.fecha.year }-${this.fecha.month}-${this.fecha.day}`
                for (let trabajador of this.trabajadores) {
                    this.list.setControl(trabajador.id, this._formBuilder.group({
                        trab_id: [trabajador.id],
                        horas_trabajadas: [12],
                        fecha: [this.fecha.year.toString() + '-' + this.fecha.month.toString() + '-' + this.fecha.day.toString()],
                    }));
                }
                this.horasForm = this._formBuilder.group({
                    _horarios: this.list
                });

                this.initTable();
            },
            error => console.log('Error :: ' + error)
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
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

    onDateChange(date: NgbDateStruct) {
        this.fecha = date;
        this.loadAsistencias();
    }

    guardarAsistencia(form) {

        this.horarios = form._horarios.map(horario => {
            return horario as Horario;
        });

        this._trabajadoresService.guardarAsistencia(this.horarios).subscribe(
            result => {
                this.loadAsistencias();
            },
            error => console.log('Error :: ' + error)
        );

    }

}

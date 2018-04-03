import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TrabajadoresComponent} from '../trabajadores.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Fabrica} from '../../fabricas/fabrica';
import {Trabajadores} from '../trabajadores';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FabricasService} from '../../fabricas/fabricas.service';
import {ActivatedRoute} from '@angular/router';
import {TrabajadoresService} from '../trabajadores.service';
import {HttpErrorResponse} from '@angular/common/http';
import {CalendarEvent, CalendarMonthViewDay} from 'angular-calendar';
import {Horario} from '../asistencia/horario';

@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit, OnDestroy {

    displayedColumns = ['id', 'first_name', 'last_name', 'ci', 'salario_x_dia', 'actions'];
    dataSource: MatTableDataSource<Trabajadores>;
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
    trabajadores: Trabajadores[];
    current_trabajador: Trabajadores;

    constructor(private modalService: NgbModal,
                private _trabajadoresService: TrabajadoresService,
                private _formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private _fabricaService: FabricasService,
                private _trabajadorComponent: TrabajadoresComponent) {

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
                        this._trabajadorComponent.fabrica_id = this.fabrica_id;
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

        this.showHorarioForm = false;
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

    openCalendar(content, id) {
        this._trabajadoresService.getCalendarByTrabajador(id).subscribe(
            result => {

                this.current_trabajador = result.trabajador as Trabajadores;

                result.events.forEach(value => {
                    let colors = {primary: '#ffffff', secondary: '#ffffff'};
                    let f = value.fecha.split('-');
                    let event_date = new Date();
                    event_date.setFullYear(parseInt(f[0]), parseInt(f[1]) - 1, parseInt(f[2]));

                    let evento: CalendarEvent = {
                        start: event_date,
                        title: value.horas_trabajadas.toString(),
                        color: colors,
                        id: value.id
                    };
                    this.events.push(evento);
                });


                this.modalService.open(content).result.then((result) => {
                    this.closeModal();
                    this.closeResult = `Closed with: ${result}`;
                }, (reason) => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                });
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

    saveHorario(horario: any): void {

        if (horario.id !== '') {
            this._trabajadoresService.updateAsistencia(horario).subscribe(
                res => {
                    this.dayClickeado = this.dayClickeado as CalendarMonthViewDay;
                    if (this.dayClickeado.day.events.length > 0) {
                        this.dayClickeado.day.events[0].title = horario.horas_trabajadas;
                        this.dayClickeado.day.cssClass = 'normal-cell';
                        if (horario.horas_trabajadas === '0') {
                            this.dayClickeado.day.cssClass = 'empty-cell';
                        }
                        if (horario.horas_trabajadas === '24') {
                            this.dayClickeado.day.cssClass = 'full-cell';
                        }
                    }
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
            this._trabajadoresService.createAsistencia(horario as Horario).subscribe(
                res => {
                    this.dayClickeado = this.dayClickeado as CalendarMonthViewDay;

                    let colors = {primary: '#ffffff', secondary: '#ffffff'};
                    let f = horario.fecha.split('-');
                    let event_date = new Date();
                    event_date.setFullYear(parseInt(f[0]), parseInt(f[1]) - 1, parseInt(f[2]));

                    let evento: CalendarEvent = {
                        start: event_date,
                        title: horario.horas_trabajadas.toString(),
                        color: colors,
                        id: res.id
                    };
                    this.dayClickeado.day.events.push(evento);

                    this.dayClickeado.day.cssClass = 'normal-cell';
                    if (horario.horas_trabajadas === '0') {
                        this.dayClickeado.day.cssClass = 'empty-cell';
                    }
                    if (horario.horas_trabajadas === '24') {
                        this.dayClickeado.day.cssClass = 'full-cell';
                    }

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

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            this.closeModal();
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            this.closeModal();
            return 'by clicking on a backdrop';
        } else {
            this.closeModal();
            return `with: ${reason}`;
        }
    }

    closeModal(): void {
        this.events = [];
        this.dayClickeado = null;
    }

    changeDate($event): void {
        if ($event.day.events.length > 0) {
            this.dayClickeado = $event;
            const horario = $event.day.events[0];
            this.formAsist = this._formBuilder.group({
                'id': horario.id,
                'trab_id': this.current_trabajador.id,
                'fecha': this.dayClickeado.day.date.getFullYear() + '-' + (this.dayClickeado.day.date.getMonth() + 1) + '-' + this.dayClickeado.day.date.getDate(),
                'horas_trabajadas': horario.title,
            });
        } else {
            this.dayClickeado = $event;
            this.formAsist = this._formBuilder.group({
                'id': '',
                'trab_id': this.current_trabajador.id,
                'fecha': this.dayClickeado.day.date.getFullYear() + '-' + (this.dayClickeado.day.date.getMonth() + 1) + '-' + this.dayClickeado.day.date.getDate(),
                'horas_trabajadas': '12',
            });
        }
    }

    beforeViewRender($event): void {
        this.currentDate.setHours(0, 0, 0, 0);

        $event.forEach(day => {
            if (day.events.length > 0) {
                day.cssClass = 'normal-cell';
                if (day.events[0].title === '0') {
                    day.cssClass = 'empty-cell';
                }
                if (day.events[0].title === '24') {
                    day.cssClass = 'full-cell';
                }
            }

            if (day.date.getTime() === this.currentDate.getTime()) {
                const _dayevent: any = {day: day};
                //this.changeDate(_dayevent as CalendarMonthViewDay);
            }
        });
    }

}

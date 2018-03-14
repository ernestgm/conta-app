import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {Fabrica} from './fabrica';
import {FabricasService} from './fabricas.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-fabricas',
    templateUrl: './fabricas.component.html',
    styleUrls: ['./fabricas.component.scss'],
    animations: [routerTransition()]
})
export class FabricasComponent implements OnInit {
    displayedColumns = ['id', 'nombre', 'salario_adicional', 'actions'];
    dataSource: MatTableDataSource<Fabrica>;
    editMode: Boolean = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    fabricas: Fabrica[];
    formGroup: FormGroup;

    constructor(private _fabricasService: FabricasService, private _formBuilder: FormBuilder) {
        this.formGroup = _formBuilder.group({
            'id': '',
            'nombre': '',
            'salario_adicional': '',
        });
    }

    ngOnInit() {
        this.getAllFabricas();
    }

    getAllFabricas() {
        this._fabricasService.getAll().subscribe(
            resultArray => {
                this.fabricas = resultArray;
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
        this.dataSource = new MatTableDataSource(this.fabricas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    saveFabrica(fabrica: Fabrica) {
        if (fabrica.id) {
            this._fabricasService.updateFabrica(fabrica).subscribe(
                res => {
                    this.cancelarEdicion();
                    this.getAllFabricas();
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
            this._fabricasService.addFabrica(fabrica).subscribe(
                res => {
                    this.getAllFabricas();
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

    editarFabrica(id: Number) {
        let fabrica = this.fabricas.find(fabrica => fabrica.id === id);
        this.editMode = true;

        this.formGroup = this._formBuilder.group({
            'id': fabrica.id,
            'nombre': fabrica.nombre,
            'salario_adicional': fabrica.salario_adicional,
        });
    }
    cancelarEdicion() {
        this.editMode = false;
        this.formGroup = this._formBuilder.group({
            'id':'',
            'nombre': '',
            'salario_adicional': '',
        });
    }

    deleteFabrica(id: Number) {
        let filteredElements = this.fabricas.find(fabrica => fabrica.id === id);
        this.fabricas.splice(this.fabricas.indexOf(filteredElements), 1);
        this._fabricasService.removeFabrica(id).subscribe(
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

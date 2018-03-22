import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AsistenciaComponent} from './asistencia.component';
import {AsistenciaRoutingModule} from './asistencia-routing.module';
import {TrabajadoresService} from '../trabajadores.service';
import {MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PageHeaderModule} from '../../../shared';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        AsistenciaRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        NgbModule.forRoot(),
        PageHeaderModule,
        RouterModule,
    ],
    providers: [TrabajadoresService],
    declarations: [AsistenciaComponent]
})
export class AsistenciaModule {
}

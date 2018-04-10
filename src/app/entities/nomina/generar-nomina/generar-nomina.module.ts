import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageHeaderModule} from '../../../shared';
import {NominaService} from '../nomina.service';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {RouterModule} from '@angular/router';
import {MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {GenerarNominaComponent} from './generar-nomina.component';
import {GenerarNominaRoutingModule} from './generar-nomina-routing.module';
import {DatepickerRangeComponent} from '../../../layout/bs-component/components';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        NgbModule.forRoot(),
        GenerarNominaRoutingModule,
        PageHeaderModule,
        LoadingBarHttpClientModule
    ],
    providers: [NominaService],
    declarations: [
        GenerarNominaComponent,
    ]
})
export class GenerarNominaModule {
}

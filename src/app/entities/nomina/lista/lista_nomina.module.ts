import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {ListaNominaComponent} from './lista_nomina.component';
import {ListaNominaRoutingModule} from './lista_nomina-routing.module';
import {PageHeaderModule} from '../../../shared';
import {NominaService} from '../nomina.service';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

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
        ListaNominaRoutingModule,
        PageHeaderModule,
        LoadingBarHttpClientModule
    ],
    providers: [NominaService],
    declarations: [ListaNominaComponent]
})
export class ListaNominaModule {
}

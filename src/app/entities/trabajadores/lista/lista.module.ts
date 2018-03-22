import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {TrabajadoresService} from '../trabajadores.service';
import {ListaComponent} from './lista.component';
import {ListaRoutingModule} from './lista-routing.module';
import {PageHeaderModule} from '../../../shared';

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
        ListaRoutingModule,
        PageHeaderModule,
    ],
    providers: [TrabajadoresService],
    declarations: [ListaComponent]
})
export class ListaModule {
}

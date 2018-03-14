import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TrabajadoresComponent} from './trabajadores.component';
import {TrabajadoresRoutingModule} from './trabajadores-routing.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {PageHeaderModule} from '../../shared';
import {MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {TrabajadoresService} from './trabajadores.service';
import {NgbModal, NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalStack} from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import {ModalComponent} from '../../layout/bs-component/components';
import { ListaComponent } from './lista/lista/lista.component';

@NgModule({
    imports: [
        CommonModule,
        TrabajadoresRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PageHeaderModule,
        HttpClientModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        NgbModule.forRoot(),
    ],
    providers: [TrabajadoresService],
    declarations: [TrabajadoresComponent, ListaComponent]
})

export class TrabajadoresModule {
}

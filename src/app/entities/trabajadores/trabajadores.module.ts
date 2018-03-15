import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TrabajadoresComponent} from './trabajadores.component';
import {TrabajadoresService} from './trabajadores.service';
import {PageHeaderModule} from '../../shared';
import {TrabajadoresRoutingModule} from './trabajadores-routing.module';

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        TrabajadoresRoutingModule,
    ],
    providers: [TrabajadoresService],
    declarations: [TrabajadoresComponent]
})

export class TrabajadoresModule {
}

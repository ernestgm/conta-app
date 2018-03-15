import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AsistenciaComponent} from './asistencia.component';
import {AsistenciaRoutingModule} from './asistencia-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AsistenciaRoutingModule
    ],
    declarations: [AsistenciaComponent]
})
export class AsistenciaModule {
}

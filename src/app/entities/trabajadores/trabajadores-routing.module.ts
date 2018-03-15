import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrabajadoresComponent } from './trabajadores.component';

const routes: Routes = [
    {
        path: '',
        component: TrabajadoresComponent,
        children: [
            { path: '', redirectTo: 'lista', pathMatch: 'full' },
            { path: 'lista', loadChildren: './lista/lista.module#ListaModule' },
            { path: 'lista/:fabrica_id', loadChildren: './lista/lista.module#ListaModule' },
            { path: 'asistencia/:fabrica_id', loadChildren: './asistencia/asistencia.module#AsistenciaModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrabajadoresRoutingModule {}

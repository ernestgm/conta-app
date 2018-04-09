import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NominaComponent } from './nomina.component';
import {ListaNominaModule} from './lista/lista_nomina.module';
import {GenerarNominaModule} from './generar-nomina/generar-nomina.module';

const routes: Routes = [
    {
        path: '',
        component: NominaComponent,
        children: [
            { path: '', redirectTo: 'lista', pathMatch: 'full' },
            { path: 'lista/:fabrica_id', loadChildren: './lista/lista_nomina.module#ListaNominaModule' },
            { path: 'generar/:fabrica_id', loadChildren: './generar-nomina/generar-nomina.module#GenerarNominaModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NominaRoutingModule {}

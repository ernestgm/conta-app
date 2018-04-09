import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GenerarNominaComponent} from './generar-nomina.component';

const routes: Routes = [
    {
        path: '', component: GenerarNominaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GenerarNominaRoutingModule {
}

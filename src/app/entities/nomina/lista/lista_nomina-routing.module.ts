import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListaNominaComponent} from './lista_nomina.component';

const routes: Routes = [
    {
        path: '', component: ListaNominaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListaNominaRoutingModule {
}

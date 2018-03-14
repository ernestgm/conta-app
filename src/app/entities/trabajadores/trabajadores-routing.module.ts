import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrabajadoresComponent } from './trabajadores.component';

const routes: Routes = [
    {
        path: '',
        component: TrabajadoresComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrabajadoresRoutingModule {}

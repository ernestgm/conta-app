import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FabricasRoutingModule} from './fabricas-routing.module';
import {FabricasComponent} from './fabricas.component';
import {PageHeaderModule} from '../../shared/index';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FabricasService} from './fabricas.service';
import {MatInputModule, MatFormFieldModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FabricasRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PageHeaderModule,
        HttpClientModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule
    ],
    providers: [FabricasService],
    declarations: [FabricasComponent]
})
export class FabricasModule {
}

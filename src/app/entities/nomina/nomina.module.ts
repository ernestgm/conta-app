import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NominaComponent } from './nomina.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../shared/index';
import { NominaRoutingModule } from './nomina-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NominaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderModule
  ],
  declarations: [NominaComponent]
})
export class NominaModule { }

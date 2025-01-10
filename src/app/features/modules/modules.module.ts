import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ModulesComponent } from './modules.component';
import { ContractsComponent } from './contracts/contracts.component';
import { OrdersComponent } from './orders/orders.component';


export const routes: Routes = [
  {
    path: '', component: ModulesComponent,
    children: [
      { path: 'contracts', component: ContractsComponent },
      { path: 'orders', component: OrdersComponent }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule

  ]
})
export class ModulesModule { }

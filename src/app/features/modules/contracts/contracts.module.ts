import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContractsComponent } from './contracts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContractsPageComponent } from './contracts-page/contracts-page.component';
import { AddendumsComponent } from './addendums/addendums.component';
import { LoadPlansComponent } from './load-plans/load-plans.component';
import { CompaniesComponent } from './companies/companies.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {CdkDrag} from '@angular/cdk/drag-drop';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NewCompaniesComponent } from './companies/new-companies/new-companies.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../../../components/footer/footer.component';
import { NewAddendumsComponent } from './addendums/new-addendums/new-addendums.component';

export const routes: Routes = [
  {
    path: '', component: ContractsComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'contracts', component: ContractsPageComponent },
      { path: 'addendum', component: AddendumsComponent },
      { path: 'loadPlan', component: LoadPlansComponent },
      { path: 'company', component: CompaniesComponent },
    ]
  }
]

@NgModule({
  declarations: [ContractsComponent, NewCompaniesComponent, CompaniesComponent, DashboardComponent, ContractsPageComponent, AddendumsComponent, NewAddendumsComponent, LoadPlansComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule,
    HeaderComponent,
    FooterComponent,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    CdkDrag,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ContractsModule { }

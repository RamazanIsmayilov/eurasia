import { Routes } from '@angular/router';
import { ModulesComponent } from './features/modules/modules.component';
import { HeaderComponent } from './components/header/header.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadChildren: () => import('./auth/auth.module').then(d => d.AuthModule)
    },
    {
        path: 'modules',
        component: ModulesComponent
    },
    {
        path: 'modules/contracts',
        loadChildren: () => import('./features/modules/contracts/contracts.module').then(d => d.ContractsModule)
    }
];

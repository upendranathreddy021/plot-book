import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { PasswordSettingsComponent } from './password-settings/password-settings.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { BookPlotComponent } from './Plot-booking/book-plot/book-plot.component';
import { PaymentDetailsComponent } from './Plot-booking/payment-details/payment-details.component';
const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'book-plot',
        component: BookPlotComponent,
        // canActivate: [AuthGuard],
        // data: { roles: [Role.User, Role.Admin] }
    },
    {
        path: 'payment-details',
        component: PaymentDetailsComponent,
        // canActivate: [AuthGuard],
        // data: { roles: [Role.User, Role.Admin] }
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
   
    {
        path: 'user-registration',
        component: UserRegistrationComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
    },
    {
        path: 'login',
        component: LoginComponent
    },
     {
        path: 'password-settings',
        component: PasswordSettingsComponent,
    },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

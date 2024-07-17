import { Routes } from '@angular/router';
import { canActivateAuth } from './auth/access.guard';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

export const routes: Routes = [
    {path: "", component: LayoutComponent, children: [
        {path: "", component: SearchPageComponent},
        {path: "profile", component: ProfilePageComponent},
    ], 
        canActivate: [canActivateAuth]},
    {path: "login", component: LoginPageComponent}
];

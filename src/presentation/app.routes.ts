import { Routes } from '@angular/router';
import { IndexComponent as AreaIndexComponent } from './components/Area/index/index.component';
import { IndexComponent as RoleIndexComponent } from './components/Role/index/index.component';
import { IndexComponent as EmployeeIndexComponent } from './components/Employee/index/index.component';
import { CreateComponent as AreaCreateComponent } from './components/Area/create/create.component';
import { CreateComponent as RoleCreateComponent } from './components/Role/create/create.component';
import { CreateComponent as EmployeeCreateComponent } from './components/Employee/create/create.component';
import { EditComponent as AreaEditComponent } from './components/Area/edit/edit.component';
import { EditComponent as RoleEditComponent } from './components/Role/edit/edit.component';
import { EditComponent as EmployeeEditComponent } from './components/Employee/edit/edit.component';

export const routes: Routes = [

  {path:'', redirectTo: '/Employees', pathMatch:'full'},
  {path:'Areas', component: AreaIndexComponent },
  {path:'Areas/Create', component: AreaCreateComponent },
  {path:'Areas/Edit/:id', component: AreaEditComponent },
  {path:'Roles', component: RoleIndexComponent },
  {path:'Roles/Create', component: RoleCreateComponent },
  {path:'Roles/Edit/:id', component: RoleEditComponent },
  {path:'Employees', component: EmployeeIndexComponent },
  {path:'Employees/Create', component: EmployeeCreateComponent },
  {path:'Employees/Edit/:id', component: EmployeeEditComponent },
];

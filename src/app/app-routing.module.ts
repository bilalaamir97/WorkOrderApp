import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './_guards/auth.guard';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

export const Approutes: Routes = [
{
path: '',
component: FullComponent,
children: [

{ path: '', redirectTo: '/login', pathMatch: 'full' },

{ path: 'dashboard', loadChildren: './dashboards/dashboard.module#DashboardModule',canActivate: [AuthGuard]  },
{ path: 'starter', loadChildren: './starter/starter.module#StarterModule',canActivate: [AuthGuard]  },
{ path: 'icons', loadChildren: './icons/icons.module#IconsModule',canActivate: [AuthGuard]  },
{ path: 'forms', loadChildren: './form/forms.module#FormModule',canActivate: [AuthGuard]  },
    
//{ path: 'student_discount_request', loadChildren: './student_discount_request/student_discount_request.module#student_discount_requestModule', canActivate: [AuthGuard]  },

{ path: 'change_password', loadChildren: './change_password/change_password.module#ChangePasswordModule', canActivate: [AuthGuard]  },

{ path: 'create_roles', loadChildren: './create_roles/create_roles.module#CreateRolesModule', canActivate: [AuthGuard]  },

{ path: 'home', loadChildren: './home/home.module#homeModule', canActivate: [AuthGuard]  },
{ path: 'workorders', loadChildren: './workorders/workorders.module#workordersModule', canActivate: [AuthGuard]  },
{ path: 'inventories', loadChildren: './inventories/inventories.module#inventoriesModule', canActivate: [AuthGuard]  },
{ path: 'service_items', loadChildren: './service_items/service_items.module#service_itemsModule', canActivate: [AuthGuard]  },
{ path: 'parts', loadChildren: './parts/parts.module#partsModule', canActivate: [AuthGuard]  },
{ path: 'labors', loadChildren: './labors/labors.module#laborsModule', canActivate: [AuthGuard]  },
{ path: 'user_roles', loadChildren: './user_roles/user_roles.module#user_rolesModule', canActivate: [AuthGuard]  },
{ path: 'get_users', loadChildren: './get_users/get_users.module#get_usersModule', canActivate: [AuthGuard]  },
{ path: 'get_serilog', loadChildren: './get_serilog/get_serilog.module#get_serilogModule', canActivate: [AuthGuard]  },
{ path: 'customers', loadChildren: './customers/customers.module#customersModule', canActivate: [AuthGuard]  },
{ path: 'categories', loadChildren: './categories/categories.module#categoriesModule', canActivate: [AuthGuard]  },

{ path: 'register', loadChildren: './register/register.module#registerModule', canActivate: [AuthGuard]  },

{ path: 'tables', loadChildren: './table/tables.module#TablesModule', canActivate: [AuthGuard] },
{ path: 'charts', loadChildren: './charts/charts.module#ChartModule' },
{ path: 'widgets', loadChildren: './widgets/widgets.module#WidgetsModule' },
{ path: 'extra-component', loadChildren: './extra-component/extra-component.module#ExtraComponentsModule' },
{ path: 'apps', loadChildren: './apps/apps.module#AppsModule' },
{ path: 'sample-pages', loadChildren: './sample-pages/sample-pages.module#SamplePagesModule' }
]
},
{
path: '',
component: BlankComponent,
children: [
{
path: 'authentication',
loadChildren: './authentication/authentication.module#AuthenticationModule'
},
{ path: 'login', loadChildren: './login/login.module#LoginModule' }, 
]
}, 
{
path: '**',
redirectTo: '/authentication/404' 
}];



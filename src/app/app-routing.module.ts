import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { InstituteDashboardComponent } from './institute/institute-dashboard/institute-dashboard.component';
import { InstituteHomeComponent } from './institute/institute-home/institute-home.component';
import { InstituteLoginComponent } from './institute/institute-login/institute-login.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { StudentLoginComponent } from './student/student-login/student-login.component';

const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'homepage',component:HomepageComponent},
  {path:'adminlogin',component:AdminLoginComponent},

  {path:'adminhome',component:AdminHomeComponent,
    children:[
      {path:'', component:AdminDashboardComponent},
      {path:'dashboard', component:AdminDashboardComponent},
      
    ]
  },

  {path:'institutelogin', component:InstituteLoginComponent},
  {path:'institutehome', component:InstituteHomeComponent,
    children:[
      {path:'',component:InstituteDashboardComponent},
    ]
  },

  {path:'studentlogin',component:StudentLoginComponent},
  {path:'studenthome',component:StudentHomeComponent,
    children:[
      {path:'',component:StudentDashboardComponent},
    ]
  }
  

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

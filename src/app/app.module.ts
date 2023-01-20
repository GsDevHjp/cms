import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { InstituteLoginComponent } from './institute/institute-login/institute-login.component';
import { InstituteHomeComponent } from './institute/institute-home/institute-home.component';
import { InstituteDashboardComponent } from './institute/institute-dashboard/institute-dashboard.component';
import { InstituteSidebarComponent } from './institute/institute-sidebar/institute-sidebar.component';
import { StudentLoginComponent } from './student/student-login/student-login.component';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentSidebarComponent } from './student/student-sidebar/student-sidebar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatMenuModule} from '@angular/material/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    InstituteLoginComponent,
    InstituteHomeComponent,
    InstituteDashboardComponent,
    InstituteSidebarComponent,
    StudentLoginComponent,
    StudentHomeComponent,
    StudentDashboardComponent,
    StudentSidebarComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    NgbModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

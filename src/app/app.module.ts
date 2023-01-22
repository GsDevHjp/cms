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
import { CourseComponent } from './institute/course/course.component';
import { AddEditCourseComponent } from './institute/add-edit-course/add-edit-course.component';
import { BatchComponent } from './institute/batch/batch.component';
import { AddEditBatchComponent } from './institute/add-edit-batch/add-edit-batch.component';
import { StudentComponent } from './institute/student/student.component';
import { AddEditStudentComponent } from './institute/add-edit-student/add-edit-student.component';
import { AdmissionComponent } from './institute/admission/admission.component';
import { AddEditAddmissionComponent } from './institute/add-edit-addmission/add-edit-addmission.component';
import { EnquiryComponent } from './institute/enquiry/enquiry.component';
import { AddEditEnquiryComponent } from './institute/add-edit-enquiry/add-edit-enquiry.component';
import { PaymentReceivedComponent } from './institute/payment-received/payment-received.component';
import { AddEditPaymentRecivedComponent } from './institute/add-edit-payment-recived/add-edit-payment-recived.component';
import { StdDuesComponent } from './institute/std-dues/std-dues.component';
import { InstituteComponent } from './admin/institute/institute.component';
import { AddEditInstituteComponent } from './admin/add-edit-institute/add-edit-institute.component';
import { AdminPaymetRecivedComponent } from './admin/admin-paymet-recived/admin-paymet-recived.component';
import { AddEditAdminPaymentComponent } from './admin/add-edit-admin-payment/add-edit-admin-payment.component';
import { AdminDuesComponent } from './admin/admin-dues/admin-dues.component';
import { TAndCComponent } from './admin/t-and-c/t-and-c.component';
import { TakeAddmissionComponent } from './student/take-addmission/take-addmission.component';
import { AddEditTakeAddmissionComponent } from './student/add-edit-take-addmission/add-edit-take-addmission.component';
import { LiveClassComponent } from './student/live-class/live-class.component';
import { QuizeComponent } from './student/quize/quize.component';
import { OnlineTestComponent } from './student/online-test/online-test.component';
import { ResultComponent } from './student/result/result.component';
import { QueryComponent } from './student/query/query.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';




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
    HomepageComponent,
    CourseComponent,
    AddEditCourseComponent,
    BatchComponent,
    AddEditBatchComponent,
    StudentComponent,
    AddEditStudentComponent,
    AdmissionComponent,
    AddEditAddmissionComponent,
    EnquiryComponent,
    AddEditEnquiryComponent,
    PaymentReceivedComponent,
    AddEditPaymentRecivedComponent,
    StdDuesComponent,
    InstituteComponent,
    AddEditInstituteComponent,
    AdminPaymetRecivedComponent,
    AddEditAdminPaymentComponent,
    AdminDuesComponent,
    TAndCComponent,
    TakeAddmissionComponent,
    AddEditTakeAddmissionComponent,
    LiveClassComponent,
    QuizeComponent,
    OnlineTestComponent,
    ResultComponent,
    QueryComponent
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
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

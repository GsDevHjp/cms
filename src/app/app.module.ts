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
import { MatMenuModule } from '@angular/material/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
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
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InsCourseComponent } from './admin/ins-course/ins-course.component';
import { ViewportComponent } from './admin/viewport/viewport.component';
import { InsbatchComponent } from './admin/insbatch/insbatch.component';
import { InsstudentComponent } from './admin/insstudent/insstudent.component';
import { InsadmissionComponent } from './admin/insadmission/insadmission.component';
import { ReceivedformComponent } from './admin/receivedform/receivedform.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { InstQuizComponent } from './institute/inst-quiz/inst-quiz.component';
import { AddEditInstQuizComponent } from './institute/add-edit-inst-quiz/add-edit-inst-quiz.component';
import { InstQueryComponent } from './institute/inst-query/inst-query.component';
import { InstNotificationComponent } from './institute/inst-notification/inst-notification.component';
import { AddEditInstNotificationComponent } from './institute/add-edit-inst-notification/add-edit-inst-notification.component';
import { InstChangePasswordComponent } from './institute/inst-change-password/inst-change-password.component';
import { InstBookComponent } from './institute/inst-book/inst-book.component';
import { InstNotesComponent } from './institute/inst-notes/inst-notes.component';
import { InstSyllabusComponent } from './institute/inst-syllabus/inst-syllabus.component';
import { InstQuestionBankComponent } from './institute/inst-question-bank/inst-question-bank.component';
import { AddEditInstQuestionBankComponent } from './institute/add-edit-inst-question-bank/add-edit-inst-question-bank.component';
import { AddEditInstBookComponent } from './institute/add-edit-inst-book/add-edit-inst-book.component';
import { AddEditInstNotesComponent } from './institute/add-edit-inst-notes/add-edit-inst-notes.component';
import { AddEditInstSyllabusComponent } from './institute/add-edit-inst-syllabus/add-edit-inst-syllabus.component';
import { AddEditRegistrationComponent } from './institute/add-edit-registration/add-edit-registration.component';
import { StdRegComponent } from './student/std-reg/std-reg.component';
import { StdQueryComponent } from './student/std-query/std-query.component';
import { MatRadioModule } from '@angular/material/radio';
import { StdChnangePwdComponent } from './student/std-chnange-pwd/std-chnange-pwd.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { InstituteUpdateProfileComponent } from './institute/institute-update-profile/institute-update-profile.component';
import { QuizDashboardComponent } from './student/quiz-dashboard/quiz-dashboard.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from "ngx-ui-loader";
import { NgToastModule } from 'ng-angular-popup';
import { InstquizdashboardComponent } from './institute/instquizdashboard/instquizdashboard.component';
import { CountryComponent } from './admin/country/country.component';
import { StateComponent } from './admin/state/state.component';
import { DistrictComponent } from './admin/district/district.component';
import { AddEditCountryComponent } from './admin/add-edit-country/add-edit-country.component';
import { AddEditDistrictComponent } from './admin/add-edit-district/add-edit-district.component';
import { AddEditStateComponent } from './admin/add-edit-state/add-edit-state.component';
import { OESComponent } from './institute/oes/oes.component';
import { ELearningComponent } from './institute/e-learning/e-learning.component';
import { AdminChangePasswordComponent } from './admin/admin-change-password/admin-change-password.component';
import { NgConfirmModule } from 'ng-confirm-box';
import { AddEditQueryComponent } from './institute/add-edit-query/add-edit-query.component';
import { EmployeeComponent } from './institute/employee/employee.component';
import { AddEditEmployeeComponent } from './institute/add-edit-employee/add-edit-employee.component';
import { ConverttoadmissionComponent } from './institute/converttoadmission/converttoadmission.component';
import { CertificateComponent } from './institute/certificate/certificate.component';
import { AddEditCertificateComponent } from './institute/add-edit-certificate/add-edit-certificate.component';
import { ResionComponent } from './institute/resion/resion.component';
import { QuizresultComponent } from './student/quizresult/quizresult.component';
import { BlockComponent } from './admin/block/block.component';
import { AddEditBlockComponent } from './admin/add-edit-block/add-edit-block.component';
import { PanchayatComponent } from './admin/panchayat/panchayat.component';
import { AddEditPanchayatComponent } from './admin/add-edit-panchayat/add-edit-panchayat.component';
import { WardComponent } from './admin/ward/ward.component';
import { AddEditWardComponent } from './admin/add-edit-ward/add-edit-ward.component';
import { ExpenceComponent } from './institute/expence/expence.component';
import { AddEditExpenceComponent } from './institute/add-edit-expence/add-edit-expence.component';
import { StdbathcbyComponent } from './institute/stdbathcby/stdbathcby.component';
import { LedgerComponent } from './institute/ledger/ledger.component';
import { AddEditLedgerComponent } from './institute/add-edit-ledger/add-edit-ledger.component';
import { ProfitLossComponent } from './institute/profit-loss/profit-loss.component';
import { AddEditProfitLossComponent } from './institute/add-edit-profit-loss/add-edit-profit-loss.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


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
    QueryComponent,
    InsCourseComponent,
    ViewportComponent,
    InsbatchComponent,
    InsstudentComponent,
    InsadmissionComponent,
    ReceivedformComponent,
    InstQuizComponent,
    AddEditInstQuizComponent,
    InstQueryComponent,
    InstNotificationComponent,
    AddEditInstNotificationComponent,
    InstChangePasswordComponent,
    InstBookComponent,
    InstNotesComponent,
    InstSyllabusComponent,
    InstQuestionBankComponent,
    AddEditInstQuestionBankComponent,
    AddEditInstBookComponent,
    AddEditInstNotesComponent,
    AddEditInstSyllabusComponent,
    AddEditRegistrationComponent,
    StdRegComponent,
    StdQueryComponent,
    StdChnangePwdComponent,
    StudentProfileComponent,
    InstituteUpdateProfileComponent,
    QuizDashboardComponent,
    InstquizdashboardComponent,
    CountryComponent,
    StateComponent,
    DistrictComponent,
    AddEditCountryComponent,
    AddEditDistrictComponent,
    AddEditStateComponent,
    OESComponent,
    ELearningComponent,
    AdminChangePasswordComponent,
    AddEditQueryComponent,
    EmployeeComponent,
    AddEditEmployeeComponent,
    ConverttoadmissionComponent,
    CertificateComponent,
    AddEditCertificateComponent,
    ResionComponent,
    QuizresultComponent,
    BlockComponent,
    AddEditBlockComponent,
    PanchayatComponent,
    AddEditPanchayatComponent,
    WardComponent,
    AddEditWardComponent,
    ExpenceComponent,
    AddEditExpenceComponent,
    StdbathcbyComponent,
    LedgerComponent,
    AddEditLedgerComponent,
    ProfitLossComponent,
    AddEditProfitLossComponent,
    PageNotFoundComponent,
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
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatSelectModule,
    MatSelectModule,
    HttpClientModule, 
    NgToastModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NgConfirmModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

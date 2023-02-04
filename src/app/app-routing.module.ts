import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { viewport } from '@popperjs/core';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminDuesComponent } from './admin/admin-dues/admin-dues.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminPaymetRecivedComponent } from './admin/admin-paymet-recived/admin-paymet-recived.component';
import { InsCourseComponent } from './admin/ins-course/ins-course.component';
import { InsadmissionComponent } from './admin/insadmission/insadmission.component';
import { InsbatchComponent } from './admin/insbatch/insbatch.component';
import { InsstudentComponent } from './admin/insstudent/insstudent.component';
import { InstituteComponent } from './admin/institute/institute.component';
import { TAndCComponent } from './admin/t-and-c/t-and-c.component';
import { ViewportComponent } from './admin/viewport/viewport.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdmissionComponent } from './institute/admission/admission.component';
import { BatchComponent } from './institute/batch/batch.component';
import { CourseComponent } from './institute/course/course.component';
import { EnquiryComponent } from './institute/enquiry/enquiry.component';
import { InstBookComponent } from './institute/inst-book/inst-book.component';
import { InstChangePasswordComponent } from './institute/inst-change-password/inst-change-password.component';
import { InstNotesComponent } from './institute/inst-notes/inst-notes.component';
import { InstNotificationComponent } from './institute/inst-notification/inst-notification.component';
import { InstQueryComponent } from './institute/inst-query/inst-query.component';
import { InstQuestionBankComponent } from './institute/inst-question-bank/inst-question-bank.component';
import { InstQuizComponent } from './institute/inst-quiz/inst-quiz.component';
import { InstSyllabusComponent } from './institute/inst-syllabus/inst-syllabus.component';
import { InstituteDashboardComponent } from './institute/institute-dashboard/institute-dashboard.component';
import { InstituteHomeComponent } from './institute/institute-home/institute-home.component';
import { InstituteLoginComponent } from './institute/institute-login/institute-login.component';
import { PaymentReceivedComponent } from './institute/payment-received/payment-received.component';
import { StdDuesComponent } from './institute/std-dues/std-dues.component';
import { StudentComponent } from './institute/student/student.component';
import { OnlineTestComponent } from './student/online-test/online-test.component';
import { QueryComponent } from './student/query/query.component';
import { QuizeComponent } from './student/quize/quize.component';
import { ResultComponent } from './student/result/result.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { StudentLoginComponent } from './student/student-login/student-login.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { TakeAddmissionComponent } from './student/take-addmission/take-addmission.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'adminlogin', component: AdminLoginComponent },

  {
    path: 'adminhome', component: AdminHomeComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'institute', component: InstituteComponent, },
      {
        path: 'inscourse', component: ViewportComponent,
        children: [
          { path: '', component: InsCourseComponent },
          { path: 'course', component: CourseComponent },
        ]
      },
      {
        path: 'insbatch', component: ViewportComponent,
        children: [
          { path: '', component: InsbatchComponent },
          { path: 'batch', component: BatchComponent },
        ]
      },
      {
        path: 'insstudent', component: ViewportComponent,
        children: [
          { path: '', component: InsstudentComponent },
          { path: 'student', component: StudentComponent },
        ]
      },
      {
        path: 'insadmission', component: ViewportComponent,
        children: [
          { path: '', component: InsadmissionComponent },
          { path: 'admission', component: AdmissionComponent },
        ]
      },

      { path: 'inspayment', component: AdminPaymetRecivedComponent },
      { path: 'insdues', component: AdminDuesComponent },
      { path: 'terms', component: TAndCComponent }
    ]
  },

  { path: 'institutelogin', component: InstituteLoginComponent },
  {
    path: 'institutehome', component: InstituteHomeComponent,
    children: [
      { path: '', component: InstituteDashboardComponent },
      { path: 'dashboard', component: InstituteDashboardComponent },
      { path: 'course', component: CourseComponent },
      { path: 'batch', component: BatchComponent },
      { path: 'student', component: StudentComponent },
      { path: 'admission', component: AdmissionComponent },
      { path: 'enquiry', component: EnquiryComponent },
      { path: 'fee', component: PaymentReceivedComponent },
      { path: 'dues', component: StdDuesComponent },
      { path: 'instquiz', component: InstQuizComponent },
      { path: 'instquery', component: InstQueryComponent },
      { path: 'instnotification', component: InstNotificationComponent },
      { path: 'instbook', component: InstBookComponent },
      { path: 'instnotes', component: InstNotesComponent },
      { path: 'instsyllabus', component: InstSyllabusComponent },
      { path: 'instquestionbank', component: InstQuestionBankComponent },

    ]
  },

  {
    path: 'studentlogin', component: StudentLoginComponent,
  },
  {
    path: 'studenthome', component: StudentHomeComponent,
    children: [
      { path: '', component: StudentDashboardComponent },
      { path: 'dashboard', component: StudentDashboardComponent },
      { path: 'course', component: CourseComponent },
      { path: 'batch', component: BatchComponent },
      { path: 'takeaddmission', component: TakeAddmissionComponent },
      { path: 'studentprofile', component: StudentProfileComponent },
      { path: 'paymentreceived', component: PaymentReceivedComponent },
      { path: 'dues', component: StdDuesComponent },
      { path: 'query', component: QueryComponent },
      { path: 'onlinetest', component: OnlineTestComponent },
      { path: 'result', component: ResultComponent },
      { path: 'quize', component: QuizeComponent },
      { path: 'instbook', component: InstBookComponent },
      { path: 'instnotes', component: InstNotesComponent },
      { path: 'instsyllabus', component: InstSyllabusComponent },
      { path: 'instquestionbank', component: InstQuestionBankComponent },


    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

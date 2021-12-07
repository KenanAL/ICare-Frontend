import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CategoryComponent } from './components/Home/icare/category/category.component';
import { HomeComponent } from './components/Home/icare/home/home.component';
import { ProductComponent } from './components/Home/icare/product/product.component';
import { AboutComponent } from './components/Home/icare/about/about.component';
import { ContactComponent } from './components/Home/icare/contact/contact.component';
import { FooterComponent } from './components/Home/icare/footer/footer.component';
import { DrugsComponent } from './components/Patient/Account/drugs/drugs.component';
import { OrdersComponent } from './components/Patient/Account/orders/orders.component';
import { WaterComponent } from './components/Patient/Account/water/water.component';
import { WishlistComponent } from './components/Patient/Account/wishlist/wishlist.component';
import { OrderDetailsComponent } from './components/Patient/Account/order-details/order-details.component';

import { CartComponent } from './components/Patient/Shop/cart/cart.component';
import { CheckOutComponent } from './components/Patient/Shop/check-out/check-out.component';
import { ProductSingleComponent } from './components/Patient/Shop/product-single/product-single.component';
import { ThankYouComponent } from './components/Patient/Shop/thank-you/thank-you.component';

import { HealthReportComponent } from './components/Patient/Account/health-report/health-report.component';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './components/Patient/Index/patient/patient.component';
import { IndexComponent } from './components/Patient/Index/patient/index/index.component';
import { ICareComponent } from './components/Home/icare/icare.component';
import { ProductCategoryComponent } from './components/Patient/Shop/product-category/product-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './components/User/header/header.component';
import { LoginComponent } from './components/User/login/login.component';
import { SubscribeComponent } from './components/User/subscribe/subscribe.component';
import { RegistrationComponent } from './components/User/registration/registration.component';
import { ForgotPasswordComponent } from './components/User/forgot-password/forgot-password.component';
import { PaymentComponent } from './components/User/payment/payment.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authInterceptorProviders } from './services/auth.Interceptor';
import { Patient2Component } from './components/patient2/patient2.component';
import { Patient2Module } from './lazyLoad/patient2/patient2.module';
import { AddDrugComponent } from './components/patient2/add-drug/add-drug.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminDashboardModule } from './lazyLoad/admin-dashboard/admin-dashboard.module';
import { Home2Component } from './components/home2/home2.component';
import { Home2Module } from './lazyLoad/home2/home2.module';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { MainComponent } from './components/home2/main/main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/Home',
    pathMatch: 'full',
  },
  {
    path: 'Home',
    component:Home2Component,
    loadChildren: () =>
      import('./lazyLoad/home2/home2-routing.module').then(
        (m) => m.Home2RoutingModule
      ),
  },
  {
    path: 'Patient',
    component : Patient2Component,
    loadChildren: () =>
      import('./lazyLoad/patient2/patient2-routing.module').then(
        (m) => m.Patient2RoutingModule
      )
  },
  {
    path: 'Admin',
    component:AdminDashboardComponent, 
    loadChildren: () =>
      import('./lazyLoad/admin-dashboard/admin-dashboard-routing.module').then(
        (m) => m.AdminDashboardRoutingModule
      )
  }
];
@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    HomeComponent,
    ProductComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    DrugsComponent,
    OrdersComponent,
    WaterComponent,
    WishlistComponent,
    OrderDetailsComponent,
    IndexComponent,
    CartComponent,
    CheckOutComponent,
    ProductSingleComponent,
    ThankYouComponent,
    HealthReportComponent,
    PatientComponent,
    ICareComponent,
    ProductCategoryComponent,
    HeaderComponent,
    LoginComponent,
    SubscribeComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    PaymentComponent,
    AddDrugComponent,
    Patient2Component,
    AdminDashboardComponent,
    Home2Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Patient2Module,
    Home2Module,
    AdminDashboardModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    IvyCarouselModule
  ],
  
  providers: [
    authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}

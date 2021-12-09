import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Home2RoutingModule } from './home2-routing.module';
import { MainComponent } from 'src/app/components/home2/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/components/home2/login/login.component';
import { RegistrationComponent } from 'src/app/components/home2/registration/registration.component';
import { DrugComponent } from 'src/app/components/home2/drug/drug.component';
import { DrugsComponent } from 'src/app/components/home2/drugs/drugs.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CartComponent } from 'src/app/components/home2/cart/cart.component';
import { CheckOutComponent } from 'src/app/components/home2/check-out/check-out.component';


@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    RegistrationComponent,
    DrugComponent,
    DrugsComponent,
    CartComponent,
    CheckOutComponent
  ],
  imports: [
    CommonModule,
    Home2RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IvyCarouselModule

  ]
})
export class Home2Module { }

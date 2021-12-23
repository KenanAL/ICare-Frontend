import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/Constants/constants';
import { TokenStorageService } from 'src/app/services/token.service';

@Component({
  selector: 'app-delivery-dashboard',
  templateUrl: './delivery-dashboard.component.html',
  styleUrls: ['./delivery-dashboard.component.css'],
})
export class DeliveryDashboardComponent implements OnInit {
  name:string ;
  constructor(
    private tokenService:TokenStorageService
  ) { 
  }
  ngOnInit(): void {
    this.name=this.tokenService.getUser();
  }
  logOut() {
    this.tokenService.signOut();
  }
}

import { Component, inject, signal } from '@angular/core';
import { ApiError } from '../../../types/error';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css',
})
export class ServerError {

  protected error : ApiError;
  private router = inject(Router);
  protected showDetials = false;

  constructor(){
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras.state?.['err']
  }

  detailsToggle(){
    this.showDetials = !this.showDetials
  }

}

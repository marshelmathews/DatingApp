import { Component, inject, signal } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AccountService } from '../../core/services/account-service';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected creds: any = {}
  protected accountService = inject(AccountService);
  protected loggedIn = signal(false);
  protected route = inject(Router);
  private toastService = inject(ToastService)
  login(){
    this.accountService.login(this.creds).subscribe({
      next : result => {
        this.route.navigateByUrl('/members')
        this.creds = {}
        this.toastService.success('Logged In Successfully')
      },
      error :  err => this.toastService.error(err.error)
    })
  }

  logout(){
    localStorage.removeItem('user');
    this.accountService.currentUser.set(null);
    this.route.navigateByUrl('/');
  }
}

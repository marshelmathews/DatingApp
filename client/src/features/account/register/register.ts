import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds, User } from '../../../types/user';
import { AccountService } from '../../../core/services/account-service';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  membersFromHome = input.required<User []>();
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;
  protected accountService = inject(AccountService);
  protected toastService  = inject(ToastService);

  register(){
    this.accountService.Register(this.creds).subscribe({
      next : response =>{
        console.log(response);
        this.cancel();
      },
      error : err => {
        this.toastService.error(err.error)
      }
    })
  }

  cancel(){
   this.cancelRegister.emit(false)
  }
}

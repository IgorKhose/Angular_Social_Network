import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})


export class LoginPageComponent {
  authService =  inject(AuthService);

  form : FormGroup<{ username: FormControl; password: FormControl; }> = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  onSubmit() :void {
    if(this.form.valid) {
      console.log(this.form.value);
      //@ts-ignore
      this.authService.login(this.form.value).subscribe(res => {
        console.log(res);
      })
    }
      
  }


}
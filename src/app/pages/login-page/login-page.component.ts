import { Component, inject, Inject, signal, WritableSignal } from '@angular/core';
import { from, map, take} from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})


export class LoginPageComponent {
  authService =  inject(AuthService);
  router = inject(Router);

  isPasswordVisible: WritableSignal<boolean> = signal<boolean>(false);

  form : FormGroup<{ username: FormControl; password: FormControl; }> = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  onSubmit() :void {
    //this.isPasswordVisible.set(true);
    if(this.form.valid) {
      //@ts-ignore
      this.authService.login(this.form.value).subscribe(res => {
        this.router.navigate([""]);
        console.log(res);
      })
    }
      
  }


}

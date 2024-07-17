import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { from, map, take, tap, pipe} from 'rxjs';
import { TokenResponse } from './auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http : HttpClient = inject(HttpClient);
  baseApiUrl: string = "https://icherniakov.ru/yt-course/auth/";
  cookieService = inject(CookieService);

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if(!this.token) {
      this.token = this.cookieService.get("token");
    }
    // !! defines to return a boolean value
    return !!this.token;
  }

  login(payload: {username: string, password: string}) {
    const fd: FormData = new FormData();

    fd.append("username", payload.username);
    fd.append("password", payload.password);
    
    return this.http.post<TokenResponse>(`${this.baseApiUrl}token`, fd).pipe(
      tap(val => {
        this.token = val.access_token;
        this.refreshToken = val.refresh_token;

        this.cookieService.set("token", this.token);
        this.cookieService.set("token", this.refreshToken);
      })
    )//.subscribe(console.log("AAAA"));
  }
}

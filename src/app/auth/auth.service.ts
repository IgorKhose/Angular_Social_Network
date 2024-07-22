import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { from, map, take, tap, pipe, catchError, throwError} from 'rxjs';
import { TokenResponse } from './auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http : HttpClient = inject(HttpClient);
  baseApiUrl: string = "https://icherniakov.ru/yt-course/auth/";
  cookieService = inject(CookieService);
  router: Router = inject(Router);

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if(!this.token) {
      this.token = this.cookieService.get("token");
      this.refreshToken = this.cookieService.get("refreshToken");
    }
    // !! defines to return a boolean value
    return !!this.token;
  }

  login(payload: {username: string, password: string}) {
    const fd: FormData = new FormData();

    fd.append("username", payload.username);
    fd.append("password", payload.password);
    
    return this.http.post<TokenResponse>(`${this.baseApiUrl}token`, fd).pipe(
      tap(val => this.saveTokens(val))
      )
  }

  refreshAuthToken() {
    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}refresh`, {
        refresh_token: this.refreshToken
      }
    ).pipe(
      tap(val => this.saveTokens(val)),
      catchError(err => {
        this.logout();
        return throwError(err);
      })
    )
  }

   logout(): void {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(["/login"]);
  }

  saveTokens(res: TokenResponse) {
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;

    this.cookieService.set("token", this.token);
    this.cookieService.set("refreshToken", this.refreshToken);
  }
}

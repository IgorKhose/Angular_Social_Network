import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { AuthService } from './auth.service';
import { pipe, catchError, throwError, switchMap } from 'rxjs';

let isRefreshing: boolean = false;

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.token;

    if(!token) return next(req);
    if(isRefreshing) {
        refreshAndProceed(authService, req, next);
    }
    return next(addToken(req, token))
    .pipe(
        catchError(error => {
            if(error.status === 403) {
                return refreshAndProceed(authService, req, next);
            } else {
                return throwError(error);
            }
        })
    )
}

const refreshAndProceed = (
    authService: AuthService, 
    req: HttpRequest<any>, 
    next: HttpHandlerFn) => {
        if(!isRefreshing) {
            isRefreshing = true;
            return authService.refreshAuthToken()
        .pipe(
            switchMap((res) => {
                isRefreshing = false;
                return next(addToken(req, res.access_token));
            })
        )
        }
        return next(addToken(req, authService.token!));
}

const addToken = (req: HttpRequest<any>, token: string) => {
    return req = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    })
}
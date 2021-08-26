import { Injectable } from '@angular/core'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr'
import { LocalStorageService } from 'ngx-webstorage'
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private toastr: ToastrService,
        private router: Router,
        private storage: LocalStorageService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError(error => {
                if (error.status === 401) {
                    this.toastr.error('Authorization Failed');
                    this.storage.clear();
                    this.router.navigate(['login']);
                }
                throw error
            })
        )
    }
}

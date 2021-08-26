import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { User } from 'src/app/api_codegen/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private temp: boolean = false;

    constructor(
        private storage: LocalStorageService
    ) { }

    get isAuthorized(): boolean {
        return this.storage.retrieve(environment.webStorage.auth);
    }

    setAuthorized() {
        this.temp = true;
    }

    get loggedInUser(): User {
        return this.storage.retrieve(environment.webStorage.user);
    }
}

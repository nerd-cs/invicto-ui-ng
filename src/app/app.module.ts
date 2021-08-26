import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule, Configuration } from './api_codegen';

import { environment } from 'src/environments/environment';
import { AuthInterceptor } from '@app-core/interceptors/auth.interceptor';

export function apiConfig(): Configuration {
    return new Configuration({
        basePath: environment.serverUrl,
        withCredentials: true
    })
}
@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgxWebstorageModule.forRoot({ prefix: environment.webStorage.prefix }),
        ApiModule.forRoot(apiConfig),
        ToastrModule.forRoot(),
        TranslateModule.forRoot(),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

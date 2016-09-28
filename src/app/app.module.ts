import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, Http, XHRBackend, BaseRequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { fakeBackendProvider } from './fake-backend-provider';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CustomHttp } from './services/custom-http';
import { ConfigService } from './services/config.service';


export function loadCustomHttp(backend: XHRBackend, defaultOptions: RequestOptions,
  router: Router) {
  return new CustomHttp(backend, defaultOptions, router);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
    {
      provide: Http,
      useFactory: loadCustomHttp,
      deps: [XHRBackend, RequestOptions, Router] 
    },
    ConfigService,
    { 
      provide: APP_INITIALIZER, 
      useFactory: (config: ConfigService) => () => config.load(), 
      deps:[ConfigService, Http],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

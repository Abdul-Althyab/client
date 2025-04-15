import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loaderInterceptor } from './core/Interceptor/loader.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    RouterModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      closeButton: true,
      positionClass: 'toast-top-right',
      timeOut: 1500,
      progressBar: true,
      countDuplicates: true,
    }),
  ],
  providers: [
    provideHttpClient(withInterceptors([loaderInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

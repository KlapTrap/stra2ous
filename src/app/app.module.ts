import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouteModule } from './app.routing';
import { CoreModule } from './core/core.module';
import { ApplicationsModule } from './features/applications/applications.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { HomeModule } from './features/home/home.module';
import { LoginModule } from './features/login/login.module';
import { UAASetupModule } from './features/uaa-setup/uaa-setup.module';
import { SharedModule } from './shared/shared.module';
import { AppStoreModule } from './store/store.module';
import { LoggedInService } from './logged-in.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppStoreModule,
    SharedModule,
    RouteModule,
    ApplicationsModule,
    UAASetupModule,
    LoginModule,
    HomeModule,
    DashboardModule
  ],
  providers: [
    LoggedInService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

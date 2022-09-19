import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { reducers } from './store/reducers';
import { rootEffects } from './store/effects';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsListModule } from './projects-list/projects-list.module';
import { ProjectModule } from './project/project.module';
import { ErrorModalComponent } from './shared/error-modal/error-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(rootEffects),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    SharedModule,
    CoreModule,
    AuthModule,
    ProjectsListModule,
    ProjectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthenticationService } from './providers/index';
import { ApiService } from './providers/index';
import { InfoStan } from './infostan/infostan';
import { InfoMajstor } from './infomajstor/infomajstor';
import { InfoPredstavnik } from './infopredstavnik/infopredstavnik';
import { HomePage } from './myhome/homepage';
import { LoginComponent } from './mylogin/loginpage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { HttpModule } from '@angular/http';
import { MyDatePickerModule } from 'mydatepicker';
import { TypeaheadModule } from 'ngx-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination'
import { MyModalModule } from './modal/modal.module';
import { DataService } from './myservice/data-service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SifrDataService } from './myservice/sifrdata';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ControlMessagesComponent } from './mylogin/control-messages.component';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

import { PopoverModule } from "ngx-popover";




@NgModule({
  declarations: [
    AppComponent
    , InfoPredstavnik
    , InfoMajstor
    , InfoStan
    , HomePage
    , LoginComponent,
    ControlMessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpModule,
    MyDatePickerModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MyModalModule,
    TypeaheadModule.forRoot(),
    BsDropdownModule.forRoot(),
    PopoverModule,


  ],
  providers: [AuthenticationService, ApiService, DataService, , SifrDataService, CookieService,],
  bootstrap: [AppComponent]

})
export class AppModule { }

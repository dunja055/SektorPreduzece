
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { VoziloComponent } from './components/vozilo/vozilocomponents';
import { AutomobilComponent } from './components/automobil/automobil.component';
import { MatButtonModule,
         MatIconModule,
         MatSidenavModule,
         MatExpansionModule,
         MatListModule,
         MatGridListModule,
         MatTableModule,
         MatToolbarModule,
         MatSelectModule,
         MatOptionModule,
         MatSnackBarModule,
         MatDialogModule,
         MatInputModule,
         MatSortModule,
         MatPaginatorModule} from '@angular/material';
import { HomeComponent } from './components/core/home/home.component';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';
import { ObrazovanjeComponent } from './components/obrazovanje/obrazovanje.component';
import { PreduzeceComponent } from './components/preduzece/preduzece.component';
import { SektorComponent } from './components/sektor/sektor.component';
import { RadnikComponent } from './components/radnik/radnik.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';
import { ObrazovanjeDialogComponent } from './components/dialogs/obrazovanje-dialog/obrazovanje-dialog.component';
import { FormsModule } from '@angular/forms';
import { SektorService } from 'src/app/services/sektor.service';
import { SektorDialogComponent } from './components/dialogs/sektor-dialog/sektor-dialog.component';
import { PreduzeceDialogComponent } from './components/dialogs/preduzece-dialog/preduzece-dialog.component';
import { PreduzeceService } from './services/preduzece.service';
import { RadnikService } from './services/radnik.service';
import { RadnikDialogComponent } from './components/dialogs/radnik-dialog/radnik-dialog.component';

const Routes = [
  { path: 'obrazovanje', component: ObrazovanjeComponent },
  { path: 'preduzece', component: PreduzeceComponent },
  { path: 'sektor', component: SektorComponent },
  { path: 'radnik', component: RadnikComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'author', component: AuthorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    VoziloComponent,
    AutomobilComponent,
    HomeComponent,
    AboutComponent,
    AuthorComponent,
    ObrazovanjeComponent,
    PreduzeceComponent,
    SektorComponent,
    RadnikComponent,
    ObrazovanjeDialogComponent,
    SektorDialogComponent,
    PreduzeceDialogComponent,
    RadnikDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    MatOptionModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule.forRoot(Routes)
  ],
  entryComponents: [
    ObrazovanjeDialogComponent,
    PreduzeceDialogComponent,
    SektorDialogComponent,
    RadnikDialogComponent
  ],
  providers: [ObrazovanjeService, PreduzeceService, SektorService, RadnikService],
  bootstrap: [AppComponent]
})
export class AppModule { }

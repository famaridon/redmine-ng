import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarNavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

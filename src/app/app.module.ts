import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoadingAnimationComponent } from './jcj-common/loading-animation/loading-animation.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SideDrawerComponent } from './side-drawer/side-drawer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingAnimationComponent,
    NavbarComponent,
    HomeComponent,
    ContactComponent,
    PortfolioComponent,
    SideDrawerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

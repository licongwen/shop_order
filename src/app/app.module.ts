import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ShopMainPage } from '../pages/shop-main/shop-main';
import { ShopCartPage } from '../pages/shop-cart/shop-cart';
import { LoginPage } from '../pages/login/login';
import { ConfirmOrderPage } from '../pages/confirm-order/confirm-order';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ShopMainPage,
    ShopCartPage,
    LoginPage,
    ConfirmOrderPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShopMainPage,
    ShopCartPage,
    LoginPage,
    ConfirmOrderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

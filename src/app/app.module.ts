import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ToastController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
//IMPORTAMOS ADMOB FREE
import { AdMob } from '@capacitor-community/admob';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Browser } from '@capacitor/browser';
//IMPORTAMOS SERVICIO ADMOB PROPIO.
import { GeneroService } from './services/genero.service';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { MusicControls } from '@awesome-cordova-plugins/music-controls/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
    Media,ToastController,VideoPlayer,GeneroService,GoogleAnalytics,CallNumber,StreamingMedia,ScreenOrientation,MusicControls],
  bootstrap: [AppComponent],
})
export class AppModule {}

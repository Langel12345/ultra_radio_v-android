import { Component } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { GeneroService } from './services/genero.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AdMob } from '@capacitor-community/admob';
import { environment } from 'src/environments/environment';
import { MusicControls } from '@awesome-cordova-plugins/music-controls/ngx';
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    public notas = null;
    public cantplay = false;
    public cantstop = false;
    public file = null;
    public counter = 0;
    constructor(
        private menu: MenuController,
        private media: Media,
        public toastController: ToastController,
        public platform: Platform,
        private generoService: GeneroService,
        private router: Router,
        private musicControls: MusicControls
    ) {
        AdMob.initialize({
            requestTrackingAuthorization: true,
            testingDevices: ['d06ee653-0493-48a5-814a-917568b5c979'],
            initializeForTesting: true,
        });
        this.platform.ready().then(() => {
            document.addEventListener('backbutton', async () => {
                if (this.counter === 0) {
                this.counter++;
                this.alertToast();
                setTimeout(() => {
                    this.counter = 0;
                }, 3000);
                } else {
                (navigator as any).app.exitApp();
                this.musicControls.destroy();
                }
            });
        });
    }

    async alertToast() {
        const toast = await this.toastController.create({
        message: 'Presiona de nuevo para salir.',
        duration: 300,
        position: 'top',
        });
        toast.present();
    }
    SelectGenero(code: any) {
        this.menu.close('first');
        this.generoService.presentLoading().then(() => {
        this.router.navigate(['/home/' + code]);
        });
    }
    Start(url: any) {
        if (url == '') {
        this.presentToast();
        } else {
        this.file = this.media.create(url);
        this.file.play();
        this.cantplay = true;
        this.cantstop = false;
        }
    }
    Pause() {
        this.cantplay = false;
        this.cantstop = true;
        this.file.stop();
    }
    async presentToast() {
        const toast = await this.toastController.create({
        message: 'No se encontro una frecuencia.',
        duration: 2000,
        });
        toast.present();
    }
}

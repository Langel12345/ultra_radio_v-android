
    import { Injectable } from '@angular/core';
    import { LoadingController } from '@ionic/angular';
    import { Platform } from '@ionic/angular';
    //IMPORTAMOS LO QUE VAMOS A UTILIZAR DE ADMOB.
    import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
    import { AdMob,AdOptions, BannerAdOptions, BannerAdSize, BannerAdPosition, BannerAdPluginEvents,
    AdMobBannerSize,RewardAdOptions,RewardAdPluginEvents,AdLoadInfo,AdMobRewardItem } from '@capacitor-community/admob';
    import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";

    @Injectable({
    providedIn: 'root'
    })


export class GeneroService {
  //CONFIGURACION DEL BANNER
    bannerConfig: BannerAdOptions = {
        adId: 'ca-app-pub-5226977568015285/7716952383',
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        }; 
    
    videoConfig:  AdOptions = {
        adId:'ca-app-pub-5226977568015285/6403870714',
        //'ca-app-pub-5226977568015285/6403870714',
        isTesting:false,
        
    };
    RewardVideoConfig: RewardAdOptions = {
        adId:'ca-app-pub-3940256099942544/8691691433',
        //'ca-app-pub-5797668196522269/2199351062',
        isTesting: false, // DURANTE DEL DESARROLLO
        //id: "ID GENERADO EN ADMOB ca-app-pub"
        };
        
    public notas= null;
    public notasGeneral=[]
        
    constructor(
        private loadingController:LoadingController,
        public platform: Platform,
        private ga:GoogleAnalytics,
    
        ) {
        
    }
    mostrarBaner(){
        AdMob.showBanner(this.bannerConfig);
    }
    mostarVideo(){
        AdMob.prepareInterstitial(this.videoConfig).then(() => {
        console.log('INTERSTIAL LOADED AND SHOWING')
        }).catch(e =>
        console.log('ERRORL: ', e)
        );

        AdMob.showInterstitial().then(() => {
        console.log('INTERSTIAL SHOW')
        }).catch(e =>
        console.log('ERRORL: ', e)
        );
    }
    videoAnuncion(){
        /*  AdMob.addListener(RewardAdPluginEvents.Loaded, (info: AdLoadInfo) => {
            // Subscribe prepared rewardVideo
        });
        
        AdMob.addListener(RewardAdPluginEvents.Rewarded, (rewardItem: AdMobRewardItem) => {
            // Subscribe user rewarded
            console.log(rewardItem);
        });
        AdMob.prepareRewardVideoAd(this.RewardVideoConfig);
        const rewardItem = AdMob.showRewardVideoAd();*/
    }
    async presentLoading() {
        const loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Espere un momento porfavor...',
            duration: 2000
        });
    
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
        console.log('Loading dismissed!');
    }
    GoogleAnalytics(){
        this.platform.ready().then(() => {
            this.ga.startTrackerWithId('G-YHVC2Z2HWZ')
            .then(() => {
            console.log('Google analytics is ready now');
            this.ga.trackView('Ingreso app');
            this.ga.trackView('Principal', '', true)
            }).catch(e => console.log('Error starting GoogleAnalytics', e));
        });
    }
}

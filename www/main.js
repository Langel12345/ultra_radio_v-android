(self["webpackChunkRadioAngular"] = self["webpackChunkRadioAngular"] || []).push([["main"],{

/***/ 98255:
/*!*******************************************************!*\
  !*** ./$_lazy_route_resources/ lazy namespace object ***!
  \*******************************************************/
/***/ ((module) => {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(() => {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = () => ([]);
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 98255;
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ 90158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 39895);



const routes = [
    {
        path: '',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_home_home_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./home/home.module */ 3467)).then(m => m.HomePageModule)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule)({
        imports: [
            _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forRoot(routes, { preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_2__.PreloadAllModules, useHash: true })
        ],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule]
    })
], AppRoutingModule);



/***/ }),

/***/ 55041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./app.component.html */ 91106);
/* harmony import */ var _app_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component.scss */ 43069);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _ionic_native_media_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/media/ngx */ 73661);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var _services_genero_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/genero.service */ 90457);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @capacitor-community/admob */ 15453);
/* harmony import */ var _awesome_cordova_plugins_music_controls_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @awesome-cordova-plugins/music-controls/ngx */ 51458);











let AppComponent = class AppComponent {
    constructor(menu, media, toastController, platform, generoService, router, musicControls) {
        this.menu = menu;
        this.media = media;
        this.toastController = toastController;
        this.platform = platform;
        this.generoService = generoService;
        this.router = router;
        this.musicControls = musicControls;
        this.notas = null;
        this.cantplay = false;
        this.cantstop = false;
        this.file = null;
        this.counter = 0;
        _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_4__.AdMob.initialize({
            requestTrackingAuthorization: true,
            testingDevices: ['d06ee653-0493-48a5-814a-917568b5c979'],
            initializeForTesting: true,
        });
        this.platform.ready().then(() => {
            document.addEventListener('backbutton', () => (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
                if (this.counter === 0) {
                    this.counter++;
                    this.alertToast();
                    setTimeout(() => {
                        this.counter = 0;
                    }, 3000);
                }
                else {
                    navigator.app.exitApp();
                    this.musicControls.destroy();
                }
            }));
        });
    }
    alertToast() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: 'Presiona de nuevo para salir.',
                duration: 300,
                position: 'top',
            });
            toast.present();
        });
    }
    SelectGenero(code) {
        this.menu.close('first');
        this.generoService.presentLoading().then(() => {
            this.router.navigate(['/home/' + code]);
        });
    }
    Start(url) {
        if (url == '') {
            this.presentToast();
        }
        else {
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
    presentToast() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: 'No se encontro una frecuencia.',
                duration: 2000,
            });
            toast.present();
        });
    }
};
AppComponent.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.MenuController },
    { type: _ionic_native_media_ngx__WEBPACK_IMPORTED_MODULE_2__.Media },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ToastController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.Platform },
    { type: _services_genero_service__WEBPACK_IMPORTED_MODULE_3__.GeneroService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__.Router },
    { type: _awesome_cordova_plugins_music_controls_ngx__WEBPACK_IMPORTED_MODULE_5__.MusicControls }
];
AppComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'app-root',
        template: _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_app_component_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], AppComponent);



/***/ }),

/***/ 36747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 38583);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/platform-browser */ 39075);
/* harmony import */ var _ionic_native_media_ngx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ionic-native/media/ngx */ 73661);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component */ 55041);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ 90158);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var _ionic_native_video_player_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/video-player/ngx */ 524);
/* harmony import */ var _ionic_native_google_analytics_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/google-analytics/ngx */ 53076);
/* harmony import */ var _ionic_native_call_number_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/call-number/ngx */ 64687);
/* harmony import */ var _services_genero_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/genero.service */ 90457);
/* harmony import */ var _ionic_native_streaming_media_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/streaming-media/ngx */ 92109);
/* harmony import */ var _awesome_cordova_plugins_screen_orientation_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @awesome-cordova-plugins/screen-orientation/ngx */ 22321);
/* harmony import */ var _awesome_cordova_plugins_music_controls_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @awesome-cordova-plugins/music-controls/ngx */ 51458);













//IMPORTAMOS SERVICIO ADMOB PROPIO.




let AppModule = class AppModule {
};
AppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.NgModule)({
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent],
        entryComponents: [],
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_12__.BrowserModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonicModule.forRoot(), _app_routing_module__WEBPACK_IMPORTED_MODULE_2__.AppRoutingModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_14__.HttpClientModule],
        providers: [{ provide: _angular_common__WEBPACK_IMPORTED_MODULE_15__.LocationStrategy, useClass: _angular_common__WEBPACK_IMPORTED_MODULE_15__.HashLocationStrategy },
            _ionic_native_media_ngx__WEBPACK_IMPORTED_MODULE_0__.Media, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.ToastController, _ionic_native_video_player_ngx__WEBPACK_IMPORTED_MODULE_3__.VideoPlayer, _services_genero_service__WEBPACK_IMPORTED_MODULE_6__.GeneroService, _ionic_native_google_analytics_ngx__WEBPACK_IMPORTED_MODULE_4__.GoogleAnalytics, _ionic_native_call_number_ngx__WEBPACK_IMPORTED_MODULE_5__.CallNumber, _ionic_native_streaming_media_ngx__WEBPACK_IMPORTED_MODULE_7__.StreamingMedia, _awesome_cordova_plugins_screen_orientation_ngx__WEBPACK_IMPORTED_MODULE_8__.ScreenOrientation, _awesome_cordova_plugins_music_controls_ngx__WEBPACK_IMPORTED_MODULE_9__.MusicControls],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent],
    })
], AppModule);



/***/ }),

/***/ 90457:
/*!********************************************!*\
  !*** ./src/app/services/genero.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GeneroService": () => (/* binding */ GeneroService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var _ionic_native_google_analytics_ngx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ionic-native/google-analytics/ngx */ 53076);
/* harmony import */ var _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor-community/admob */ 15453);




//IMPORTAMOS LO QUE VAMOS A UTILIZAR DE ADMOB.


let GeneroService = class GeneroService {
    constructor(loadingController, platform, ga) {
        this.loadingController = loadingController;
        this.platform = platform;
        this.ga = ga;
        //CONFIGURACION DEL BANNER
        this.bannerConfig = {
            adId: 'ca-app-pub-5226977568015285/7716952383',
            adSize: _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_1__.BannerAdSize.BANNER,
            position: _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_1__.BannerAdPosition.BOTTOM_CENTER,
            margin: 0,
        };
        this.videoConfig = {
            adId: 'ca-app-pub-5226977568015285/6403870714',
            //'ca-app-pub-5226977568015285/6403870714',
            isTesting: false,
        };
        this.RewardVideoConfig = {
            adId: 'ca-app-pub-3940256099942544/8691691433',
            //'ca-app-pub-5797668196522269/2199351062',
            isTesting: false, // DURANTE DEL DESARROLLO
            //id: "ID GENERADO EN ADMOB ca-app-pub"
        };
        this.notas = null;
        this.notasGeneral = [];
    }
    mostrarBaner() {
        _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_1__.AdMob.showBanner(this.bannerConfig);
    }
    mostarVideo() {
        _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_1__.AdMob.prepareInterstitial(this.videoConfig).then(() => {
            console.log('INTERSTIAL LOADED AND SHOWING');
        }).catch(e => console.log('ERRORL: ', e));
        _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_1__.AdMob.showInterstitial().then(() => {
            console.log('INTERSTIAL SHOW');
        }).catch(e => console.log('ERRORL: ', e));
    }
    videoAnuncion() {
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
    presentLoading() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function* () {
            const loading = yield this.loadingController.create({
                cssClass: 'my-custom-class',
                message: 'Espere un momento porfavor...',
                duration: 2000
            });
            yield loading.present();
            const { role, data } = yield loading.onDidDismiss();
            console.log('Loading dismissed!');
        });
    }
    GoogleAnalytics() {
        this.platform.ready().then(() => {
            this.ga.startTrackerWithId('G-YHVC2Z2HWZ')
                .then(() => {
                console.log('Google analytics is ready now');
                this.ga.trackView('Ingreso app');
                this.ga.trackView('Principal', '', true);
            }).catch(e => console.log('Error starting GoogleAnalytics', e));
        });
    }
};
GeneroService.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.LoadingController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.Platform },
    { type: _ionic_native_google_analytics_ngx__WEBPACK_IMPORTED_MODULE_0__.GoogleAnalytics }
];
GeneroService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], GeneroService);



/***/ }),

/***/ 92340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    api: "https://localhost/api",
    idOneSignal: "4ef6adbc-875f-4c87-b526-999a3e8bac61",
    firebase_id: '868222514067'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 14431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ 24608);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 36747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 92340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
(0,_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__.platformBrowserDynamic)().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.log(err));


/***/ }),

/***/ 50863:
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./ion-action-sheet.entry.js": [
		47321,
		"common",
		"node_modules_ionic_core_dist_esm_ion-action-sheet_entry_js"
	],
	"./ion-alert.entry.js": [
		36108,
		"common",
		"node_modules_ionic_core_dist_esm_ion-alert_entry_js"
	],
	"./ion-app_8.entry.js": [
		31489,
		"common",
		"node_modules_ionic_core_dist_esm_ion-app_8_entry_js"
	],
	"./ion-avatar_3.entry.js": [
		10305,
		"common",
		"node_modules_ionic_core_dist_esm_ion-avatar_3_entry_js"
	],
	"./ion-back-button.entry.js": [
		15830,
		"common",
		"node_modules_ionic_core_dist_esm_ion-back-button_entry_js"
	],
	"./ion-backdrop.entry.js": [
		37757,
		"node_modules_ionic_core_dist_esm_ion-backdrop_entry_js"
	],
	"./ion-button_2.entry.js": [
		30392,
		"common",
		"node_modules_ionic_core_dist_esm_ion-button_2_entry_js"
	],
	"./ion-card_5.entry.js": [
		66911,
		"common",
		"node_modules_ionic_core_dist_esm_ion-card_5_entry_js"
	],
	"./ion-checkbox.entry.js": [
		30937,
		"common",
		"node_modules_ionic_core_dist_esm_ion-checkbox_entry_js"
	],
	"./ion-chip.entry.js": [
		78695,
		"common",
		"node_modules_ionic_core_dist_esm_ion-chip_entry_js"
	],
	"./ion-col_3.entry.js": [
		16034,
		"node_modules_ionic_core_dist_esm_ion-col_3_entry_js"
	],
	"./ion-datetime_3.entry.js": [
		68837,
		"common",
		"node_modules_ionic_core_dist_esm_ion-datetime_3_entry_js"
	],
	"./ion-fab_3.entry.js": [
		34195,
		"common",
		"node_modules_ionic_core_dist_esm_ion-fab_3_entry_js"
	],
	"./ion-img.entry.js": [
		41709,
		"node_modules_ionic_core_dist_esm_ion-img_entry_js"
	],
	"./ion-infinite-scroll_2.entry.js": [
		33087,
		"node_modules_ionic_core_dist_esm_ion-infinite-scroll_2_entry_js"
	],
	"./ion-input.entry.js": [
		84513,
		"common",
		"node_modules_ionic_core_dist_esm_ion-input_entry_js"
	],
	"./ion-item-option_3.entry.js": [
		58056,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item-option_3_entry_js"
	],
	"./ion-item_8.entry.js": [
		10862,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item_8_entry_js"
	],
	"./ion-loading.entry.js": [
		7509,
		"common",
		"node_modules_ionic_core_dist_esm_ion-loading_entry_js"
	],
	"./ion-menu_3.entry.js": [
		76272,
		"common",
		"node_modules_ionic_core_dist_esm_ion-menu_3_entry_js"
	],
	"./ion-modal.entry.js": [
		71855,
		"common",
		"node_modules_ionic_core_dist_esm_ion-modal_entry_js"
	],
	"./ion-nav_2.entry.js": [
		38708,
		"common",
		"node_modules_ionic_core_dist_esm_ion-nav_2_entry_js"
	],
	"./ion-popover.entry.js": [
		23527,
		"common",
		"node_modules_ionic_core_dist_esm_ion-popover_entry_js"
	],
	"./ion-progress-bar.entry.js": [
		24694,
		"common",
		"node_modules_ionic_core_dist_esm_ion-progress-bar_entry_js"
	],
	"./ion-radio_2.entry.js": [
		19222,
		"common",
		"node_modules_ionic_core_dist_esm_ion-radio_2_entry_js"
	],
	"./ion-range.entry.js": [
		25277,
		"common",
		"node_modules_ionic_core_dist_esm_ion-range_entry_js"
	],
	"./ion-refresher_2.entry.js": [
		39921,
		"common",
		"node_modules_ionic_core_dist_esm_ion-refresher_2_entry_js"
	],
	"./ion-reorder_2.entry.js": [
		83122,
		"common",
		"node_modules_ionic_core_dist_esm_ion-reorder_2_entry_js"
	],
	"./ion-ripple-effect.entry.js": [
		51602,
		"node_modules_ionic_core_dist_esm_ion-ripple-effect_entry_js"
	],
	"./ion-route_4.entry.js": [
		45174,
		"common",
		"node_modules_ionic_core_dist_esm_ion-route_4_entry_js"
	],
	"./ion-searchbar.entry.js": [
		7895,
		"common",
		"node_modules_ionic_core_dist_esm_ion-searchbar_entry_js"
	],
	"./ion-segment_2.entry.js": [
		76164,
		"common",
		"node_modules_ionic_core_dist_esm_ion-segment_2_entry_js"
	],
	"./ion-select_3.entry.js": [
		20592,
		"common",
		"node_modules_ionic_core_dist_esm_ion-select_3_entry_js"
	],
	"./ion-slide_2.entry.js": [
		27162,
		"node_modules_ionic_core_dist_esm_ion-slide_2_entry_js"
	],
	"./ion-spinner.entry.js": [
		81374,
		"common",
		"node_modules_ionic_core_dist_esm_ion-spinner_entry_js"
	],
	"./ion-split-pane.entry.js": [
		97896,
		"node_modules_ionic_core_dist_esm_ion-split-pane_entry_js"
	],
	"./ion-tab-bar_2.entry.js": [
		25043,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab-bar_2_entry_js"
	],
	"./ion-tab_2.entry.js": [
		77802,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab_2_entry_js"
	],
	"./ion-text.entry.js": [
		29072,
		"common",
		"node_modules_ionic_core_dist_esm_ion-text_entry_js"
	],
	"./ion-textarea.entry.js": [
		32191,
		"common",
		"node_modules_ionic_core_dist_esm_ion-textarea_entry_js"
	],
	"./ion-toast.entry.js": [
		40801,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toast_entry_js"
	],
	"./ion-toggle.entry.js": [
		67110,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toggle_entry_js"
	],
	"./ion-virtual-scroll.entry.js": [
		10431,
		"node_modules_ionic_core_dist_esm_ion-virtual-scroll_entry_js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 50863;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 43069:
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ 91106:
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-app>\r\n  <!--<ion-menu side=\"start\" menuId=\"first\" contentId=\"main\">\r\n    <ion-header>\r\n      <ion-toolbar color=\"primary\">\r\n        <ion-title>Géneros</ion-title>\r\n      </ion-toolbar>\r\n    </ion-header>\r\n    <ion-content>\r\n      <ion-list *ngFor=\"let genero of generos\">\r\n        <ion-chip color=\"secondary\" (click)=\"SelectGenero(genero.code)\">\r\n          <ion-icon :name=\"{{genero.icon}}\" color=\"secondary\"></ion-icon>\r\n          <ion-label>{{genero.name}}</ion-label>\r\n        </ion-chip>\r\n      </ion-list>\r\n    </ion-content>\r\n  </ion-menu>\r\n  <ion-menu side=\"end\" menuId=\"second\" contentId=\"main\">\r\n    <ion-header>\r\n      <ion-toolbar color=\"primary\">\r\n        <ion-title>Emisoras</ion-title>\r\n      </ion-toolbar>\r\n    </ion-header>\r\n    <ion-content>\r\n      <ion-list>\r\n        <ion-card>\r\n          <ion-card-header>\r\n            <ion-img :src={{escuchando.icon}}></ion-img>\r\n            <ion-title>{{escuchando.name}}</ion-title>\r\n          </ion-card-header>\r\n          <ion-card-content *ngIf=\"escuchando.id != 0\">\r\n            <ion-grid >\r\n              <ion-row>\r\n                <ion-col><ion-button (click)=\"shareNote()\" fill=\"clear\"><ion-icon name=\"share-social\"></ion-icon></ion-button> </ion-col>\r\n                <ion-col><ion-button :disabled=\"{{cantplay}}\" (click)=\"Start(escuchando.url)\" fill=\"clear\" ><ion-icon name=\"play\"></ion-icon></ion-button></ion-col>\r\n                <ion-col><ion-button :disabled=\"{{cantstop}}\" (click)=\"Pause(escuchando.url)\" fill=\"clear\" ><ion-icon name=\"pause\" ></ion-icon></ion-button></ion-col>\r\n               </ion-row>\r\n            </ion-grid>\r\n          </ion-card-content>\r\n        </ion-card>\r\n      </ion-list>\r\n      <ion-list *ngFor=\"let radio of radios\">\r\n        <ion-item>\r\n          <ion-list>\r\n            <ion-chip  (click)=\"selectRadio(radio)\" color=\"secondary\">\r\n              <ion-label >{{radio.name}}</ion-label>\r\n            </ion-chip>\r\n          </ion-list>\r\n         \r\n        </ion-item>\r\n      </ion-list>\r\n    </ion-content>\r\n  </ion-menu>\r\n-->\r\n  <ion-router-outlet id=\"main\"></ion-router-outlet>\r\n  <!--<ion-tabs>\r\n    <ion-tab-bar slot=\"bottom\" style=\"background-color: black;\">\r\n      <ion-tab-button tab=\"speakers\" style=\"background-color: black;\">\r\n        <ion-thumbnail>\r\n          <img width=\"100%\" src=\"assets/app/iconoestaciones.png\">\r\n        </ion-thumbnail>\r\n      </ion-tab-button>\r\n\r\n      <ion-tab-button tab=\"schedule\" style=\"background-color: black;\">\r\n        <ion-thumbnail>\r\n          <img width=\"100%\" src=\"assets/app/iconopodcast.png\">\r\n        </ion-thumbnail>\r\n      </ion-tab-button>\r\n    </ion-tab-bar>\r\n  </ion-tabs>\r\n-->\r\n</ion-app>\r\n");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(14431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map
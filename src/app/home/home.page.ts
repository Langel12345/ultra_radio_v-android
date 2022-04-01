import { Component, OnInit,DoCheck } from '@angular/core';
import { VideoPlayer, VideoOptions } from '@ionic-native/video-player/ngx';
import { GeneroService } from '../services/genero.service';
import { ActivatedRoute } from '@angular/router';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import axios from 'axios';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Browser } from '@capacitor/browser';
import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";
import { StreamingMedia, StreamingVideoOptions,StreamingAudioOptions } from '@ionic-native/streaming-media/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { identifierModuleUrl } from '@angular/compiler';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { MusicControls } from '@awesome-cordova-plugins/music-controls/ngx';
import { Platform } from '@ionic/angular';
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {  
    public notas=null;
    public sliders=[];
    public name=null;
    public img="/assets/img/personaje1.jpg";
    public escuchando={
        id:"",
        title:'',
        subtitle:'',
        img:'',
        fondo:"",
        url:"",
        icon:"",
        horario:"",
        frecuencia:"",
            redes_sociales:{
            facebook:"",
            whatsapp:"",
            phone:""
        },
        online: ""
    };
    public cantplay=true
    public cantstop=false
    public file:MediaObject
    // public audio: any
    public audio: HTMLAudioElement;
    public timeElapsed: BehaviorSubject<string> = new BehaviorSubject('00:00');
    public timeRemaining: BehaviorSubject<string> = new BehaviorSubject('-00:00');
    public percentElapsed: BehaviorSubject<number> = new BehaviorSubject(0);
    public percentLoaded: BehaviorSubject<number> = new BehaviorSubject(0);
    public playerStatus: BehaviorSubject<string> = new BehaviorSubject('paused');

    public promise : any
    public loading_web=null
    optons: VideoOptions
    slideOpts = {
        initialSlide:0,
        speed: 400
    }
    constructor(
            private router:Router,
            private video:VideoPlayer,
            private generoService:GeneroService,
            private activatedRoute:ActivatedRoute,
            private media: Media,
            public toastController: ToastController,
            private loadingController:LoadingController,
            private callNumber: CallNumber,
            private streamingMedia:StreamingMedia,
            private screenOrientation: ScreenOrientation,   
            private musicControls: MusicControls,
            public platform: Platform,
        ){
        
            this.optons = {volume: 0.8 };

            this.audio = new Audio();
            this.attachListeners();
            this.platform.resume.subscribe(async () => {
                this.loading_web.dismiss();
            });
            this.platform.pause.subscribe(async () => {
                this.loading_web.dismiss();
            });
    }
    

    private attachListeners(): void {
        this.audio.addEventListener('error', this.errorInPlayer, false);
        this.audio.addEventListener('timeupdate', this.calculateTime, false);
        this.audio.addEventListener('playing', this.setPlayerStatus, false);
        this.audio.addEventListener('pause', this.setPlayerStatus, false);
        this.audio.addEventListener('progress', this.calculatePercentLoaded, false);
        this.audio.addEventListener('waiting', this.setPlayerStatus, false);
        this.audio.addEventListener('ended', this.setPlayerStatus, false);
    }


    private errorInPlayer = (evt) => {
        this.loading_web.dismiss();
        this.presentToast("Audio no disponible")   
    }
    private calculateTime = (evt) => {
        let ct = this.audio.currentTime;
        let d = this.audio.duration;
        this.setTimeElapsed(ct);
        this.setPercentElapsed(d, ct);
        this.setTimeRemaining(d, ct);
    }

    private calculatePercentLoaded = (evt) => {
        if (this.audio.duration > 0) {
            for (var i = 0; i < this.audio.buffered.length; i++) {
                if (this.audio.buffered.start(this.audio.buffered.length - 1 - i) < this.audio.currentTime) {
                    let percent = (this.audio.buffered.end(this.audio.buffered.length - 1 - i) / this.audio.duration) * 100;
                    this.setPercentLoaded(percent)
                    break;
                }
            }
        }
    }

    private setPlayerStatus = (evt) => {
        console.log("eventos");        
        console.log(evt.type);
        
        switch (evt.type) {
            case 'playing':
                this.playerStatus.next('playing');
                this.cantplay = false
                if(this.loading_web) { 
                    this.loading_web.dismiss();
                }
                break;
            case 'pause':
                this.playerStatus.next('paused');
                this.cantplay = true
                break;
            case 'waiting':
                this.playerStatus.next('loading');
                this.loadingUrl();               
                break;
            case 'ended':
                this.playerStatus.next('ended');
                break;           
            default:
                this.playerStatus.next('paused');
                if(this.loading_web) { 
                    this.loading_web.dismiss();
                }
                break;
        }
    } 

    ngOnInit(){        
        //AL CARGAR LA PAGINA MOSTRAMOS BANNER
        //this.generoService.videoAnuncion();
        //this.screenOrientation.lock("portrait")
        this.generoService.mostrarBaner(); // Iniciar Banaer
        this.generoService.GoogleAnalytics() // Iniciar Google Analytics
        this.name=this.activatedRoute.snapshot.params.name
        if(navigator.onLine) {
        //https://ultranoticias.com.mx/radio2022/frecuencias.php
        // https://maxalert.com.mx/crons/frecuencias.php
           // this.loadingUrl();

            axios.get("https://ultranoticias.com.mx/radio2022/frecuencias.php").then(response => {
            
            //this.loading_web.dismiss();

            this.notas=response.data
            let count=0;
            for (let index = 0; index < this.notas.length; index++) {
                //console.log("Contador",count)
                let slide=this.notas.slice(count,count+2);
                if(slide.length >0){
                this.sliders.push(slide);
                }
                
                count+=2;
            }
            this.escuchando=this.notas[0]
            this.Start(this.escuchando)

            }).catch((e) => {
                this.presentToast('Ocurrio un error al cargar estaciones');
            })

        }else{
        let msj="Sin conexion a internet";
        this.presentToast(msj)
        }
        FirebaseAnalytics.initializeFirebase({
        apiKey: "AIzaSyByXlPZfzDixktlH9DsQ97T4DGnG3wt_sk",
        authDomain: "ultra-radio---android.firebaseapp.com",
        projectId: "ultra-radio---android",
        storageBucket: "ultra-radio---android.appspot.com",
        messagingSenderId: "780616027622",
        appId: "1:780616027622:web:d9e7c68e8e7b37b5519a27",
        measurementId: "${config.measurementId}"
        }); 
    } 
    
    ngAfterContentChecked(){ /// funcion esclusiva de angular se ejecuta antes de cargar el contenido
    
        let id="#card_nota"+this.escuchando.id
        $(".all_notas").removeClass("nota_selected")
        $(".all_notas").addClass("notas")
        $(id).removeClass("notas")
        $(id).addClass("nota_selected");
    }
    
    
    cambiar(nota){
        if(nota.id != this.escuchando.id){
            let id="#card_nota"+nota.id
            $(".all_notas").removeClass("nota_selected")
            $(".all_notas").addClass("notas")
            $(id).removeClass("notas")
            $(id).addClass("nota_selected");
            this.escuchando=null;            
            this.pauseAudio()          
            this.createReproductor(nota);
            this.setAudio(nota.url)
            this.escuchando=nota;        
        }        
    }

    Start(data: any) {
        if(data.url == ""){
            let msj="No se encuentro frecuencia";
            this.presentToast(msj)
        }else{
            //this.generoService.mostarVideo();
            this.createReproductor(data);
            this.setAudio(data.url)          
        }
    }

    Pause(){
        if(navigator.onLine) {
            this.pauseAudio()        
            this.cantplay=true;
            this.cantstop=false;      
        }else{
            let msj="Sin conexion a internet";
            this.presentToast(msj)       
        }    
    }

    async presentToast(mensaje) {
        const toast = await this.toastController.create({
        message: mensaje,
        duration: 2000,
        position: 'top'
        });
        toast.present();
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Reproducuiedo estacion...',
        duration: 6000
        });    
        await loading.present();
    }
    
    doRefresh(event) {
        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
            window.location.assign('/');
        }, 2000);
    }

    async facebook(url_f){
        await Browser.open({ url: url_f });
        this.redes_sociales("FACEBOOK",url_f);//Guardar en Firebase Eventos
    }

    async whatsapp(url_w){
        await Browser.open({ url: url_w});
        this.redes_sociales("WHATSAPP",url_w); //Guardar en Firebase Eventos        
    }

    phone(number){
        this.callNumber.callNumber(number, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
        this.redes_sociales("LLAMADAS",number) //Guardar en Firebase Eventos
    }

    async instagram(url){
        if(url ==""){
            this.presentToast("No disponible");
        }else{
            await Browser.open({ url: url});
            this.redes_sociales("instagram",url); //Guardar en Firebase Eventos        
        }    
    }

    async  twitter(url){
        if(url ==""){
            this.presentToast("No disponible");
        }else{
            await Browser.open({ url: url});
            this.redes_sociales("twitter",url); //Guardar en Firebase Eventos        
        }    
    }

    gaEvent(url) {
        FirebaseAnalytics.logEvent({
            name: "REPRODUJO_ESTACION",
            params: {
                page_title:url
            },
        });
    }  

    transicion(nota){
        FirebaseAnalytics.logEvent({
            name: "CAMBIO_ESTACION",
            params: {
                page_title:nota.title
            },
        });
    }

    redes_sociales(red,url){
        FirebaseAnalytics.logEvent({
            name: "RED_SOCIAL",
            params: {
            page_title: red,
            value: url,
            },
        });
    }
    
    streamingVideo(url){
        // this.screenOrientation.unlock();
        let options: StreamingVideoOptions ={
            successCallback:()=>{
                console.log("succcess")                
            },
            errorCallback:(errMsg)=>{
                this.presentToast("Ocurrio un error"+errMsg) 
            },
            orientation: 'landscape',
            controls: true,
            shouldAutoClose: true, 
        }
        this.streamingMedia.playVideo(url,options);
        FirebaseAnalytics.logEvent({
            name: "TV_ONLINE",
            params: {
                page_title: url,
            },
        });
        this.Pause()
    }
    async loadingUrl(){
        this.loading_web = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Cargando estaciones...',
            duration: 20000
        });
        await this.loading_web.present();
    }
    
    /**
     * If you need the audio instance in your component for some reason, use this.
     */
    public getAudio(): HTMLAudioElement {
        return this.audio;
    }

    /**
     * This is typically a URL to an MP3 file
     * @param src 
     */
    public setAudio(src: string): void {
        console.log("show the audio from this framework");
        setTimeout(() => {
            
            this.audio.src = src;
            this.playAudio();  
            
        }, 100);
        
    }

    /**
     * The method to play audio
     */
    public playAudio(): void {
        if(this.loading_web) { 
            this.loading_web.dismiss();
        }
        this.audio.play();
    }

    /**
     * The method to pause audio
     */
    public pauseAudio(): void {
        this.audio.pause();
    }

    /**
     * Method to seek to a position on the audio track (in milliseconds, I think), 
     * @param position 
     */
    public seekAudio(position: number): void {
        this.audio.currentTime = position;
    }

    /**
     * This formats the audio's elapsed time into a human readable format, could be refactored into a Pipe.
     * It takes the audio track's "currentTime" property as an argument. It is called from the, calulateTime method.
     * @param ct 
     */
    private setTimeElapsed(ct: number): void {
        let seconds     = Math.floor(ct % 60),
            displaySecs = (seconds < 10) ? '0' + seconds : seconds,
            minutes     = Math.floor((ct / 60) % 60),
            displayMins = (minutes < 10) ? '0' + minutes : minutes;

        this.timeElapsed.next(displayMins + ':' + displaySecs);
    }

    /**
     * This method takes the track's "duration" and "currentTime" properties to calculate the remaing time the track has
     * left to play. It is called from the calculateTime method.
     * @param d 
     * @param t 
     */
    private setTimeRemaining(d: number, t: number): void {
        let remaining;
        let timeLeft = d - t,
            seconds = Math.floor(timeLeft % 60) || 0,
            remainingSeconds = seconds < 10 ? '0' + seconds : seconds,
            minutes = Math.floor((timeLeft / 60) % 60) || 0,
            remainingMinutes = minutes < 10 ? '0' + minutes : minutes,
            hours = Math.floor(((timeLeft / 60) / 60) % 60) || 0;

            // remaining = (hours === 0)
        if (hours === 0) {
            remaining = '-' + remainingMinutes + ':' + remainingSeconds;
        } else {
            remaining = '-' + hours + ':' + remainingMinutes + ':' + remainingSeconds;
        }
        this.timeRemaining.next(remaining);
    }

    /**
     * This method takes the track's "duration" and "currentTime" properties to calculate the percent of time elapsed.
     * This is valuable for setting the position of a range input. It is called from the calculateTime method.
     * @param d 
     * @param ct 
     */
    private setPercentElapsed(d: number, ct: number): void {
        this.percentElapsed.next(( Math.floor(( 100 / d ) * ct )) || 0 );
    }

    /**
     * This method takes the track's "duration" and "currentTime" properties to calculate the percent of time elapsed.
     * This is valuable for setting the position of a range input. It is called from the calculatePercentLoaded method.
     * @param p 
     */
    private setPercentLoaded(p): void {
        this.percentLoaded.next(parseInt(p, 10) || 0 );
    }

    /**
     * This method returns an Observable whose value is the track's percent loaded
     */
    public getPercentLoaded(): Observable<number> {
        return this.percentLoaded.asObservable();
    }

    /**
     * This method returns an Observable whose value is the track's percent elapsed
     */
    public getPercentElapsed(): Observable<number> {
        return this.percentElapsed.asObservable();
    }

    /**
     * This method returns an Observable whose value is the track's percent loaded
     */
    public getTimeElapsed(): Observable<string> {
        return this.timeElapsed.asObservable();
    }

    /**
     * This method returns an Observable whose value is the track's time remaining
     */
    public getTimeRemaining(): Observable<string> {
        return this.timeRemaining.asObservable();
    }

    /**
     * This method returns an Observable whose value is the current status of the player.
     * This is useful inside your component to key off certain values, for example:
     *   - Show pause button when player status is 'playing'
     *   - Show play button when player status is 'paused'
     *   - Show loading indicator when player status is 'loading'
     * 
     * See the setPlayer method for values.
     */
    public getPlayerStatus(): Observable<string> {
        return this.playerStatus.asObservable();
    }

    /**
     * Convenience method to toggle the audio between playing and paused
     */
    public toggleAudio(): void {
        (this.audio.paused) ? this.audio.play() : this.audio.pause();
    }

    createReproductor(estacion) {
        this.musicControls.destroy();
        this.musicControls.create({
                track: estacion.title, // optional, default : ''
                artist: 'Estas escuchando', // optional, default : ''
                cover: 'https://ultranoticias.com.mx/radio2022/images/fondo.jpg', // optional, default : nothing
                // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
                //           or a remote url ('http://...', 'https://...', 'ftp://...')
                isPlaying: true, // optional, default : true
                dismissable: true, // optional, default : false

                // hide previous/next/close buttons:
                hasPrev: false, // show previous button, optional, default: true
                hasNext: false, // show next button, optional, default: true
                hasClose: true, // show close button, optional, default: false

                // Android only, optional
                // text displayed in the status bar when the notification (and the ticker) are updated, optional
                ticker: 'Siente el efecto ultra"',
                // All icons default to their built-in android equivalents
                playIcon: 'media_play',
                pauseIcon: 'media_pause',
                prevIcon: 'media_prev',
                nextIcon: 'media_next',
                closeIcon: 'media_close',
                notificationIcon: 'notification',
        }).then(() => {
                console.log('Notifiacion creada');
        }).catch((e) => {
                console.log('Error al crear reproductor', e);
        });
        this.musicControls.subscribe().subscribe((action) => {
            console.log('eeeeeeee', action);

            const message = JSON.parse(action).message;
            console.log('evento detectado', message);
            switch (message) {
                case 'music-controls-pause':
                    this.musicControls.updateIsPlaying(false);
                    this.Pause();
                break;
                case 'music-controls-play':
                    this.musicControls.updateIsPlaying(true);
                    this.audio.play();
                    break;
                case 'music-controls-destroy':
                    this.Pause();
                    this.musicControls.destroy();
                    (navigator as any).app.exitApp();
                break;
                default:
                break;
            }
        });
        this.musicControls.listen(); // activates the observable above
        
        this.musicControls.updateDismissable(true);
        
    }
    
}

import { Component , NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

declare var ApiAIPromises: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


/**
 * Generated class for the ChatbotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */




export class HomePage {
  question:any
   constructor(private speechRecognition: SpeechRecognition,private tts: TextToSpeech,public navCtrl: NavController, public navParams: NavParams , public platform: Platform, public ngZone: NgZone) {
     platform.ready().then(() => {
       ApiAIPromises.init({
         clientAccessToken: "your access token "
       }).then(result => console.log(result));
     });
     
// Check feature available
this.speechRecognition.isRecognitionAvailable()
.then((available: boolean) => console.log(available))


// Get the list of supported languages
this.speechRecognition.getSupportedLanguages()
.then(
  (languages: Array<string>) => console.log(languages),
  (error) => console.log(error)
)

// Check permission
this.speechRecognition.hasPermission()
.then((hasPermission: boolean) => console.log("idliiiiii",hasPermission))

// Request permissions
this.speechRecognition.requestPermission()
.then(
  () => console.log('Granted'),
  () => console.log('Denied')
)
    
   }
 
   ionViewDidLeave() {
     this.navCtrl.popToRoot();
   }
   matcheesa=[]
 chat=[]
   questions=[]
   answer:any=[];
    ask(question) {
     this.chat.push({'question':question})
     
   
     
     ApiAIPromises.requestText({
       query: question
     }).then(({result: {fulfillment: {speech}}}) => {
        this.ngZone.run(()=> {
          this.chat.push({'answer':speech});
          this.tts.speak(`${speech}`)
        });
 
     })
     this.question="";
   }
   async startListen(){
     
    await  this.speechRecognition.startListening()
    .subscribe(
      (matches: Array<string>) =>  this.ask(matches[0]),
    )
  
   }
   stopListen(){
    this.speechRecognition.stopListening()
   }
 
 

 
 
 
 
 }

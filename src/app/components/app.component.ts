import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

import { Component } from '@angular/core';
import { appConfig } from '../config/globel.conf';
import { Title } from '@angular/platform-browser';

const settings = {timestampsInSnapshots: true};
const config = {
  apiKey: "AIzaSyCVyF17o8qRb1r4U6Gvgi__oXMFFW687hY",
  authDomain: "ng6-filmmanager.firebaseapp.com",
  databaseURL: "https://ng6-filmmanager.firebaseio.com",
  projectId: "ng6-filmmanager",
  storageBucket: "ng6-filmmanager.appspot.com",
  messagingSenderId: "854163112408"
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private titleService: Title){}
  appName:string = appConfig.app.name;
  
  ngOnInit(): void {
    this.titleService.setTitle(this.appName);
    firebase.initializeApp(config);
    firebase.firestore().settings(settings);
  }
}

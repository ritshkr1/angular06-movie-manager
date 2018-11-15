import { Component } from '@angular/core';
import { appConfig } from '../config/globel.conf';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private titleService: Title){}
  
  ngOnInit(): void {    
    let title = appConfig.app.name;
    this.titleService.setTitle(title);
  }
}

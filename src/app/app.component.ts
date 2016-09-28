import { Component } from '@angular/core';
import { ConfigService } from './services/config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private _conf: ConfigService) {
  	this.title = this._conf.settings;
  }
}

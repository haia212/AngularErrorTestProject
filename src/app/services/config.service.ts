import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class ConfigService {

  public settings:string;

  constructor(private http:Http) { }

  load() : Promise<string> {
    let url = '/api/settings/static_lists/';

    var observable= this.http.get(url)
            .map(res => res.json());

    observable.subscribe(config => this.settings = config.result);
    return observable.toPromise();
  }

}
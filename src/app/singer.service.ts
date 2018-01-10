import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class SingerService {
updatedStatus = false;
titleUpdate='';

constructor() { }
  

  public getUpdatedStatus() {
    return this.updatedStatus;
  }
  public getUpdateTitle() {
    return this.titleUpdate;
  }

  public sendUpdatedStatus (titleUp) {
    this.updatedStatus = true;
    this.titleUpdate = titleUp;
  }

}

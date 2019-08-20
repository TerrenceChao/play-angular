import { Injectable } from '@angular/core';
import { from } from 'rxjs';

import * as socketIo from 'socket.io-client';

import { EVENTS } from '../../app-settings/message/events';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public currentRegion;
  wsConfigMap = new Map();

  constructor(
    // private dispatchService: DispatchService
  ) {
    this.currentRegion = `tw-1`; // dispatchService.getCurrentRegion();
    this.wsConfigMap.set(this.currentRegion, socketIo(`http://localhost:3004`));
    // this.wsConfigMap.set(`jp-1`, socketIo(`http://www.xxx.com`));
  }

  listenEvents() {
    this.wsConfigMap
      .get(this.currentRegion)
      .on(EVENTS.RESPONSE.CHANNEL_LIST, packet => console.log(JSON.stringify(packet, null, 2)));
  }

  emitEvent(event, customData) {
    this.wsConfigMap
      .get(this.currentRegion)
      .emit(event, customData);
  }
}

import { Injectable } from '@angular/core';
import { Observable, Subject, fromEvent } from 'rxjs';
import { first } from 'rxjs/operators';
import * as _ from 'lodash';
import * as socketIo from 'socket.io-client';
import { EnvService } from '../../env.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public currentRegion;
  currentRegionMsgHost;
  uid;
  // region;
  msgToken;
  clientuseragent;
  wsConfigMap = new Map();

  constructor(
    // private dispatchService: DispatchService
    private env: EnvService
  ) {
    console.log(JSON.stringify(this.env, null, 2));
    this.connect();
  }

  connect() {
    this.currentRegion = `tw-1`; // dispatchService.getCurrentRegion();
    this.currentRegionMsgHost = this.env.getMessageHost();
    this.wsConfigMap.set(this.currentRegion, socketIo(this.currentRegionMsgHost));
    // this.wsConfigMap.set(`jp-1`, socketIo(`http://www.xxx.com`));
  }

  // listenEvents(): Observable<any> {
  //   // this.wsConfigMap
  //   //   .get(this.currentRegion)
  //   //   .on(EVENTS.RESPONSE.CHANNEL_LIST, packet => console.log(JSON.stringify(packet, null, 2)));

  //   return fromEvent(this.wsConfigMap.get(this.currentRegion), EVENTS.RESPONSE.CHANNEL_LIST);
  //   // this.event = new Observable(observer => this.wsConfigMap
  //   //     .get(this.currentRegion)
  //   //     .on(EVENTS.RESPONSE.CHANNEL_LIST, packet => observer.next(packet)));

  //   // this.event.subscribe(packet => {
  //   //   console.log(JSON.stringify(packet, null, 2));
  //   // });
  // }
  private saveIdentity(data) {
    this.uid = data.uid;
    this.msgToken = data.msgToken;
    this.clientuseragent = data.clientuseragent;
  }

  private getIdentity(): object {
    return {
      uid: this.uid,
      msgToken: this.msgToken,
      clientuseragent: this.clientuseragent
    };
  }

  register(event, data) {
    this.saveIdentity(data);

    this.wsConfigMap
      .get(this.currentRegion)
      .emit(event, data);
  }

  listenEvent(event): Observable<any> {
    return new Observable(observer => this.wsConfigMap
      .get(this.currentRegion)
      .on(event, packet => observer.next(packet)));
  }

  listenEventOnce(event): Observable<any> {
    console.warn(`listen -> curent region msg host: ${this.currentRegionMsgHost}`);
    return new Observable(observer => this.wsConfigMap
      .get(this.currentRegion)
      .on(event, packet => observer.next(packet)))
      .pipe(first());
  }

  emitEvent(event, data) {
    console.warn(`emit -> curent region msg host: ${this.currentRegionMsgHost}`);
    this.wsConfigMap
      .get(this.currentRegion)
      .emit(event, _.assignIn(data, this.getIdentity()));
  }
}

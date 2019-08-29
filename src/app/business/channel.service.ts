import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import * as _ from 'lodash';

import { ConversationService } from './conversation.service';
import { WebSocketService } from './web-socket/web-socket.service';
import { EVENTS } from '../app-settings/message/events';
import { Channel } from './Channel';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  channelMap: Map<string, Channel>;
  invitationMap: Map<string, any>; // useless for now
  sender: User;
  attempt: number;

  constructor(
    private convService: ConversationService,
    private wsService: WebSocketService
  ) {
    this.channelMap = new Map();
    this.attempt = 0;
    this.listenEvents();
   }

  register(customData) {
    // get channel list
    this.wsService.listenEventOnce(EVENTS.RESPONSE.CHANNEL_LIST)
      .subscribe(packet => {
        const channelList = packet.data;
        channelList.forEach(chData => {
          const channelData = _.pick(chData, Channel.getFields());
          console.log(JSON.stringify(channelData, null, 2));
          this.initChannel(channelData, chData.conversations);
        });

        // console.log(JSON.stringify(this.channelMap.get('5cd06b8462f49f4bdfc007ca'), null, 2));
        // console.log(JSON.stringify(this.convService.getList('5cd06b8462f49f4bdfc007ca'), null, 2));
      });

    // get invitation list
    this.wsService.listenEventOnce(EVENTS.RESPONSE.INVITATION_LIST)
      .subscribe(packet => {
        const invitationList = packet.data;
        invitationList.forEach(inviteData => {
          console.log(JSON.stringify(inviteData, null, 2));
        });
      });

    // get user's info (uid, ... etc)
    this.wsService.listenEventOnce(EVENTS.RESPONSE.PERSONAL_INFO)
      .subscribe(packet => {
        this.sender = new User(packet.data);
        // console.log(JSON.stringify(packet, null, 2));
        console.log(JSON.stringify(this.sender.uid, null, 2));
        console.log('attempt: ', ++this.attempt);
      });

    this.wsService.register(EVENTS.REQUEST.LOGIN, customData);
  }

  listenEvents() {
    // someone join channel (maybe sender or others)
    this.wsService.listenEvent(EVENTS.RESPONSE.CHANNEL_JOINED)
      .subscribe(packet => {
        const refreshedChInfo = packet.data.channelInfo;
        const someone = packet.data.uid;
        const datetime = packet.data.datetime;
        // console.log(JSON.stringify(refreshedChInfo, null, 2));
        console.log(`user: ${someone} is joined at ${datetime}`);
        this.channelMap.set(refreshedChInfo.chid, refreshedChInfo);
      });

    // someone leavels channel (maybe sender or others)
    this.wsService.listenEvent(EVENTS.RESPONSE.CHANNEL_LEFT)
      .subscribe(packet => {
        const refreshedChInfo = packet.data.channelInfo;
        const someone = packet.data.uid;
        const datetime = packet.data.datetime;

        if (refreshedChInfo.members.find(member => member === someone) === undefined) {
          console.log(`user: ${someone} is leaved at ${datetime}`);
          if (someone === this.sender.uid) {
            this.channelMap.delete(refreshedChInfo.chid);
          }
        } else {
          console.error(`user: ${someone} is not leaving channel`);
        }
      });

    // send message
    this.wsService.listenEvent(EVENTS.RESPONSE.CONVERSATION_FROM_CHANNEL)
      .subscribe(packet => {
        if (packet.data === undefined || packet.data.chid === undefined) {
          console.log(
            `what's wrong?\n=======`,
            JSON.stringify(packet, null, 2),
            `========\n`
          );
          return;
        }
        const convData = packet.data;
        console.log(`received event: ${EVENTS.RESPONSE.CONVERSATION_FROM_CHANNEL}\n`, JSON.stringify(convData, null, 2));
        this.convService.appendConv(convData.chid, convData);
      });

    // exception alert
    this.wsService.listenEvent(EVENTS.RESPONSE.EXCEPTION_ALERT)
      .subscribe(packet => {
        console.error(`what's wrong?\n=======`, JSON.stringify(packet, null, 2), `========\n`
        );
      });
  }

  initChannel(channelData, convList: Array<any> = []): Channel {
    const channel = new Channel(channelData);
    this.channelMap.set(channel.chid, channel);
    this.convService.createList(channel.chid, convList);
    // channel.initConversationList(this.convService.createList(channel.chid, convList));

    return channel;
  }

  createChannel(channelName: string): Observable<any> {
    const observable = new Observable(observer => this.wsService.listenEventOnce(EVENTS.RESPONSE.CHANNEL_CREATED)
      .subscribe(packet => {
        const channel = new Channel(_.pick(packet.data, Channel.getFields()));
        console.log(JSON.stringify(channel, null, 2));
        this.channelMap.set(channel.chid, channel);
        this.convService.createList(channel.chid);

        observer.next(channel);
      }));

    this.wsService.emitEvent(EVENTS.REQUEST.CREATE_CHANNEL, {
      channelName,
      uid: this.sender.uid
    });

    return observable.pipe(first());
  }

  getChannel(chid: string): Channel {
    return this.channelMap.get(chid);
  }

  getChannelList(): Array<Channel> {
    const list = [];
    for (const [chid, channel] of this.channelMap) {
      list.push(channel);
    }

    return list;
  }

  joinChannel(data: any) {
    this.wsService.emitEvent(EVENTS.REQUEST.JOIN_CHANNEL, data);
  }

  leaveChannel(data: any) {
    this.wsService.emitEvent(EVENTS.REQUEST.LEAVE_CHANNEL, data);
  }

  getChannelConvList(chid: string): Array<any> {
    return this.convService.getList(chid);
  }

  sendMessage(data: any) {
    this.wsService.emitEvent(EVENTS.REQUEST.SEND_CONVERSATION, data);
  }
}

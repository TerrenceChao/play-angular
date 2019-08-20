import { Injectable } from '@angular/core';

import { ConversationService } from './conversation.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  chList = new Map();

  constructor(
    private convService: ConversationService
  ) { }

  initChannelList() {
    // already has conversation list
  }

  createChannel(channel) {
    channel.convList = this.convService.createList(channel.chid);
    this.chList.set(channel.chid, channel);
    return this;
  }

  getChannel(chid) {
    return this.chList.get(chid);
  }

  getChannelList() {
    const list = [];
    for (const [chid, channel] of this.chList) {
      list.push(channel);
    }

    return list;
  }

  joinChannel(chid, uid) {
    (this.chList.get(chid)).addMember(uid);
    return this;
  }

  leaveChannel(chid, uid) {
    const channel = this.chList.get(chid);
    channel.removeMember(uid);
    if (channel.isNoMember()) {
      this.chList.delete(chid);
    }

    return this;
  }
}

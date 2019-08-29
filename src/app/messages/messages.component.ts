import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ChannelService } from '../business/channel.service';
import { Channel } from '../business/Channel';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  checkoutForm;
  channelList: Array<Channel>;

  constructor(
    private chService: ChannelService,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      channelName: ''
    });
  }

  ngOnInit() {
    this.channelList = this.chService.getChannelList();
  }

  createChannel(customData) {
    this.chService.createChannel(customData.channelName)
      .subscribe(channel => this.channelList = this.chService.getChannelList());
  }

  // getChannelConvList(chid: string): Array<any> {
  //   return this.chService.getChannelConvList(chid);
  // }
}

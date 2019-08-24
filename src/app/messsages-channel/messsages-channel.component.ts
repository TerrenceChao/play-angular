import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Channel } from '../business/Channel';
import { ChannelService } from '../business/channel.service';

@Component({
  selector: 'app-messsages-channel',
  templateUrl: './messsages-channel.component.html',
  styleUrls: ['./messsages-channel.component.scss']
})
export class MesssagesChannelComponent implements OnInit {
  memberForm: FormGroup;
  messageForm: FormGroup;
  channel: Channel;
  conversationList: Array<any>;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private chService: ChannelService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(`params: \n ${JSON.stringify(params, null, 2)}\nparams.get chid is: ${params.get('chid')}`);
      this.channel = this.chService.getChannel(params.get('chid'));
      this.conversationList = this.chService.getChannelConvList(params.get('chid'));

      // prepare config params for join/leave channel process:
      this.memberForm = this.formBuilder.group({
        chid: this.channel.chid,
        targetUid: '',
        nickname: '',
      });

      // prepare config params for sending messages:
      this.messageForm = this.formBuilder.group({
        chid: this.channel.chid,
        ciid: this.channel.ciid,
        content: '',
        convType: '',
      });
    });
  }

  joinChannel(memberData) {
    console.warn(`Your request of making someone JOIN channel has been submitted`, JSON.stringify(memberData, null, 2));
    this.chService.joinChannel(memberData);
  }

  leaveChannel(memberData) {
    console.warn(`Your request of making someone LEAVE channel has been submitted`, JSON.stringify(memberData, null, 2));
    this.chService.leaveChannel(memberData);
  }

  sendMessage(messageData) {
    console.warn(`Your message has been submitted`, JSON.stringify(messageData, null, 2));
    this.chService.sendMessage(messageData);
  }
}

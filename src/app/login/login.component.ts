import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { EVENTS } from '../app-settings/message/events';
import { ChannelService } from '../business/channel.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  checkoutForm;
  constructor(
    private channelService: ChannelService,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      msgToken: '',
      sessionId: '',
      uid: '',
      nickname: '',
      clientuseragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
      inviType: 'received',
      chanLimit: 15,
      cnahSkip: 0,
      convLimit: 5,
      convSkip: 0,
      inviLimit: 5,
      inviSkip: 0,
    });
  }

  ngOnInit() {
  }

  onSubmit(customData) {
    console.warn(`Your registeration to message service has been submitted`, customData);
    this.channelService.register(customData);
  }
}

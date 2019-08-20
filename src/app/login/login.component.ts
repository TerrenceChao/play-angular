import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { EVENTS } from '../app-settings/message/events';
import { WebSocketService } from '../business/web-socket/web-socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  checkoutForm;
  constructor(
    private wsService: WebSocketService,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      msgToken: '',
      sessionId: '',
      uid: '',
      nickname: '',
      clientuseragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
      inviType: 'received',
      inviLimit: 15,
      inviSkip: 0,
      chanLimit: 15,
      cnahSkip: 0,
      convLimit: 15,
      convSkip: 0,
    });
    this.wsService.listenEvents();
  }

  ngOnInit() {
  }

  onSubmit(customData) {
    console.warn(`Your registeration to message service has been submitted`, customData);
    this.wsService.emitEvent(EVENTS.REQUEST.LOGIN, customData);
    // then ???
  }
}

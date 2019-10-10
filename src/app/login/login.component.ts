import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';
import * as _ from 'lodash';

import { EVENTS } from '../app-settings/message/events';
import { LoginService } from '../business/login.service';
import { ChannelService } from '../business/channel.service';

const md5: Md5 = new Md5();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hashedUserAgent: string;
  checkoutForm: FormGroup;
  personalInfo: Map<string, any>;
  msgInfo: Map<string, any>;

  constructor(
    private loginService: LoginService,
    private channelService: ChannelService,
    private formBuilder: FormBuilder
  ) {
    this.personalInfo = new Map()
      .set('user', this.getUserInfo)
      .set('msg', this.getMsgInfo)
      .set('notify', this.getNotifyInfo)
      .set('friends', this.getFriendList);
  }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      email: '',
      password: '',
      // 不好使，需要用戶允許, 若可行的話改用 DNS
      region: 'tw', // this.getRegion(),
      clientuseragent: this.getHashUserAgent(),

      // // for test
      // uid: '',
      // nickname: '',
    });
  }

  /**
   * 不好使，需要用戶允許, 若可行的話改用 DNS
   * 1. DNS
   * 2. geolocation
   * 3. ....
   */
  private getRegion(): Observable<any> {
    return new Observable(observer => {
      const { next, error } = observer;
      let watchId;

      if (window.navigator.geolocation) {
        watchId = window.navigator.geolocation.watchPosition(next, error);
      } else {
        error(`Geolocation not available`);
      }

      return { unsubscribe() { window.navigator.geolocation.clearWatch(watchId); }};
    });
  }

  private getHashUserAgent(): string {
    if (this.hashedUserAgent === undefined) {
      this.hashedUserAgent = md5.start().appendStr(window.navigator.userAgent).end().toString();
    }
    console.log(`hashedUserAgent: `, this.hashedUserAgent);
    return this.hashedUserAgent;
  }

  onSubmit(customData) {
    console.warn(`Your registeration to message service has been submitted`, customData);
    console.log(`user agent: `, window.navigator.userAgent);
    console.log(`this.hashedUserAgent`, this.hashedUserAgent);
    // console.log(`appVersion: `, window.navigator.appVersion);
    // // console.log(`platform: `, window.navigator.platform);
    // // console.log(`geolocation: `, window.navigator.geolocation.getCurrentPosition);
    // console.log(`navigator: `, window.navigator);
    // console.log(`customData: `, JSON.stringify(customData, null, 2));
    this.loginService.register(customData)
      .subscribe(resposeBody => {
        // console.log(`resposeBody: `, JSON.stringify(resposeBody, null, 2));
        for (const fetcher of this.personalInfo.values()) {
          fetcher(this, resposeBody);
        }
      });
  }

  private getUserInfo(self, responseBody) {
    return responseBody;
  }

  private getMsgInfo(self, responseBody) {
    const userInfo = responseBody.data.userInfo;
    const msgInfo = responseBody.data.msgInfo;
    const msgAuth = self.loginService.getMsgAuth(msgInfo);
    const fullname = `${userInfo.givenName} ${userInfo.familyName}`;

    console.log(`\nget msg info\n`, `${JSON.stringify(msgInfo)}`, `\n`);

    const msgData = {
      msgToken: msgAuth.token,
      msgRefreshToken: msgAuth.refreshToken,
      sessionId: userInfo.auth.token,
      uid: userInfo.uid,
      clientuseragent: userInfo.clientuseragent,
      fullname,
      nickname: fullname,
      profileLink: userInfo.profileLink,
      profilePic: userInfo.profilePic,
      inviType: 'received',
      chanLimit: 15,
      cnahSkip: 0,
      convLimit: 5,
      convSkip: 0,
      inviLimit: 5,
      inviSkip: 0,
    };

    self.channelService.register(msgData);
  }

  private getNotifyInfo(self, responseBody) {
    return responseBody;
  }

  private getFriendList(self, responseBody) {
    return responseBody;
  }
}

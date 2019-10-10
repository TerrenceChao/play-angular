import { Injectable } from '@angular/core';

const MESSAGE_HOST_LIST = [
  // 'http://localhost:8082',
  'http://localhost:3004',
  'http://localhost:3005',
  'http://localhost:3006',
  'http://localhost:3007',
];

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  // folk service
  public FOLK_HOST = 'http://localhost:3000/folk-service/api/v1';
  public FOLK_URL_REQ_LOGIN = '/user/login';

  // message service
  public MESSAGE_HOST = 'http://localhost:3004';
  private MSG_AUTH_ATTRIBUTES = `uid,clientuseragent,msgToken,refreshMsgToken`;
  private MSG_TOKEN: string;
  private MSG_REFRESH_TOKEN: string;

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  public DEBUG_MODE = true;

  constructor() {
    this.parseMessageConfig();
  }

  private parseMessageConfig() {
    const authAttributes: string[] = this.MSG_AUTH_ATTRIBUTES.split(',');
    this.MSG_REFRESH_TOKEN = authAttributes.pop();
    const accessProperties: string[] = authAttributes.reverse();
    this.MSG_TOKEN = accessProperties[0];
  }

  public getMessageHost() {
    const host = MESSAGE_HOST_LIST[Math.floor(Math.random() * MESSAGE_HOST_LIST.length)];
    console.log(`curent msg host: ${host}`);

    return host;
  }

  public getMessageConstant() {
    return {
      TOKEN: this.MSG_TOKEN,
      REFRESH_TOKEN: this.MSG_REFRESH_TOKEN
    };
  }
}

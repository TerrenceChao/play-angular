import { Injectable } from '@angular/core';

const MESSAGE_HOST_LIST = [
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

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  public DEBUG_MODE = true;

  constructor() { }

  public getMessageHost() {
    const host = MESSAGE_HOST_LIST[Math.floor(Math.random() * MESSAGE_HOST_LIST.length)];
    console.log(`curent msg host: ${host}`);

    return host;
  }
}

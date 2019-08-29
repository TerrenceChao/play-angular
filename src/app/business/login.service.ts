import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userInfo;
  constructor(
    private http: HttpClient,
    private env: EnvService
  ) { }

  private getHeaders(customData): object {
    return { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'clientuseragent': customData.clientuseragent
    })}
  }

  register(customData) {
    console.log(`\n=============`, `customData: ${JSON.stringify(customData, null, 2)}`, `\n=============`)
    return this.http.post<any>(
      `${this.env.FOLK_HOST}${this.env.FOLK_URL_REQ_LOGIN}`,
      customData,
      this.getHeaders(customData)
    );
  }
}

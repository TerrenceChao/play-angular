import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  convListMap: Map<string, Array<any>>;

  constructor() {
    this.convListMap = new Map();
   }

  createList(chid: string, list: Array<any> = []): Array<any> {
    this.convListMap.set(chid, list);
    return this.convListMap.get(chid);
  }

  getList(chid: string): Array<any> {
    return this.convListMap.get(chid);
  }

  appendConv(chid: string, conversation: any): Array<any> {
    this.convListMap.get(chid).push(conversation);
    return this.convListMap.get(chid);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  convList = new Map();
  constructor() { }

  createList(chid) {
    this.convList.set(chid, []);
  }

  receiveMessage(msg) {

  }

  sendMessage(msg) {
    
  }
}

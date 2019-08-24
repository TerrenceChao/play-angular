export class Channel {
  chid: string;
  ciid: string;
  name: string;
  creator: string;
  invitees: Array<string>;
  members: Array<string>;
  latestSpoke: Date;
  lastGlimpse: Date;

  // convList: Array<any>;

  constructor({
    chid,
    ciid,
    name,
    creator,
    invitees,
    members,
    latestSpoke,
    lastGlimpse
  }) {
    this.chid = chid;
    this.ciid = ciid;
    this.name = name;
    this.creator = creator;
    this.invitees = invitees || [];
    this.members = members || [];
    this.latestSpoke = latestSpoke || new Date();
    this.lastGlimpse = lastGlimpse || new Date();
    // this.convList = [];
  }

  static getFields(): Array<string> {
    return [
      'chid',
      'ciid',
      'name',
      'creator',
      'invitees',
      'members',
      'latestSpoke',
      'lastGlimpse'
    ];
  }

  // initConversationList(convList) {
  //   this.convList = convList;
  //   return this;
  // }

  // appendConv(conversation) {
  //   this.convList.push(conversation);
  // }

  // getConvList() {
  //   return this.convList;
  // }

  addMember(uid) {
    this.members.push(uid);
    return this;
  }

  removeMember(uid) {
    this.members = this.members.filter(member => member !== uid);
    return this;
  }

  withoutMember() {
    return this.members.length === 0;
  }

  // remove older conversations...
}

export class User {
  uid: string;
  fullname: string;
  nickname: string;
  profileLiink: string;
  profilePic: string;

  constructor(data) {
    this.uid = data.uid || '';
    this.fullname = data.fullname || '';
    this.nickname = data.nickname || '';
    this.profileLiink = data.profileLiink || '';
    this.profilePic = data.profilePic || '';
  }
}

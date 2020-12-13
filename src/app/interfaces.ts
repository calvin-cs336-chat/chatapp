import * as firebase from 'firebase';

export interface DBUser {
  uid: string;
  uname: string;
  avatar?: string;
  color?: string;
}

export interface DBChatMsg {
  user: string;
  msg: string;
  dateSent: firebase.default.firestore.Timestamp;
  likes: string[];  // array of users who liked the msg
}

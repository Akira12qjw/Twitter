```ts
interface User {
  _id: ObjectId;
  name: string;
  email: string;
  date_of_birth: Date;
  password: string;
  created_at: Date;
  updated_at: Date;
  email_verify_token: string; //jwt hoặc '' nếu đã xác thực
  forgot_password_token: string; //jwt hoặc '' nếu đã xác thực
  verify: UserVerifiStatus;

  bio: string; //optional
  location: string; //optional
  website: string; //optional
  username: string; //optional
  avatar: string; //optional
  cover_photo: string; //optional
}

enum UserVerifyStatus {
  Unverified, // chưa xác thực email, mặc định 0
  Verfied, //đã xác thực email
  Banned, //bị khóa
}

interface RefreshToken {
  _id: ObjectId;
  token: string;
  created_at: Date;
  user_id: ObjectId;
}

interface Follower {
  _id: ObjectId;
  user_id: ObjectId;
  followed_user_id: ObjectId;
  created_at: Date;
}

interface Tweet {
  _id: ObjectId;
  user_id: ObjectId;
  type: TweetType;
  audience: TweetAudience;
  content: string;
  parent_id: null | ObjectId; //chỉ null khi tweet gốc
  hashtags: ObjectId[];
  mentions: ObjectId[];
  medias: Media[];
  guest_view: number;
  user_view: number;
  created_at: Date;
  updated_at: Date;
}

interface Media {
  url: string;
  type: MediaType; // video, image
}

enum MediaType {
  Image,
  Video,
}

enum TweetAudience {
  Everyone, // 0
  TwitterCircle, // 1
}

enum TweetType {
  Tweet,
  Retweet,
  Comment,
  QuoteTweet,
}
```

```ts
interface Bookmark {
  _id: ObjectId;
  user_id: ObjectId;
  tweet_id: ObjectId;
  created_at: Date;
}

interface Like {
  _id: ObjectId;
  user_id: ObjectId;
  tweet_id: ObjectId;
  created_at: Date;
}

interface Hashtag {
  _id: ObjectId;
  name: string;
  created_at: Date;
}
```

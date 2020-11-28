import { PostUser } from "./post-user";
import { User } from "./user";

export interface PostReults {
  commentsCount: number,
  createdOn: string,
  id: number,
  image: string,
  isLikedByUser: boolean,
  isShare: boolean,
  likesCount: number,
  originalPost: string,
  text: string,
  url: string,
  urlMeta: string,
  user: PostUser
}

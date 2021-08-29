import { User } from './User';
import { Post } from './Post';

type PostReaction = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null;
  EmojiCode: string;
  UserID: number;
  PostID: number;
  User: User;
  Post: Post;
};

export type { PostReaction };

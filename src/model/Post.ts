import { User } from './User';
import { Comment } from './Comment';
import { PostReaction } from './PostReaction';

type Post = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null;
  Content: string;
  UserID: number;
  User: User;
  OpenComment: boolean;
  AnchorEl: HTMLDivElement | HTMLButtonElement | null;
  Comments: Comment[];
  PostReactions: PostReaction[];
  Emojis: string[];
};

export type { Post };

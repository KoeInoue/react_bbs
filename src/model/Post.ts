import { User } from './User';

type Post = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null;
  Content: string;
  UserID: number;
  User: User;
  OpenComment: boolean;
  // Comments: Comment[];
  // PostReactions: PostReaction[];
};

export type { Post };

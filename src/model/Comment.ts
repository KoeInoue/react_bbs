import { User } from './User';

type Comment = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null;
  Content: string;
  UserID: number;
  PostID: number;
  User: User;
};

export type { Comment };

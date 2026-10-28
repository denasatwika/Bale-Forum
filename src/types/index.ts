export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface RegisterPayload  {
  name: string;
  email: string;
  password: string;
};

export interface LoginPayload {
  email: string;
  password: string;
}

export type Owner = Pick<User, 'id' | 'name' | 'avatar'>;

export interface Thread {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  totalComments: number;
  upVotesBy: string[];
  downVotesBy: string[];
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  owner: Owner;
  upVotesBy: string[];
  downVotesBy: string[];
}

export interface ThreadDetail extends Omit<Thread, 'ownerId' | 'totalComments'> {
  owner: Owner;
  comments: Comment[];
}

export interface NewThreadPayload {
     title: string;
     body: string;
     category?: string
};

export interface Leaderboard {
  user: User;
  score: number;
}

export type VoteType = 1 | -1 | 0;
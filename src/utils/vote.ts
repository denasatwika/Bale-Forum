import type { VoteType } from '../types';

type Votable = { upVotesBy: string[]; downVotesBy: string[] };
export type VotePath = 'up-vote' | 'down-vote' | 'neutral-vote';

export function getUserVote(item: Votable, userId: string): VoteType {
  if (item.upVotesBy.includes(userId)) return 1;
  if (item.downVotesBy.includes(userId)) return -1;
  return 0;
}

export function applyVote<T extends Votable>(item: T, userId: string, voteType: VoteType): T {
  const upVotesBy = item.upVotesBy.filter((id) => id !== userId);
  const downVotesBy = item.downVotesBy.filter((id) => id !== userId);

  return {
    ...item,
    upVotesBy: voteType === 1 ? [...upVotesBy, userId] : upVotesBy,
    downVotesBy: voteType === -1 ? [...downVotesBy, userId] : downVotesBy,
  };
}

export function toVotePath(voteType: VoteType): VotePath {
  if (voteType === 1) return 'up-vote';
  if (voteType === -1) return 'down-vote';
  return 'neutral-vote';
}
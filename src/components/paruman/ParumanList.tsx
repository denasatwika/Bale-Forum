import type { VoteType } from '../../types';
import ParumanItem, { type ParumanItemData } from './ParumanItem';

type ParumanListProps = {
  threads: ParumanItemData[];
  authUserId?: string;
  onVote: (threadId: string, voteType: VoteType) => void;
};

function ParumanList({ threads, authUserId, onVote }: ParumanListProps) {
  if (threads.length === 0) {
    return <p className="empty-state">Belum ada paruman di banjar ini.</p>;
  }

  return (
    <div className="paruman-list">
      {threads.map((thread) => (
        <ParumanItem key={thread.id} thread={thread} authUserId={authUserId} onVote={onVote} />
      ))}
    </div>
  );
}

export default ParumanList;
import type { VoteType } from '../../types';
import ParumanItem, { type ParumanItemData } from './ParumanItem';

type ParumanListProps = {
  threads: ParumanItemData[];
  authUserId?: string;
  onVote: (threadId: string, voteType: VoteType) => void;
};

function ParumanList({ threads, authUserId, onVote }: ParumanListProps) {
  if (threads.length === 0) {
    return (
      <div className="alert alert-light border text-center text-body-secondary py-5">
        Belum ada paruman dengan topik ini.
      </div>
    );
  }

  return (
    <div className="d-grid gap-3">
      {threads.map((thread) => (
        <ParumanItem key={thread.id} thread={thread} authUserId={authUserId} onVote={onVote} />
      ))}
    </div>
  );
}

export default ParumanList;

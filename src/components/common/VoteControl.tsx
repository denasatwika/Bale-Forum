import type { VoteType } from '../../types';

type VoteControlProps = {
  upVotesBy: string[];
  downVotesBy: string[];
  authUserId?: string;
  onVote: (voteType: VoteType) => void;
};

function VoteControl({ upVotesBy, downVotesBy, authUserId, onVote }: VoteControlProps) {
  const isUpVoted = authUserId ? upVotesBy.includes(authUserId) : false;
  const isDownVoted = authUserId ? downVotesBy.includes(authUserId) : false;

  return (
    <div className="vote-control">
      <button
        type="button"
        className={`vote-button ${isUpVoted ? 'vote-button--up-active' : ''}`}
        aria-label="Setuju"
        aria-pressed={isUpVoted}
        onClick={() => onVote(isUpVoted ? 0 : 1)}
      >
        ▲
        <span>{upVotesBy.length}</span>
      </button>
      <button
        type="button"
        className={`vote-button ${isDownVoted ? 'vote-button--down-active' : ''}`}
        aria-label="Tidak setuju"
        aria-pressed={isDownVoted}
        onClick={() => onVote(isDownVoted ? 0 : -1)}
      >
        ▼
        <span>{downVotesBy.length}</span>
      </button>
    </div>
  );
}

export default VoteControl;
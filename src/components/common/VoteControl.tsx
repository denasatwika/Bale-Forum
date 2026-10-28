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
    <div className="btn-group btn-group-sm" role="group" aria-label="Voting">
      <button
        type="button"
        aria-label="Setuju"
        aria-pressed={isUpVoted}
        onClick={() => onVote(isUpVoted ? 0 : 1)}
        className={`btn ${isUpVoted ? 'btn-primary' : 'btn-outline-secondary'}`}
      >
        ▲
        {' '}
        {upVotesBy.length}
      </button>
      <button
        type="button"
        aria-label="Tidak setuju"
        aria-pressed={isDownVoted}
        onClick={() => onVote(isDownVoted ? 0 : -1)}
        className={`btn ${isDownVoted ? 'btn-dark' : 'btn-outline-secondary'}`}
      >
        ▼
        {' '}
        {downVotesBy.length}
      </button>
    </div>
  );
}

export default VoteControl;

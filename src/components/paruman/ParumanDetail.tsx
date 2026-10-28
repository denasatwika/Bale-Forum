import type { ThreadDetail, VoteType } from '../../types';
import { getCategoryLabel, postedAt, toPlainText } from '../../utils';
import Avatar from '../common/Avatar';
import VoteControl from '../common/VoteControl';

type ParumanDetailProps = {
  thread: ThreadDetail;
  authUserId?: string;
  onVote: (voteType: VoteType) => void;
};

function ParumanDetail({ thread, authUserId, onVote }: ParumanDetailProps) {
  return (
    <article className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4 p-md-5">
        <span className="badge rounded-pill text-bg-light border text-primary text-capitalize mb-3">
          {getCategoryLabel(thread.category)}
        </span>
        <h1 className="font-serif fw-bold display-6 mb-4">{thread.title}</h1>
        <div className="d-flex align-items-center gap-3 mb-4">
          <Avatar src={thread.owner.avatar} name={thread.owner.name} />
          <div>
            <div className="fw-semibold">{thread.owner.name}</div>
            <small className="text-body-secondary">{postedAt(thread.createdAt)}</small>
          </div>
        </div>
        <p className="text-pre-line lh-lg">{toPlainText(thread.body)}</p>
      </div>
      <div className="card-footer bg-transparent px-4 px-md-5 py-3">
        <VoteControl
          upVotesBy={thread.upVotesBy}
          downVotesBy={thread.downVotesBy}
          authUserId={authUserId}
          onVote={onVote}
        />
      </div>
    </article>
  );
}

export default ParumanDetail;

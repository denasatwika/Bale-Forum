import { Link } from 'react-router-dom';
import type { Owner, Thread, VoteType } from '../../types';
import { getCategoryLabel, getExcerpt, postedAt } from '../../utils';
import Avatar from '../common/Avatar';
import VoteControl from '../common/VoteControl';

export type ParumanItemData = Thread & { owner?: Owner };

type ParumanItemProps = {
  thread: ParumanItemData;
  authUserId?: string;
  onVote: (threadId: string, voteType: VoteType) => void;
};

function ParumanItem({ thread, authUserId, onVote }: ParumanItemProps) {
  return (
    <article className="card card-hover border-0 shadow-sm">
      <div className="card-body p-4 position-relative">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge rounded-pill text-bg-light border text-primary text-capitalize">
            {getCategoryLabel(thread.category)}
          </span>
          <small className="text-body-secondary">{postedAt(thread.createdAt)}</small>
        </div>
        <h3 className="card-title font-serif fw-bold fs-3 mb-2">
          <Link to={`/paruman/${thread.id}`} className="stretched-link text-reset text-decoration-none">
            {thread.title}
          </Link>
        </h3>
        <p className="card-text text-body-secondary line-clamp-2 mb-0">{getExcerpt(thread.body)}</p>
      </div>
      <div className="card-footer bg-transparent d-flex flex-wrap justify-content-between align-items-center gap-2 px-4 py-3">
        {thread.owner ? (
          <span className="d-flex align-items-center gap-2 small fw-medium">
            <Avatar src={thread.owner.avatar} name={thread.owner.name} size="sm" />
            {thread.owner.name}
          </span>
        ) : <span />}
        <div className="d-flex flex-wrap align-items-center gap-2">
          <small className="text-body-secondary">{`💬 ${thread.totalComments} tanggapan`}</small>
          <Link
            to={`/paruman/${thread.id}`}
            className="btn btn-sm btn-outline-primary rounded-pill px-3"
          >
            Tambah tanggapan
          </Link>
          <VoteControl
            upVotesBy={thread.upVotesBy}
            downVotesBy={thread.downVotesBy}
            authUserId={authUserId}
            onVote={(voteType) => onVote(thread.id, voteType)}
          />
        </div>
      </div>
    </article>
  );
}

export default ParumanItem;

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
    <article className="paruman-item">
      <VoteControl
        upVotesBy={thread.upVotesBy}
        downVotesBy={thread.downVotesBy}
        authUserId={authUserId}
        onVote={(voteType) => onVote(thread.id, voteType)}
      />
      <div className="paruman-item__content">
        <span className="banjar-tag">{`#${getCategoryLabel(thread.category)}`}</span>
        <h3 className="paruman-item__title">
          <Link to={`/paruman/${thread.id}`}>{thread.title}</Link>
        </h3>
        <p className="paruman-item__excerpt">{getExcerpt(thread.body)}</p>
        <footer className="paruman-item__meta">
          {thread.owner && (
            <span className="owner">
              <Avatar src={thread.owner.avatar} name={thread.owner.name} size="sm" />
              {thread.owner.name}
            </span>
          )}
          <span>{postedAt(thread.createdAt)}</span>
          <span>{`${thread.totalComments} tanggapan`}</span>
        </footer>
      </div>
    </article>
  );
}

export default ParumanItem;
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
    <article className="paruman-detail">
      <span className="banjar-tag">{`#${getCategoryLabel(thread.category)}`}</span>
      <h2 className="paruman-detail__title">{thread.title}</h2>
      <div className="paruman-detail__owner">
        <Avatar src={thread.owner.avatar} name={thread.owner.name} />
        <div>
          <strong>{thread.owner.name}</strong>
          <span>{postedAt(thread.createdAt)}</span>
        </div>
      </div>
      <p className="paruman-detail__body">{toPlainText(thread.body)}</p>
      <VoteControl
        upVotesBy={thread.upVotesBy}
        downVotesBy={thread.downVotesBy}
        authUserId={authUserId}
        onVote={onVote}
      />
    </article>
  );
}

export default ParumanDetail;
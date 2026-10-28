import type { Comment, VoteType } from '../../types';
import { postedAt, toPlainText } from '../../utils';
import Avatar from '../common/Avatar';
import VoteControl from '../common/VoteControl';

type ResponseItemProps = {
  comment: Comment;
  authUserId?: string;
  onVote: (commentId: string, voteType: VoteType) => void;
};

function ResponseItem({ comment, authUserId, onVote }: ResponseItemProps) {
  return (
    <article className="list-group-item px-4 py-3">
      <header className="d-flex align-items-center gap-2 mb-2">
        <Avatar src={comment.owner.avatar} name={comment.owner.name} size="sm" />
        <strong className="small">{comment.owner.name}</strong>
        <small className="text-body-secondary">{`· ${postedAt(comment.createdAt)}`}</small>
      </header>
      <p className="text-pre-line mb-2">{toPlainText(comment.content)}</p>
      <VoteControl
        upVotesBy={comment.upVotesBy}
        downVotesBy={comment.downVotesBy}
        authUserId={authUserId}
        onVote={(voteType) => onVote(comment.id, voteType)}
      />
    </article>
  );
}

export default ResponseItem;

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
    <article className="response-item">
      <header className="response-item__header">
        <Avatar src={comment.owner.avatar} name={comment.owner.name} size="sm" />
        <strong>{comment.owner.name}</strong>
        <span>{postedAt(comment.createdAt)}</span>
      </header>
      <p className="response-item__content">{toPlainText(comment.content)}</p>
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
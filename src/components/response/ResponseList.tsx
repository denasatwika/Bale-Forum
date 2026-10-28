import type { Comment, VoteType } from '../../types';
import ResponseItem from './ResponseItem';

type ResponseListProps = {
  comments: Comment[];
  authUserId?: string;
  onVote: (commentId: string, voteType: VoteType) => void;
};

function ResponseList({ comments, authUserId, onVote }: ResponseListProps) {
  return (
    <section className="response-list">
      <h3>{`Tanggapan krama (${comments.length})`}</h3>
      {comments.length === 0 ? (
        <p className="empty-state">Belum ada tanggapan. Jadilah yang pertama.</p>
      ) : (
        comments.map((comment) => (
          <ResponseItem
            key={comment.id}
            comment={comment}
            authUserId={authUserId}
            onVote={onVote}
          />
        ))
      )}
    </section>
  );
}

export default ResponseList;
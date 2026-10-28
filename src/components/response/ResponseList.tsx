import type { Comment, VoteType } from '../../types';
import ResponseItem from './ResponseItem';

type ResponseListProps = {
  comments: Comment[];
  authUserId?: string;
  onVote: (commentId: string, voteType: VoteType) => void;
};

function ResponseList({ comments, authUserId, onVote }: ResponseListProps) {
  return (
    <section>
      <h2 className="font-serif fw-bold fs-3 mb-3">
        Tanggapan krama
        {' '}
        <span className="badge text-bg-secondary fs-6 align-middle">{comments.length}</span>
      </h2>
      {comments.length === 0 ? (
        <p className="text-body-secondary">Belum ada tanggapan. Jadilah yang pertama.</p>
      ) : (
        <div className="list-group shadow-sm">
          {comments.map((comment) => (
            <ResponseItem
              key={comment.id}
              comment={comment}
              authUserId={authUserId}
              onVote={onVote}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ResponseList;

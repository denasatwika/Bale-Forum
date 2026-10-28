import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ParumanDetail from '../components/paruman/ParumanDetail';
import ResponseInput from '../components/response/ResponseInput';
import ResponseList from '../components/response/ResponseList';
import { useAppDispatch, useAppSelector } from '../states/hooks';
import {
  asyncAddComment,
  asyncReceiveThreadDetail,
  asyncToggleVoteComment,
  asyncToggleVoteThreadDetail,
} from '../states/threadDetail/action';
import type { VoteType } from '../types';

function DetailParumanPage() {
  const { id = '' } = useParams();
  const threadDetail = useAppSelector((state) => state.threadDetail);
  const authUser = useAppSelector((state) => state.authUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  if (!threadDetail) return null;

  const onVoteThread = (voteType: VoteType) => {
    dispatch(asyncToggleVoteThreadDetail(voteType));
  };

  const onVoteComment = (commentId: string, voteType: VoteType) => {
    dispatch(asyncToggleVoteComment(commentId, voteType));
  };

  const onAddComment = (content: string) => dispatch(asyncAddComment(id, content));

  return (
    <section className="page page--narrow">
      <Link to="/" className="back-link">← Kembali ke paruman</Link>
      <ParumanDetail thread={threadDetail} authUserId={authUser?.id} onVote={onVoteThread} />
      {authUser ? (
        <ResponseInput onAddComment={onAddComment} />
      ) : (
        <p className="notice">
          <Link to="/masuk">Masuk</Link>
          {' '}
          untuk memberi tanggapan.
        </p>
      )}
      <ResponseList
        comments={threadDetail.comments}
        authUserId={authUser?.id}
        onVote={onVoteComment}
      />
    </section>
  );
}

export default DetailParumanPage;
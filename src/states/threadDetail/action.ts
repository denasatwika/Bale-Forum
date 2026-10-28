import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { getUserVote, toVotePath } from '../../utils/vote';
import type { ThreadDetail, Comment, VoteType } from '../../types';
import type { AppThunk } from '../index';

export const ActionType = {
  RECEIVE_THREAD_DETAIL: 'threadDetail/receive',
  CLEAR_THREAD_DETAIL: 'threadDetail/clear',
  ADD_COMMENT: 'threadDetail/addComment',
  TOGGLE_VOTE_THREAD_DETAIL: 'threadDetail/toggleVote',
  TOGGLE_VOTE_COMMENT: 'threadDetail/toggleVoteComment',
} as const;

export type ReceiveThreadDetailAction = {
  type: typeof ActionType.RECEIVE_THREAD_DETAIL;
  payload: { threadDetail: ThreadDetail };
};

export type ClearThreadDetailAction = {
  type: typeof ActionType.CLEAR_THREAD_DETAIL;
};

export type AddCommentAction = {
  type: typeof ActionType.ADD_COMMENT;
  payload: { comment: Comment };
};

export type ToggleVoteThreadDetailAction = {
  type: typeof ActionType.TOGGLE_VOTE_THREAD_DETAIL;
  payload: { userId: string; voteType: VoteType };
};

export type ToggleVoteCommentAction = {
  type: typeof ActionType.TOGGLE_VOTE_COMMENT;
  payload: { commentId: string; userId: string; voteType: VoteType };
};

export function receiveThreadDetailActionCreator(
  threadDetail: ThreadDetail,
): ReceiveThreadDetailAction {
  return { type: ActionType.RECEIVE_THREAD_DETAIL, payload: { threadDetail } };
}

export function clearThreadDetailActionCreator(): ClearThreadDetailAction {
  return { type: ActionType.CLEAR_THREAD_DETAIL };
}

export function addCommentActionCreator(comment: Comment): AddCommentAction {
  return { type: ActionType.ADD_COMMENT, payload: { comment } };
}

export function toggleVoteThreadDetailActionCreator(
  userId: string,
  voteType: VoteType,
): ToggleVoteThreadDetailAction {
  return { type: ActionType.TOGGLE_VOTE_THREAD_DETAIL, payload: { userId, voteType } };
}

export function toggleVoteCommentActionCreator(
  commentId: string,
  userId: string,
  voteType: VoteType,
): ToggleVoteCommentAction {
  return { type: ActionType.TOGGLE_VOTE_COMMENT, payload: { commentId, userId, voteType } };
}

export function asyncReceiveThreadDetail(threadId: string): AppThunk {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert((error as Error).message);
    }
    dispatch(hideLoading());
  };
}

export function asyncAddComment(threadId: string, content: string): AppThunk<Promise<boolean>> {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment(threadId, content);
      dispatch(addCommentActionCreator(comment));
      return true;
    } catch (error) {
      alert((error as Error).message);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

export function asyncToggleVoteThreadDetail(voteType: VoteType): AppThunk {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Silakan masuk terlebih dahulu untuk memberi vote.');
      return;
    }
    if (!threadDetail) return;

    const previousVote = getUserVote(threadDetail, authUser.id);
    dispatch(toggleVoteThreadDetailActionCreator(authUser.id, voteType));

    try {
      await api.voteThread(threadDetail.id, toVotePath(voteType));
    } catch (error) {
      dispatch(toggleVoteThreadDetailActionCreator(authUser.id, previousVote));
      alert((error as Error).message);
    }
  };
}

export function asyncToggleVoteComment(commentId: string, voteType: VoteType): AppThunk {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Silakan masuk terlebih dahulu untuk memberi vote.');
      return;
    }
    if (!threadDetail) return;

    const comment = threadDetail.comments.find((item) => item.id === commentId);
    if (!comment) return;

    const previousVote = getUserVote(comment, authUser.id);
    dispatch(toggleVoteCommentActionCreator(commentId, authUser.id, voteType));

    try {
      await api.voteComment(threadDetail.id, commentId, toVotePath(voteType));
    } catch (error) {
      dispatch(toggleVoteCommentActionCreator(commentId, authUser.id, previousVote));
      alert((error as Error).message);
    }
  };
}
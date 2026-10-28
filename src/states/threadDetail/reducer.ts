import type { UnknownAction } from '@reduxjs/toolkit';
import type { ThreadDetail } from '../../types';
import { applyVote } from '../../utils/vote';
import {
  ActionType,
  type ReceiveThreadDetailAction,
  type AddCommentAction,
  type ToggleVoteThreadDetailAction,
  type ToggleVoteCommentAction,
} from './action';

function threadDetailReducer(
  threadDetail: ThreadDetail | null = null,
  action: UnknownAction,
): ThreadDetail | null {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return (action as ReceiveThreadDetailAction).payload.threadDetail;

  case ActionType.CLEAR_THREAD_DETAIL:
    return null;

  case ActionType.ADD_COMMENT: {
    if (!threadDetail) return threadDetail;
    const { comment } = (action as AddCommentAction).payload;
    return { ...threadDetail, comments: [comment, ...threadDetail.comments] };
  }

  case ActionType.TOGGLE_VOTE_THREAD_DETAIL: {
    if (!threadDetail) return threadDetail;
    const { userId, voteType } = (action as ToggleVoteThreadDetailAction).payload;
    return applyVote(threadDetail, userId, voteType);
  }

  case ActionType.TOGGLE_VOTE_COMMENT: {
    if (!threadDetail) return threadDetail;
    const { commentId, userId, voteType } = (action as ToggleVoteCommentAction).payload;
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => (
        comment.id === commentId ? applyVote(comment, userId, voteType) : comment
      )),
    };
  }

  default:
    return threadDetail;
  }
}

export default threadDetailReducer;
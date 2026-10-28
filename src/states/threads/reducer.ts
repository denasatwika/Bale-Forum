import type { UnknownAction } from '@reduxjs/toolkit';
import type { Thread } from '../../types';
import { applyVote } from '../../utils/vote';
import {
  ActionType,
  type ReceiveThreadsAction,
  type AddThreadAction,
  type ToggleVoteThreadAction,
} from './action';

function threadsReducer(threads: Thread[] = [], action: UnknownAction): Thread[] {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return (action as ReceiveThreadsAction).payload.threads;

  case ActionType.ADD_THREAD:
    return [(action as AddThreadAction).payload.thread, ...threads];

  case ActionType.TOGGLE_VOTE_THREAD: {
    const { threadId, userId, voteType } = (action as ToggleVoteThreadAction).payload;
    return threads.map((thread) => (
      thread.id === threadId ? applyVote(thread, userId, voteType) : thread
    ));
  }

  default:
    return threads;
  }
}

export default threadsReducer;
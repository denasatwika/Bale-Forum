import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { getUserVote, toVotePath } from '../../utils/vote';
import type { Thread, VoteType, NewThreadPayload } from '../../types';
import type { AppThunk } from '../index';

export const ActionType = {
  RECEIVE_THREADS: 'threads/receive',
  ADD_THREAD: 'threads/add',
  TOGGLE_VOTE_THREAD: 'threads/toggleVote',
} as const;

export type ReceiveThreadsAction = {
  type: typeof ActionType.RECEIVE_THREADS;
  payload: { threads: Thread[] };
};

export type AddThreadAction = {
  type: typeof ActionType.ADD_THREAD;
  payload: { thread: Thread };
};

export type ToggleVoteThreadAction = {
  type: typeof ActionType.TOGGLE_VOTE_THREAD;
  payload: { threadId: string; userId: string; voteType: VoteType };
};

export function receiveThreadsActionCreator(threads: Thread[]): ReceiveThreadsAction {
  return { type: ActionType.RECEIVE_THREADS, payload: { threads } };
}

export function addThreadActionCreator(thread: Thread): AddThreadAction {
  return { type: ActionType.ADD_THREAD, payload: { thread } };
}

export function toggleVoteThreadActionCreator(
  threadId: string,
  userId: string,
  voteType: VoteType,
): ToggleVoteThreadAction {
  return { type: ActionType.TOGGLE_VOTE_THREAD, payload: { threadId, userId, voteType } };
}

// Payload bertype NewThreadPayload
export function asyncAddThread(payload: NewThreadPayload): AppThunk<Promise<boolean>> {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread(payload);
      dispatch(addThreadActionCreator(thread));
      return true;
    } catch (error) {
      alert((error as Error).message);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

export function asyncToggleVoteThread(threadId: string, voteType: VoteType): AppThunk {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      alert('Silakan masuk terlebih dahulu untuk memberi vote.');
      return;
    }

    const thread = threads.find((item) => item.id === threadId);
    if (!thread) return;

    const previousVote = getUserVote(thread, authUser.id);
    dispatch(toggleVoteThreadActionCreator(threadId, authUser.id, voteType));

    try {
      await api.voteThread(threadId, toVotePath(voteType));
    } catch (error) {
      dispatch(toggleVoteThreadActionCreator(threadId, authUser.id, previousVote));
      alert((error as Error).message);
    }
  };
}
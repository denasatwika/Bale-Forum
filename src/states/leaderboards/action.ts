import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import type { Leaderboard } from '../../types';
import type { AppThunk } from '../index';

export const ActionType = {
  RECEIVE_LEADERBOARDS: 'leaderboards/receive',
} as const;

export type ReceiveLeaderboardsAction = {
  type: typeof ActionType.RECEIVE_LEADERBOARDS;
  payload: { leaderboards: Leaderboard[] };
};

export function receiveLeaderboardsActionCreator(
  leaderboards: Leaderboard[],
): ReceiveLeaderboardsAction {
  return { type: ActionType.RECEIVE_LEADERBOARDS, payload: { leaderboards } };
}

export function asyncReceiveLeaderboards(): AppThunk {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      alert((error as Error).message);
    } finally {
      dispatch(hideLoading());
    }
  };
}
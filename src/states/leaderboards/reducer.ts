import type { UnknownAction } from '@reduxjs/toolkit';
import type { Leaderboard } from '../../types';
import { ActionType, type ReceiveLeaderboardsAction } from './action';

function leaderboardsReducer(leaderboards: Leaderboard[] = [], action: UnknownAction): Leaderboard[] {
  switch (action.type) {
  case ActionType.RECEIVE_LEADERBOARDS:
    return (action as ReceiveLeaderboardsAction).payload.leaderboards;
  default:
    return leaderboards;
  }
}

export default leaderboardsReducer;
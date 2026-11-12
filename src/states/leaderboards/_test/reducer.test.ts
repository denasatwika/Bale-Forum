/**
 * Skenario pengujian leaderboardsReducer
 *
 * - leaderboardsReducer
 *   - harus mengembalikan array kosong ketika diberi action yang tidak dikenal
 *   - harus mengembalikan daftar leaderboard ketika diberi action RECEIVE_LEADERBOARDS
 */
import type { Leaderboard } from '../../../types';
import leaderboardsReducer from '../reducer';
import { receiveLeaderboardsActionCreator } from '../action';

const fakeLeaderboards = (): Leaderboard[] => [
  {
    user: {
      id: 'user-1',
      name: 'Dena',
      email: 'dena@example.com',
      avatar: 'https://example.com/dena.png',
    },
    score: 25,
  },
  {
    user: {
      id: 'user-2',
      name: 'Komang',
      email: 'komang@example.com',
      avatar: 'https://example.com/komang.png',
    },
    score: 10,
  },
];

describe('leaderboardsReducer function', () => {
  it('should return an empty array when given unknown action', () => {
    const action = { type: 'UNKNOWN' };

    const nextState = leaderboardsReducer(undefined, action);

    expect(nextState).toEqual([]);
  });

  it('should return the leaderboards when given RECEIVE_LEADERBOARDS action', () => {
    const leaderboards = fakeLeaderboards();

    const nextState = leaderboardsReducer([], receiveLeaderboardsActionCreator(leaderboards));

    expect(nextState).toEqual(leaderboards);
  });
});
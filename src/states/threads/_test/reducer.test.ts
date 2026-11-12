/**
 * Skenario pengujian threadsReducer
 *
 * - threadsReducer
 *   - harus mengembalikan array kosong ketika diberi action yang tidak dikenal
 *   - harus mengembalikan daftar thread ketika diberi action RECEIVE_THREADS
 *   - harus menambahkan thread baru di urutan pertama ketika diberi action ADD_THREAD
 *   - harus hanya mengubah vote thread yang dituju ketika diberi action TOGGLE_VOTE_THREAD
 */
import type { Thread } from '../../../types';
import threadsReducer from '../reducer';
import {
  addThreadActionCreator,
  receiveThreadsActionCreator,
  toggleVoteThreadActionCreator,
} from '../action';

const fakeThread = (id: string): Thread => ({
  id,
  title: `Paruman ${id}`,
  body: `Isi paruman ${id}`,
  category: 'umum',
  createdAt: '2026-11-01T07:00:00.000Z',
  ownerId: 'user-1',
  totalComments: 0,
  upVotesBy: [],
  downVotesBy: [],
});

describe('threadsReducer function', () => {
  it('should return an empty array when given unknown action', () => {
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(undefined, action);

    expect(nextState).toEqual([]);
  });

  it('should return the threads when given RECEIVE_THREADS action', () => {
    const initialState = [fakeThread('thread-lama')];
    const threads = [fakeThread('thread-1'), fakeThread('thread-2')];

    const nextState = threadsReducer(initialState, receiveThreadsActionCreator(threads));

    expect(nextState).toEqual(threads);
  });

  it('should add the new thread at the beginning when given ADD_THREAD action', () => {
    const initialState = [fakeThread('thread-1')];
    const newThread = fakeThread('thread-2');

    const nextState = threadsReducer(initialState, addThreadActionCreator(newThread));

    expect(nextState).toEqual([newThread, ...initialState]);
    expect(initialState).toHaveLength(1);
  });

  it('should only change the targeted thread when given TOGGLE_VOTE_THREAD action', () => {
    const initialState = [fakeThread('thread-1'), fakeThread('thread-2')];

    const nextState = threadsReducer(
      initialState,
      toggleVoteThreadActionCreator('thread-2', 'user-1', 1),
    );

    expect(nextState[1].upVotesBy).toEqual(['user-1']);
    expect(nextState[0]).toEqual(initialState[0]);
  });
});
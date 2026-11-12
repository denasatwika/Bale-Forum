/**
 * Skenario pengujian threadDetailReducer
 *
 * - threadDetailReducer
 *   - harus mengembalikan state awal (null) ketika diberi action yang tidak dikenal
 *   - harus mengembalikan detail thread ketika diberi action RECEIVE_THREAD_DETAIL
 *   - harus mengembalikan null ketika diberi action CLEAR_THREAD_DETAIL
 *   - harus menambahkan komentar di urutan pertama ketika diberi action ADD_COMMENT
 *   - harus tetap null ketika diberi action ADD_COMMENT sementara state masih null
 *   - harus memindahkan userId ke upVotesBy ketika diberi action TOGGLE_VOTE_THREAD_DETAIL bernilai 1
 *   - harus menghapus userId dari kedua daftar vote ketika diberi action TOGGLE_VOTE_THREAD_DETAIL bernilai 0
 *   - harus hanya mengubah vote komentar yang dituju ketika diberi action TOGGLE_VOTE_COMMENT
 */

import type { Comment, ThreadDetail } from '../../../types';
import threadDetailReducer from '../reducer';
import {
  addCommentActionCreator,
  clearThreadDetailActionCreator,
  receiveThreadDetailActionCreator,
  toggleVoteCommentActionCreator,
  toggleVoteThreadDetailActionCreator,
} from '../action';

const fakeComment = (id: string): Comment => ({
  id,
  content: `Isi tanggapan ${id}`,
  createdAt: '2026-11-01T08:00:00.000Z',
  owner: { id: 'user-2', name: 'Komang', avatar: 'https://example.com/komang.png' },
  upVotesBy: [],
  downVotesBy: [],
});

const fakeThreadDetail = (): ThreadDetail => ({
  id: 'thread-1',
  title: 'Paruman pertama',
  body: 'Isi paruman pertama',
  category: 'umum',
  createdAt: '2026-11-01T07:00:00.000Z',
  owner: { id: 'user-1', name: 'Dena', avatar: 'https://example.com/dena.png' },
  upVotesBy: [],
  downVotesBy: ['user-3'],
  comments: [fakeComment('comment-1'), fakeComment('comment-2')],
});

describe('threadDetailReducer function', () => {
  it('should return the initial state when given unknown action', () => {
    const action = { type: 'UNKNOWN' };

    const nextState = threadDetailReducer(undefined, action);

    expect(nextState).toBeNull();
  });

  it('should return the thread detail when given RECEIVE_THREAD_DETAIL action', () => {
    const threadDetail = fakeThreadDetail();

    const nextState = threadDetailReducer(null, receiveThreadDetailActionCreator(threadDetail));

    expect(nextState).toEqual(threadDetail);
  });

  it('should return null when given CLEAR_THREAD_DETAIL action', () => {
    const nextState = threadDetailReducer(fakeThreadDetail(), clearThreadDetailActionCreator());

    expect(nextState).toBeNull();
  });

    it('should add the new comment at the beginning when given ADD_COMMENT action', () => {
    const initialState = fakeThreadDetail();
    const newComment = fakeComment('comment-3');

    const nextState = threadDetailReducer(initialState, addCommentActionCreator(newComment));

    expect(nextState?.comments).toEqual([newComment, ...initialState.comments]);
    expect(initialState.comments).toHaveLength(2);
  });

  it('should keep null when given ADD_COMMENT action while state is null', () => {
    const nextState = threadDetailReducer(null, addCommentActionCreator(fakeComment('comment-3')));

    expect(nextState).toBeNull();
  });

  it('should move userId into upVotesBy when given TOGGLE_VOTE_THREAD_DETAIL action with 1', () => {
    const nextState = threadDetailReducer(
      fakeThreadDetail(),
      toggleVoteThreadDetailActionCreator('user-3', 1),
    );

    expect(nextState?.upVotesBy).toEqual(['user-3']);
    expect(nextState?.downVotesBy).toEqual([]);
  });

  it('should remove userId from both vote lists when given TOGGLE_VOTE_THREAD_DETAIL action with 0', () => {
    const nextState = threadDetailReducer(
      fakeThreadDetail(),
      toggleVoteThreadDetailActionCreator('user-3', 0),
    );

    expect(nextState?.upVotesBy).toEqual([]);
    expect(nextState?.downVotesBy).toEqual([]);
  });

  it('should only change the targeted comment when given TOGGLE_VOTE_COMMENT action', () => {
    const initialState = fakeThreadDetail();

    const nextState = threadDetailReducer(
      initialState,
      toggleVoteCommentActionCreator('comment-2', 'user-1', -1),
    );

    expect(nextState?.comments[1].downVotesBy).toEqual(['user-1']);
    expect(nextState?.comments[0]).toEqual(initialState.comments[0]);
  });
});
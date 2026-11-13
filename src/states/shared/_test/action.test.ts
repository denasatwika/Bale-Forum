/**
 * Skenario pengujian thunk shared
 *
 * - asyncPopulateUsersAndThreads thunk
 *   - harus men-dispatch receiveUsers dan receiveThreads dengan data dari API ketika keduanya berhasil
 *   - harus menampilkan alert dan tidak men-dispatch keduanya ketika salah satu API gagal
 *   - harus tetap men-dispatch hideLoading ketika API gagal
 */
import { hideLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';
import type { Thread, User } from '../../../types';
import type { RootState } from '../../index';
import { receiveUsersActionCreator } from '../../user/action';
import { receiveThreadsActionCreator } from '../../threads/action';
import asyncPopulateUsersAndThreads from '../action';

const fakeUsers = (): User[] => [
  {
    id: 'user-1',
    name: 'Dena',
    email: 'dena@example.com',
    avatar: 'https://example.com/dena.png',
  },
];

const fakeThreads = (): Thread[] => [
  {
    id: 'thread-1',
    title: 'Paruman pertama',
    body: 'Isi paruman pertama',
    category: 'umum',
    createdAt: '2026-11-01T07:00:00.000Z',
    ownerId: 'user-1',
    totalComments: 0,
    upVotesBy: [],
    downVotesBy: [],
  },
];

const dummyGetState = () => ({}) as RootState;

describe('asyncPopulateUsersAndThreads thunk', () => {
  it('should dispatch receiveUsers and receiveThreads with API data when both succeed', async () => {
    vi.spyOn(api, 'getAllUsers').mockResolvedValue(fakeUsers());
    vi.spyOn(api, 'getAllThreads').mockResolvedValue(fakeThreads());
    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch, dummyGetState, undefined);

    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsers()));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreads()));
  });

  it('should show alert and dispatch neither when one of the APIs fails', async () => {
    vi.spyOn(api, 'getAllUsers').mockResolvedValue(fakeUsers());
    vi.spyOn(api, 'getAllThreads').mockRejectedValue(new Error('server error'));
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch, dummyGetState, undefined);

    expect(alertSpy).toHaveBeenCalledWith('server error');
    expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'users/receive' }));
    expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'threads/receive' }));
  });

  it('should still dispatch hideLoading when an API fails', async () => {
    vi.spyOn(api, 'getAllUsers').mockResolvedValue(fakeUsers());
    vi.spyOn(api, 'getAllThreads').mockRejectedValue(new Error('server error'));
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch, dummyGetState, undefined);

    expect(dispatch).toHaveBeenLastCalledWith(hideLoading());
  });
});
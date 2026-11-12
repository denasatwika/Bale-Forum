/**
 * Skenario pengujian thunk threads
 *
 * - asyncToggleVoteThread thunk
 *   - harus menampilkan alert dan tidak memanggil API ketika pengguna belum login
 *   - harus men-dispatch toggle vote lebih dulu lalu memanggil API dengan path yang benar
 *   - harus men-dispatch rollback ke vote sebelumnya dan menampilkan alert ketika API gagal
 */
import api from '../../../utils/api';
import type { Thread, User } from '../../../types';
import type { RootState } from '../../index';
import { asyncToggleVoteThread, toggleVoteThreadActionCreator } from '../action';

const fakeUser = (): User => ({
  id: 'user-1',
  name: 'Dena',
  email: 'dena@example.com',
  avatar: 'https://example.com/dena.png',
});

const fakeThread = (): Thread => ({
  id: 'thread-1',
  title: 'Paruman pertama',
  body: 'Isi paruman pertama',
  category: 'umum',
  createdAt: '2026-11-01T07:00:00.000Z',
  ownerId: 'user-2',
  totalComments: 0,
  upVotesBy: [],
  downVotesBy: ['user-1'],
});

const stubGetState = (state: Partial<RootState>) => () => state as RootState;

describe('asyncToggleVoteThread thunk', () => {
  it('should show alert and not call API when user is not logged in', async () => {
    const voteSpy = vi.spyOn(api, 'voteThread');
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const dispatch = vi.fn();
    const getState = stubGetState({ authUser: null, threads: [fakeThread()] });

    await asyncToggleVoteThread('thread-1', 1)(dispatch, getState, undefined);

    expect(alertSpy).toHaveBeenCalledWith('Silakan masuk terlebih dahulu untuk memberi vote.');
    expect(voteSpy).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('should dispatch toggle vote first and then call API with the right path', async () => {
    const voteSpy = vi.spyOn(api, 'voteThread').mockResolvedValue(undefined);
    const dispatch = vi.fn();
    const getState = stubGetState({ authUser: fakeUser(), threads: [fakeThread()] });

    await asyncToggleVoteThread('thread-1', 1)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(toggleVoteThreadActionCreator('thread-1', 'user-1', 1));
    expect(voteSpy).toHaveBeenCalledWith('thread-1', 'up-vote');
    expect(dispatch.mock.invocationCallOrder[0])
      .toBeLessThan(voteSpy.mock.invocationCallOrder[0]);
  });

  it('should dispatch rollback to previous vote and show alert when API fails', async () => {
    vi.spyOn(api, 'voteThread').mockRejectedValue(new Error('network error'));
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const dispatch = vi.fn();
    const getState = stubGetState({ authUser: fakeUser(), threads: [fakeThread()] });

    await asyncToggleVoteThread('thread-1', 1)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenNthCalledWith(1, toggleVoteThreadActionCreator('thread-1', 'user-1', 1));
    expect(dispatch).toHaveBeenNthCalledWith(2, toggleVoteThreadActionCreator('thread-1', 'user-1', -1));
    expect(alertSpy).toHaveBeenCalledWith('network error');
  });
});
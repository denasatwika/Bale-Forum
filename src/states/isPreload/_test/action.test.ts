/**
 * Skenario pengujian thunk isPreload
 *
 * - asyncPreloadProcess thunk
 *   - harus men-dispatch setAuthUser ketika profil berhasil diambil
 *   - harus men-dispatch unsetAuthUser tanpa menampilkan alert ketika profil gagal diambil
 *   - harus mengakhiri proses dengan setIsPreload(false) dan hideLoading ketika berhasil
 *   - harus mengakhiri proses dengan setIsPreload(false) dan hideLoading ketika gagal
 */
import { hideLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';
import type { User } from '../../../types';
import type { RootState } from '../../index';
import { setAuthUserActionCreator, unsetAuthUserActionCreator } from '../../authUser/action';
import { asyncPreloadProcess, setIsPreloadActionCreator } from '../action';

const fakeUser = (): User => ({
  id: 'user-1',
  name: 'Dena',
  email: 'dena@example.com',
  avatar: 'https://example.com/dena.png',
});

const dummyGetState = () => ({}) as RootState;

describe('asyncPreloadProcess thunk', () => {
  it('should dispatch setAuthUser when profile is fetched successfully', async () => {
    vi.spyOn(api, 'getOwnProfile').mockResolvedValue(fakeUser());
    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch, dummyGetState, undefined);

    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser()));
    expect(dispatch).not.toHaveBeenCalledWith(unsetAuthUserActionCreator());
  });

  it('should dispatch unsetAuthUser without showing alert when profile fetch fails', async () => {
    vi.spyOn(api, 'getOwnProfile').mockRejectedValue(new Error('Missing authentication'));
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch, dummyGetState, undefined);

    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(alertSpy).not.toHaveBeenCalled();
  });

  it('should end with setIsPreload(false) and hideLoading when it succeeds', async () => {
    vi.spyOn(api, 'getOwnProfile').mockResolvedValue(fakeUser());
    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch, dummyGetState, undefined);

    expect(dispatch.mock.calls.slice(-2)).toEqual([
      [setIsPreloadActionCreator(false)],
      [hideLoading()],
    ]);
  });

  it('should end with setIsPreload(false) and hideLoading when it fails', async () => {
    vi.spyOn(api, 'getOwnProfile').mockRejectedValue(new Error('Missing authentication'));
    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch, dummyGetState, undefined);

    expect(dispatch.mock.calls.slice(-2)).toEqual([
      [setIsPreloadActionCreator(false)],
      [hideLoading()],
    ]);
  });
});
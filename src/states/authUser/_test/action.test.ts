/**
 * Skenario pengujian thunk authUser
 *
 * - asyncSetAuthUser thunk
 *   - harus men-dispatch showLoading, setAuthUser, dan hideLoading secara berurutan ketika login berhasil
 *   - harus menyimpan token dan mengambil profil pengguna ketika login berhasil
 *   - harus menampilkan alert dan tidak men-dispatch setAuthUser ketika login gagal
 *   - harus tetap men-dispatch hideLoading ketika login gagal
 */
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';
import type { User } from '../../../types';
import type { RootState } from '../../index';
import { asyncSetAuthUser, setAuthUserActionCreator } from '../action';

const fakeUser = (): User => ({
  id: 'user-1',
  name: 'Dena',
  email: 'dena@example.com',
  avatar: 'https://example.com/dena.png',
});

const dummyGetState = () => ({}) as RootState;

describe('asyncSetAuthUser thunk', () => {
  it('should dispatch showLoading, setAuthUser, and hideLoading in order when login succeeds', async () => {
    vi.spyOn(api, 'login').mockResolvedValue('fake-token');
    vi.spyOn(api, 'getOwnProfile').mockResolvedValue(fakeUser());
    const dispatch = vi.fn();

    await asyncSetAuthUser('dena@example.com', 'rahasia')(dispatch, dummyGetState, undefined);

    expect(dispatch).toHaveBeenNthCalledWith(1, showLoading());
    expect(dispatch).toHaveBeenNthCalledWith(2, setAuthUserActionCreator(fakeUser()));
    expect(dispatch).toHaveBeenNthCalledWith(3, hideLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('should save the token and fetch the profile when login succeeds', async () => {
    const loginSpy = vi.spyOn(api, 'login').mockResolvedValue('fake-token');
    const putTokenSpy = vi.spyOn(api, 'putAccessToken');
    vi.spyOn(api, 'getOwnProfile').mockResolvedValue(fakeUser());

    await asyncSetAuthUser('dena@example.com', 'rahasia')(vi.fn(), dummyGetState, undefined);

    expect(loginSpy).toHaveBeenCalledWith({ email: 'dena@example.com', password: 'rahasia' });
    expect(putTokenSpy).toHaveBeenCalledWith('fake-token');
  });

  it('should show alert and not dispatch setAuthUser when login fails', async () => {
    vi.spyOn(api, 'login').mockRejectedValue(new Error('email or password is wrong'));
    const getProfileSpy = vi.spyOn(api, 'getOwnProfile');
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const dispatch = vi.fn();

    await asyncSetAuthUser('dena@example.com', 'salah')(dispatch, dummyGetState, undefined);

    expect(alertSpy).toHaveBeenCalledWith('email or password is wrong');
    expect(getProfileSpy).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'authUser/set' }));
  });

  it('should still dispatch hideLoading when login fails', async () => {
    vi.spyOn(api, 'login').mockRejectedValue(new Error('email or password is wrong'));
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    const dispatch = vi.fn();

    await asyncSetAuthUser('dena@example.com', 'salah')(dispatch, dummyGetState, undefined);

    expect(dispatch).toHaveBeenLastCalledWith(hideLoading());
  });
});
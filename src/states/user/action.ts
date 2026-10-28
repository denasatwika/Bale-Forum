import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { User, RegisterPayload } from '../../types';
import type { AppThunk } from '../index';

export const ActionType = {
  RECEIVE_USERS: 'users/receive',
} as const;

// Menentukan bentuk action yang dikirim ke redux
export type ReceiveUsersAction = {
  type: typeof ActionType.RECEIVE_USERS;
  payload: { users: User[] };
};

// Fungsi membuat objek action berdasarkan daftar pengguna yang diterima
export function receiveUsersActionCreator(users: User[]): ReceiveUsersAction {
  return { type: ActionType.RECEIVE_USERS, payload: { users } };
}

export function asyncRegisterUser(payload: RegisterPayload): AppThunk<Promise<boolean>> {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register(payload);
      return true;
    } catch (error) {
      alert((error as Error).message);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}
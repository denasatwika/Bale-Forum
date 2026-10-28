import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import type { User } from '../../types';
import type { AppThunk } from '../index';

export const ActionType = {
  SET_AUTH_USER: 'authUser/set',
  UNSET_AUTH_USER: 'authUser/unset',
} as const;

export type SetAuthUserAction = {
  type: typeof ActionType.SET_AUTH_USER;
  payload: { authUser: User };
};

export type UnsetAuthUserAction = {
  type: typeof ActionType.UNSET_AUTH_USER;
};

export function setAuthUserActionCreator(authUser: User): SetAuthUserAction {
  return { type: ActionType.SET_AUTH_USER, payload: { authUser } };
}

export function unsetAuthUserActionCreator(): UnsetAuthUserAction {
  return { type: ActionType.UNSET_AUTH_USER };
}

export function asyncSetAuthUser(email: string, password: string): AppThunk {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      alert((error as Error).message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export function asyncUnsetAuthUser(): AppThunk<void> {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.removeAccessToken();
  };
}
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import type { AppThunk } from '../index';
import { setAuthUserActionCreator, unsetAuthUserActionCreator } from '../authUser/action';

export const ActionType = {
  SET_IS_PRELOAD: 'isPreload/set',
} as const;

export type SetIsPreloadAction = {
  type: typeof ActionType.SET_IS_PRELOAD;
  payload: { isPreload: boolean };
};

export function setIsPreloadActionCreator(isPreload: boolean): SetIsPreloadAction {
  return { type: ActionType.SET_IS_PRELOAD, payload: { isPreload } };
}

export function asyncPreloadProcess(): AppThunk {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch {
      dispatch(unsetAuthUserActionCreator());
    } finally {
      dispatch(setIsPreloadActionCreator(false));
      dispatch(hideLoading());
    }
  };
}
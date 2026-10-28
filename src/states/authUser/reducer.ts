import type { UnknownAction } from '@reduxjs/toolkit';
import type { User } from '../../types';
import { ActionType, type SetAuthUserAction } from './action';

function authUserReducer(authUser: User | null = null, action: UnknownAction): User | null {
  switch (action.type) {
  case ActionType.SET_AUTH_USER:
    return (action as SetAuthUserAction).payload.authUser;
  case ActionType.UNSET_AUTH_USER:
    return null;
  default:
    return authUser;
  }
}

export default authUserReducer;
import type { UnknownAction } from '@reduxjs/toolkit';
import { ActionType, type SetIsPreloadAction } from './action';

function isPreloadReducer(isPreload = true, action: UnknownAction): boolean {
  switch (action.type) {
  case ActionType.SET_IS_PRELOAD:
    return (action as SetIsPreloadAction).payload.isPreload;
  default:
    return isPreload;
  }
}

export default isPreloadReducer;
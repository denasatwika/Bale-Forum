import type { UnknownAction } from '@reduxjs/toolkit';
import type { User } from '../../types';
import { ActionType, type ReceiveUsersAction } from './action';

function usersReducer(users: User[] = [], action: UnknownAction): User[] {
  switch (action.type) {
  case ActionType.RECEIVE_USERS:
    return (action as ReceiveUsersAction).payload.users;
  default:
    return users;
  }
}

export default usersReducer;
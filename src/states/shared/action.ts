import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import type { AppThunk } from '../index';
import { receiveUsersActionCreator } from '../user/action';
import { receiveThreadsActionCreator } from '../threads/action';

function asyncPopulateUsersAndThreads(): AppThunk {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const [users, threads] = await Promise.all([api.getAllUsers(), api.getAllThreads()]);
      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert((error as Error).message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export default asyncPopulateUsersAndThreads;
/**
 * Skenario pengujian authUserReducer
 *
 * - authUserReducer
 *   - harus mengembalikan null ketika diberi action yang tidak dikenal
 *   - harus mengembalikan data pengguna ketika diberi action SET_AUTH_USER
 *   - harus mengembalikan null ketika diberi action UNSET_AUTH_USER
 */
import type { User } from '../../../types';
import authUserReducer from '../reducer';
import { setAuthUserActionCreator, unsetAuthUserActionCreator } from '../action';

const fakeUser = (): User => ({
  id: 'user-1',
  name: 'Dena',
  email: 'dena@example.com',
  avatar: 'https://example.com/dena.png',
});

describe('authUserReducer function', () => {
  it('should return null when given unknown action', () => {
    const action = { type: 'UNKNOWN' };

    const nextState = authUserReducer(undefined, action);

    expect(nextState).toBeNull();
  });

  it('should return the user when given SET_AUTH_USER action', () => {
    const user = fakeUser();

    const nextState = authUserReducer(null, setAuthUserActionCreator(user));

    expect(nextState).toEqual(user);
  });

  it('should return null when given UNSET_AUTH_USER action', () => {
    const nextState = authUserReducer(fakeUser(), unsetAuthUserActionCreator());

    expect(nextState).toBeNull();
  });
});
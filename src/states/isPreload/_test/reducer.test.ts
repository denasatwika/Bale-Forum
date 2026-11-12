/**
 * Skenario pengujian isPreloadReducer
 *
 * - isPreloadReducer
 *   - harus mengembalikan true ketika diberi action yang tidak dikenal
 *   - harus mengembalikan nilai sesuai payload ketika diberi action SET_IS_PRELOAD
 */
import isPreloadReducer from '../reducer';
import { setIsPreloadActionCreator } from '../action';

describe('isPreloadReducer function', () => {
  it('should return true when given unknown action', () => {
    const action = { type: 'UNKNOWN' };

    const nextState = isPreloadReducer(undefined, action);

    expect(nextState).toBe(true);
  });

  it('should return the payload value when given SET_IS_PRELOAD action', () => {
    const nextState = isPreloadReducer(true, setIsPreloadActionCreator(false));

    expect(nextState).toBe(false);
  });
});
/**
 * Skenario pengujian thunk threadDetail
 *
 * - asyncAddComment thunk
 *   - harus memanggil API dengan threadId dan isi tanggapan yang benar
 *   - harus men-dispatch addComment dengan owner dari authUser ketika berhasil
 *   - harus memakai comment.owner dari respons API ketika authUser kosong
 *   - harus mengembalikan true ketika berhasil
 *   - harus mengembalikan false, menampilkan alert, dan tidak men-dispatch addComment ketika gagal
 */
import api from '../../../utils/api';
import type { Comment, User } from '../../../types';
import type { RootState } from '../../index';
import { addCommentActionCreator, asyncAddComment } from '../action';

const fakeAuthUser = (): User => ({
  id: 'user-1',
  name: 'Dena',
  email: 'dena@example.com',
  avatar: 'https://example.com/dena.png',
});

const fakeApiComment = (): Comment => ({
  id: 'comment-1',
  content: 'Setuju dengan usulan ini',
  createdAt: '2026-11-01T08:00:00.000Z',
  owner: { id: 'user-1', name: 'Dena', avatar: '' },
  upVotesBy: [],
  downVotesBy: [],
});

const stubGetState = (state: Partial<RootState>) => () => state as RootState;

describe('asyncAddComment thunk', () => {
  it('should call API with the right threadId and content', async () => {
    const createSpy = vi.spyOn(api, 'createComment').mockResolvedValue(fakeApiComment());
    const getState = stubGetState({ authUser: fakeAuthUser() });

    await asyncAddComment('thread-1', 'Setuju dengan usulan ini')(vi.fn(), getState, undefined);

    expect(createSpy).toHaveBeenCalledWith('thread-1', 'Setuju dengan usulan ini');
  });

  it('should dispatch addComment with owner taken from authUser when it succeeds', async () => {
    vi.spyOn(api, 'createComment').mockResolvedValue(fakeApiComment());
    const dispatch = vi.fn();
    const getState = stubGetState({ authUser: fakeAuthUser() });

    await asyncAddComment('thread-1', 'Setuju dengan usulan ini')(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator({
      ...fakeApiComment(),
      owner: { id: 'user-1', name: 'Dena', avatar: 'https://example.com/dena.png' },
    }));
  });

  it('should use comment.owner from API response when authUser is empty', async () => {
    vi.spyOn(api, 'createComment').mockResolvedValue(fakeApiComment());
    const dispatch = vi.fn();
    const getState = stubGetState({ authUser: null });

    await asyncAddComment('thread-1', 'Setuju dengan usulan ini')(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator(fakeApiComment()));
  });

  it('should return true when it succeeds', async () => {
    vi.spyOn(api, 'createComment').mockResolvedValue(fakeApiComment());
    const getState = stubGetState({ authUser: fakeAuthUser() });

    const result = await asyncAddComment('thread-1', 'Setuju dengan usulan ini')(vi.fn(), getState, undefined);

    expect(result).toBe(true);
  });

  it('should return false, show alert, and not dispatch addComment when it fails', async () => {
    vi.spyOn(api, 'createComment').mockRejectedValue(new Error('content should not be empty'));
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const dispatch = vi.fn();
    const getState = stubGetState({ authUser: fakeAuthUser() });

    const result = await asyncAddComment('thread-1', '')(dispatch, getState, undefined);

    expect(result).toBe(false);
    expect(alertSpy).toHaveBeenCalledWith('content should not be empty');
    expect(dispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: 'threadDetail/addComment' }),
    );
  });
});
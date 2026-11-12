/**
 * Skenario pengujian utils/vote
 *
 * - fungsi toVotePath
 *   - harus mengembalikan 'up-vote ketika voteType bernilai 1
 *   - harus mengembalikan 'down-vote' ketika voteType bernilai -1
 *   - harus mengembalikan 'neutral-vote' ketika voteType bernilai 0
 */
import { toVotePath } from '../vote';

describe('toVotePath function', () => {
  it('should return up-vote when voteType is 1', () => {
    expect(toVotePath(1)).toBe('up-vote');
  });

  it('should return down-vote when voteType is -1', () => {
    expect(toVotePath(-1)).toBe('down-vote');
  });

  it('should return neutral-vote when voteType is 0', () => {
    expect(toVotePath(0)).toBe('neutral-vote');
  });
});
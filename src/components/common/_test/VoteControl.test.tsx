/**
 * Skenario pengujian komponen VoteControl
 *
 * - komponen VoteControl
 *   - harus menampilkan jumlah vote setuju dan tidak setuju
 *   - harus menandai tombol Setuju sebagai aktif ketika pengguna sudah memberi vote setuju
 *   - tidak boleh menandai tombol mana pun sebagai aktif ketika pengguna belum login
 *   - harus memanggil onVote dengan 1 ketika tombol Setuju diklik dan pengguna belum memberi vote
 *   - harus memanggil onVote dengan 0 ketika tombol Setuju diklik dan pengguna sudah memberi vote setuju
 *   - harus memanggil onVote dengan -1 ketika tombol Tidak setuju diklik dan pengguna sudah memberi vote setuju
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VoteControl from '../VoteControl';

describe('VoteControl component', () => {
  it('should display the number of up votes and down votes', () => {
    render(
      <VoteControl
        upVotesBy={['user-1', 'user-2']}
        downVotesBy={['user-3']}
        authUserId="user-9"
        onVote={() => {}}
      />,
    );

    expect(screen.getByRole('button', { name: 'Setuju' })).toHaveTextContent('2');
    expect(screen.getByRole('button', { name: 'Tidak setuju' })).toHaveTextContent('1');
  });

  it('should mark Setuju button as pressed when user has up-voted', () => {
    render(<VoteControl upVotesBy={['user-1']} downVotesBy={[]} authUserId="user-1" onVote={() => {}} />);

    expect(screen.getByRole('button', { name: 'Setuju' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Tidak setuju' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('should not mark any button as pressed when user is not logged in', () => {
    render(<VoteControl upVotesBy={['user-1']} downVotesBy={['user-2']} onVote={() => {}} />);

    expect(screen.getByRole('button', { name: 'Setuju' })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button', { name: 'Tidak setuju' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('should call onVote with 1 when Setuju is clicked and user has not voted', async () => {
    const user = userEvent.setup();
    const onVote = vi.fn();
    render(<VoteControl upVotesBy={[]} downVotesBy={[]} authUserId="user-1" onVote={onVote} />);

    await user.click(screen.getByRole('button', { name: 'Setuju' }));

    expect(onVote).toHaveBeenCalledWith(1);
  });

  it('should call onVote with 0 when Setuju is clicked and user has already up-voted', async () => {
    const user = userEvent.setup();
    const onVote = vi.fn();
    render(<VoteControl upVotesBy={['user-1']} downVotesBy={[]} authUserId="user-1" onVote={onVote} />);

    await user.click(screen.getByRole('button', { name: 'Setuju' }));

    expect(onVote).toHaveBeenCalledWith(0);
  });

  it('should call onVote with -1 when Tidak setuju is clicked and user has up-voted', async () => {
    const user = userEvent.setup();
    const onVote = vi.fn();
    render(<VoteControl upVotesBy={['user-1']} downVotesBy={[]} authUserId="user-1" onVote={onVote} />);

    await user.click(screen.getByRole('button', { name: 'Tidak setuju' }));

    expect(onVote).toHaveBeenCalledWith(-1);
  });
});
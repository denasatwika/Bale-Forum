/**
 * Skenario pengujian komponen LoginInput
 *
 * - komponen LoginInput
 *   - harus menampilkan nilai email sesuai yang diketik pengguna
 *   - harus menampilkan nilai kata sandi sesuai yang diketik pengguna
 *   - harus memanggil onLogin dengan email dan kata sandi ketika tombol Masuk diklik
 *   - tidak boleh memanggil onLogin ketika email dan kata sandi masih kosong
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from '../LoginInput';

describe('LoginInput component', () => {
  it('should handle email typing correctly', async () => {
    const user = userEvent.setup();
    render(<LoginInput onLogin={() => {}} />);
    const emailInput = screen.getByLabelText('Email');

    await user.type(emailInput, 'dena@example.com');

    expect(emailInput).toHaveValue('dena@example.com');
  });

  it('should handle password typing correctly', async () => {
    const user = userEvent.setup();
    render(<LoginInput onLogin={() => {}} />);
    const passwordInput = screen.getByLabelText('Kata sandi');

    await user.type(passwordInput, 'rahasia123');

    expect(passwordInput).toHaveValue('rahasia123');
  });

  it('should call onLogin with email and password when Masuk button is clicked', async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn();
    render(<LoginInput onLogin={onLogin} />);

    await user.type(screen.getByLabelText('Email'), 'dena@example.com');
    await user.type(screen.getByLabelText('Kata sandi'), 'rahasia123');
    await user.click(screen.getByRole('button', { name: 'Masuk' }));

    expect(onLogin).toHaveBeenCalledTimes(1);
    expect(onLogin).toHaveBeenCalledWith({ email: 'dena@example.com', password: 'rahasia123' });
  });

  it('should not call onLogin when email and password are still empty', async () => {
    const user = userEvent.setup();
    const onLogin = vi.fn();
    render(<LoginInput onLogin={onLogin} />);

    await user.click(screen.getByRole('button', { name: 'Masuk' }));

    expect(onLogin).not.toHaveBeenCalled();
  });
});
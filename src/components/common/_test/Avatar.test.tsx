/**
 * Skenario pengujian komponen Avatar
 *
 * - komponen Avatar
 *   - harus menampilkan gambar dengan alt text sesuai nama pengguna
 *   - harus memakai ukuran 44 piksel ketika prop size tidak diberikan
 *   - harus memakai ukuran 64 piksel ketika prop size bernilai lg
 */
import { render, screen } from '@testing-library/react';
import Avatar from '../Avatar';

describe('Avatar component', () => {
  it('should render image with alt text based on name', () => {
    render(<Avatar src="https://example.com/dena.png" name="Dena" />);

    expect(screen.getByAltText('Avatar Dena')).toBeInTheDocument();
  });

  it('should use 44px as default size when size prop is not given', () => {
    render(<Avatar src="https://example.com/dena.png" name="Dena" />);

    const avatar = screen.getByAltText('Avatar Dena');
    expect(avatar).toHaveAttribute('width', '44');
    expect(avatar).toHaveAttribute('height', '44');
  });

  it('should use 64px size when size prop is lg', () => {
    render(<Avatar src="https://example.com/dena.png" name="Dena" size="lg" />);

    const avatar = screen.getByAltText('Avatar Dena');
    expect(avatar).toHaveAttribute('width', '64');
    expect(avatar).toHaveAttribute('height', '64');
  });
});
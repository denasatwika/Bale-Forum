/**
 * Skenario pengujian komponen BanjarList
 *
 * - komponen BanjarList
 *   - harus menampilkan tombol Semua topik dan satu tombol untuk setiap kategori
 *   - harus menandai tombol Semua topik sebagai aktif ketika belum ada kategori yang dipilih
 *   - harus menandai kategori yang dipilih sebagai aktif
 *   - harus memanggil onSelect dengan nama kategori ketika kategori yang belum aktif diklik
 *   - harus memanggil onSelect dengan string kosong ketika kategori yang sedang aktif diklik
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BanjarList from '../BanjarList';

const categories = ['adat', 'kuliner', 'teknologi'];

describe('BanjarList component', () => {
  it('should render Semua topik button and one button for each category', () => {
    render(<BanjarList categories={categories} selected="" onSelect={() => {}} />);

    expect(screen.getByRole('button', { name: 'Semua topik' })).toBeInTheDocument();
    categories.forEach((category) => {
      expect(screen.getByRole('button', { name: category })).toBeInTheDocument();
    });
    expect(screen.getAllByRole('button')).toHaveLength(categories.length + 1);
  });

  it('should mark Semua topik as pressed when no category is selected', () => {
    render(<BanjarList categories={categories} selected="" onSelect={() => {}} />);

    expect(screen.getByRole('button', { name: 'Semua topik' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('should mark the selected category as pressed', () => {
    render(<BanjarList categories={categories} selected="kuliner" onSelect={() => {}} />);

    expect(screen.getByRole('button', { name: 'kuliner' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Semua topik' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('should call onSelect with the category name when an inactive category is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<BanjarList categories={categories} selected="" onSelect={onSelect} />);

    await user.click(screen.getByRole('button', { name: 'adat' }));

    expect(onSelect).toHaveBeenCalledWith('adat');
  });

  it('should call onSelect with an empty string when the active category is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<BanjarList categories={categories} selected="adat" onSelect={onSelect} />);

    await user.click(screen.getByRole('button', { name: 'adat' }));

    expect(onSelect).toHaveBeenCalledWith('');
  });
});
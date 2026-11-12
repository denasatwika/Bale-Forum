/**
 * Skenario pengujian utils/index
 *
 * - fungsi toPlainText
 *   - harus membuang tag HTML dan menyisakan teksnya
 *   - harus mengubah penutup paragraf dan <br> menjadi baris baru
 */
import { toPlainText } from '../index';

describe('toPlainText function', () => {
  it('should strip html tags and keep the text', () => {
    expect(toPlainText('<p>Halo <b>krama</b></p>')).toBe('Halo krama');
  });

  it('should convert paragraph endings and br into new lines', () => {
    expect(toPlainText('<p>Baris satu</p><p>Baris dua</p>')).toBe('Baris satu\nBaris dua');
    expect(toPlainText('a<br>b')).toBe('a\nb');
  });
});
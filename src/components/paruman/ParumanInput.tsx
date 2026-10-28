import useInput from '../../hooks/useInput';
import type { NewThreadPayload } from '../../types';

type ParumanInputProps = {
  onAddThread: (payload: NewThreadPayload) => void;
};

function ParumanInput({ onAddThread }: ParumanInputProps) {
  const [title, onTitleChange] = useInput();
  const [category, onCategoryChange] = useInput();
  const [body, onBodyChange] = useInput();

  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        onAddThread({ title, category, body });
      }}
    >
      <label htmlFor="title">
        Judul paruman
        <input id="title" type="text" value={title} onChange={onTitleChange} required />
      </label>
      <label htmlFor="category">
        Banjar (kategori)
        <input
          id="category"
          type="text"
          value={category}
          onChange={onCategoryChange}
          placeholder="contoh: react, karier, kuliah"
        />
      </label>
      <label htmlFor="body">
        Isi paruman
        <textarea id="body" rows={8} value={body} onChange={onBodyChange} required />
      </label>
      <button type="submit" className="button">Ajukan paruman</button>
    </form>
  );
}

export default ParumanInput;
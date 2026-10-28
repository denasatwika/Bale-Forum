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
      onSubmit={(event) => {
        event.preventDefault();
        onAddThread({ title, category, body });
      }}
    >
      <div className="mb-3">
        <label htmlFor="title" className="form-label fw-medium">Judul paruman</label>
        <input id="title" type="text" className="form-control" value={title} onChange={onTitleChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label fw-medium">Topik</label>
        <input
          id="category"
          type="text"
          className="form-control"
          value={category}
          onChange={onCategoryChange}
          placeholder="contoh: react, karier, kuliah"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="body" className="form-label fw-medium">Isi paruman</label>
        <textarea id="body" rows={8} className="form-control" value={body} onChange={onBodyChange} required />
      </div>
      <button type="submit" className="btn btn-primary px-4">Ajukan paruman</button>
    </form>
  );
}

export default ParumanInput;

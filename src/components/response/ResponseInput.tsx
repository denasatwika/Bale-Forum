import useInput from '../../hooks/useInput';

type ResponseInputProps = {
  onAddComment: (content: string) => Promise<boolean>;
};

function ResponseInput({ onAddComment }: ResponseInputProps) {
  const [content, onContentChange, setContent] = useInput();

  return (
    <form
      className="card border-0 shadow-sm mb-4"
      onSubmit={async (event) => {
        event.preventDefault();
        const isSuccess = await onAddComment(content);
        if (isSuccess) setContent('');
      }}
    >
      <div className="card-body p-4">
        <label htmlFor="comment" className="form-label fw-medium">Beri tanggapan</label>
        <textarea
          id="comment"
          rows={3}
          className="form-control mb-3"
          value={content}
          onChange={onContentChange}
          required
        />
        <button type="submit" className="btn btn-primary">Kirim tanggapan</button>
      </div>
    </form>
  );
}

export default ResponseInput;

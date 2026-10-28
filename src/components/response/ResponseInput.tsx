import useInput from '../../hooks/useInput';

type ResponseInputProps = {
  onAddComment: (content: string) => Promise<boolean>;
};

function ResponseInput({ onAddComment }: ResponseInputProps) {
  const [content, onContentChange, setContent] = useInput();

  return (
    <form
      className="form response-input"
      onSubmit={async (event) => {
        event.preventDefault();
        const isSuccess = await onAddComment(content);
        if (isSuccess) setContent('');
      }}
    >
      <label htmlFor="comment">
        Beri tanggapan
        <textarea id="comment" rows={3} value={content} onChange={onContentChange} required />
      </label>
      <button type="submit" className="button">Kirim tanggapan</button>
    </form>
  );
}

export default ResponseInput;
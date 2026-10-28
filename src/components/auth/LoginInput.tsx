import useInput from '../../hooks/useInput';
import type { LoginPayload } from '../../types';

type LoginInputProps = {
  onLogin: (payload: LoginPayload) => void;
};

function LoginInput({ onLogin }: LoginInputProps) {
  const [email, onEmailChange] = useInput();
  const [password, onPasswordChange] = useInput();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onLogin({ email, password });
      }}
    >
      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-medium">Email</label>
        <input className="form-control" id="email" type="email" value={email} onChange={onEmailChange} required />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label fw-medium">Kata sandi</label>
        <input
          className="form-control"
          id="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100 mt-2">Masuk</button>
    </form>
  );
}

export default LoginInput;
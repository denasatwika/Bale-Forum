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
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        onLogin({ email, password });
      }}
    >
      <label htmlFor="email">
        Email
        <input id="email" type="email" value={email} onChange={onEmailChange} required />
      </label>
      <label htmlFor="password">
        Kata sandi
        <input
          id="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          required
        />
      </label>
      <button type="submit" className="button">Masuk</button>
    </form>
  );
}

export default LoginInput;
import useInput from '../../hooks/useInput';
import type { RegisterPayload } from '../../types';

type RegisterInputProps = {
  onRegister: (payload: RegisterPayload) => void;
};

function RegisterInput({ onRegister }: RegisterInputProps) {
  const [name, onNameChange] = useInput();
  const [email, onEmailChange] = useInput();
  const [password, onPasswordChange] = useInput();

  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        onRegister({ name, email, password });
      }}
    >
      <label htmlFor="name">
        Nama
        <input id="name" type="text" value={name} onChange={onNameChange} required />
      </label>
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
          minLength={6}
          placeholder="Minimal 6 karakter"
          required
        />
      </label>
      <button type="submit" className="button">Daftar</button>
    </form>
  );
}

export default RegisterInput;
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
      onSubmit={(event) => {
        event.preventDefault();
        onRegister({ name, email, password });
      }}
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label fw-medium">Nama</label>
        <input className="form-control" id="name" type="text" value={name} onChange={onNameChange} required />
      </div>
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
          minLength={6}
          placeholder="Minimal 6 karakter"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100 mt-2">Daftar</button>
    </form>
  );
}

export default RegisterInput;
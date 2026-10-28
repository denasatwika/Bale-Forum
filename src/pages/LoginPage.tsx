import { Link } from 'react-router-dom';
import LoginInput from '../components/auth/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';
import { useAppDispatch } from '../states/hooks';
import type { LoginPayload } from '../types';

function LoginPage() {
  const dispatch = useAppDispatch();

  const onLogin = ({ email, password }: LoginPayload) => {
    dispatch(asyncSetAuthUser(email, password));
  };

  return (
    <section className="page page--auth">
      <h2>Rahajeng rauh</h2>
      <p>Masuk untuk ikut bermusyawarah di Balé.</p>
      <LoginInput onLogin={onLogin} />
      <p>
        Belum menjadi krama?
        {' '}
        <Link to="/daftar">Daftar di sini</Link>
      </p>
    </section>
  );
}

export default LoginPage;
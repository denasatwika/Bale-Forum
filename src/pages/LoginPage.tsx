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
    <section className="row justify-content-center">
      <div className="col-sm-10 col-md-7 col-lg-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-md-5">
            <h1 className="font-serif fw-bold display-6">Rahajeng rauh</h1>
            <p className="text-body-secondary mb-4">Masuk untuk ikut bermusyawarah di Balé.</p>
            <LoginInput onLogin={onLogin} />
          </div>
          <div className="card-footer bg-transparent text-center py-3 small">
            Belum menjadi krama?
            {' '}
            <Link to="/daftar">Daftar di sini</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;

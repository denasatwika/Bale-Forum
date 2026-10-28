import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/auth/RegisterInput';
import { useAppDispatch } from '../states/hooks';
import { asyncRegisterUser } from '../states/user/action';
import type { RegisterPayload } from '../types';

function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onRegister = async (payload: RegisterPayload) => {
    const isSuccess = await dispatch(asyncRegisterUser(payload));
    if (isSuccess) navigate('/masuk');
  };

  return (
    <section className="row justify-content-center">
      <div className="col-sm-10 col-md-7 col-lg-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-md-5">
            <h1 className="font-serif fw-bold display-6">Menjadi Krama Balé</h1>
            <p className="text-body-secondary mb-4">Daftar untuk mengajukan dan menanggapi paruman.</p>
            <RegisterInput onRegister={onRegister} />
          </div>
          <div className="card-footer bg-transparent text-center py-3 small">
            Sudah terdaftar?
            {' '}
            <Link to="/masuk">Masuk di sini</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;

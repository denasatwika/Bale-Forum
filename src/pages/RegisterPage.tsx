import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/auth/RegisterInput';
import { useAppDispatch } from '../states/hooks';
import { asyncRegisterUser } from '../states/user/action';
import type { RegisterPayload } from '../types';


function DaftarPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onRegister = async (payload: RegisterPayload) => {
    const isSuccess = await dispatch(asyncRegisterUser(payload));
    if (isSuccess) navigate('/masuk');
  };

  return (
    <section className="daftar-page">
      <h2>Menjadi Krama Balé</h2>
      <RegisterInput onRegister={onRegister} />
      <p>
        Sudah terdaftar?
        {' '}
        <Link to="/masuk">Masuk di sini</Link>
      </p>
    </section>
  );
}

export default DaftarPage;
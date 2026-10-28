import { Link, useNavigate } from 'react-router-dom';
import ParumanInput from '../components/paruman/ParumanInput';
import { useAppDispatch } from '../states/hooks';
import { asyncAddThread } from '../states/threads/action';
import type { NewThreadPayload } from '../types';

function ParumanBaruPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onAddThread = async (payload: NewThreadPayload) => {
    const isSuccess = await dispatch(asyncAddThread(payload));
    if (isSuccess) navigate('/');
  };

  return (
    <section className="row justify-content-center">
      <div className="col-lg-8">
        <Link to="/" className="d-inline-block mb-3 text-decoration-none">← Kembali ke paruman</Link>
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-md-5">
            <h1 className="font-serif fw-bold display-6">Ajukan paruman baru</h1>
            <p className="text-body-secondary mb-4">Sampaikan topik yang ingin dimusyawarahkan bersama krama.</p>
            <ParumanInput onAddThread={onAddThread} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ParumanBaruPage;

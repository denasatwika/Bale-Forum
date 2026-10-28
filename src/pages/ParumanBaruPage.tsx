import { useNavigate } from 'react-router-dom';
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
    <section className="page page--narrow">
      <h2>Ajukan paruman baru</h2>
      <p>Sampaikan topik yang ingin dimusyawarahkan bersama krama.</p>
      <ParumanInput onAddThread={onAddThread} />
    </section>
  );
}

export default ParumanBaruPage;
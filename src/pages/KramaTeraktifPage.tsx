import { useEffect } from 'react';
import PrasastiItem from '../components/krama/PrasastiItem';
import { useAppDispatch, useAppSelector } from '../states/hooks';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function KramaTeraktifPage() {
  const leaderboards = useAppSelector((state) => state.leaderboards);
  const authUser = useAppSelector((state) => state.authUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <section className="page page--narrow">
      <h2>Krama Teraktif</h2>
      <p>Prasasti para krama yang paling aktif bermusyawarah.</p>
      <ol className="prasasti">
        <li className="prasasti__head">
          <span>Krama</span>
          <span>Skor</span>
        </li>
        {leaderboards.map((leaderboard, index) => (
          <PrasastiItem
            key={leaderboard.user.id}
            leaderboard={leaderboard}
            rank={index + 1}
            isAuthUser={leaderboard.user.id === authUser?.id}
          />
        ))}
      </ol>
    </section>
  );
}

export default KramaTeraktifPage;
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
    <section className="row justify-content-center">
      <div className="col-lg-8">
        <h1 className="font-serif fw-bold display-5">Krama Teraktif</h1>
        <p className="text-body-secondary mb-4">Prasasti para krama yang paling aktif bermusyawarah.</p>
        <div className="card border-0 shadow-sm overflow-hidden">
          <div className="card-header bg-dark text-white-50 d-flex justify-content-between small text-uppercase py-3 px-4">
            <span>Krama</span>
            <span>Skor</span>
          </div>
          <ol className="list-group list-group-flush mb-0">
            {leaderboards.map((leaderboard, index) => (
              <PrasastiItem
                key={leaderboard.user.id}
                leaderboard={leaderboard}
                rank={index + 1}
                isAuthUser={leaderboard.user.id === authUser?.id}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default KramaTeraktifPage;

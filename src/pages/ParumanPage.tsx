import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BanjarList from '../components/banjar/BanjarList';
import ParumanList from '../components/paruman/ParumanList';
import { useAppDispatch, useAppSelector } from '../states/hooks';
import asyncPopulateUsersAndThreads from '../states/shared/action';
import { asyncToggleVoteThread } from '../states/threads/action';
import type { VoteType } from '../types';
import { getCategoryLabel } from '../utils';

function ParumanPage() {
  const threads = useAppSelector((state) => state.threads);
  const users = useAppSelector((state) => state.users);
  const authUser = useAppSelector((state) => state.authUser);
  const dispatch = useAppDispatch();
  const [selectedBanjar, setSelectedBanjar] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categories = [...new Set(threads.map((thread) => getCategoryLabel(thread.category)))];

  const threadList = threads
    .filter((thread) => !selectedBanjar || getCategoryLabel(thread.category) === selectedBanjar)
    .map((thread) => ({
      ...thread,
      owner: users.find((user) => user.id === thread.ownerId),
    }));

  const onVote = (threadId: string, voteType: VoteType) => {
    dispatch(asyncToggleVoteThread(threadId, voteType));
  };

  return (
    <section className="row justify-content-center">
      <div className="col-lg-9">
        <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
          <div>
            <p className="small fw-semibold text-uppercase text-primary mb-1" style={{ letterSpacing: '0.2em' }}>
              Paruman yang sedang berlangsung
            </p>
            <h1 className="font-serif fw-bold display-5 mb-1">Paruman</h1>
            <p className="text-body-secondary mb-0">Ruang musyawarah krama. Pilih topik untuk menyaring paruman.</p>
          </div>
          {authUser && (
            <Link to="/paruman/baru" className="btn btn-primary rounded-pill px-4 shadow-sm">
              + Paruman baru
            </Link>
          )}
        </div>
        <div className="mb-4">
          <BanjarList
            categories={categories}
            selected={selectedBanjar}
            onSelect={setSelectedBanjar}
          />
        </div>
        <ParumanList threads={threadList} authUserId={authUser?.id} onVote={onVote} />
      </div>
    </section>
  );
}

export default ParumanPage;
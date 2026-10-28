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
    <section className="page">
      <div className="page__header">
        <div>
          <h2>Paruman</h2>
          <p>Ruang musyawarah krama. Pilih banjar untuk menyaring paruman.</p>
        </div>
        {authUser && (
          <Link to="/paruman/baru" className="button">+ Paruman baru</Link>
        )}
      </div>
      <BanjarList
        categories={categories}
        selected={selectedBanjar}
        onSelect={setSelectedBanjar}
      />
      <ParumanList threads={threadList} authUserId={authUser?.id} onVote={onVote} />
    </section>
  );
}

export default ParumanPage;
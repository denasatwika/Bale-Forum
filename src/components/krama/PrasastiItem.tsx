import type { Leaderboard } from '../../types';
import Avatar from '../common/Avatar';

type PrasastiItemProps = {
  leaderboard: Leaderboard;
  rank: number;
  isAuthUser: boolean;
};

const medals: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

function PrasastiItem({ leaderboard, rank, isAuthUser }: PrasastiItemProps) {
  const { user, score } = leaderboard;

  return (
    <li className={`list-group-item d-flex align-items-center gap-3 py-3 ${isAuthUser ? 'list-group-item-warning' : ''}`}>
      <span className="font-serif fw-bold fs-4 text-center text-body-secondary" style={{ width: '2rem' }}>
        {medals[rank] ?? rank}
      </span>
      <Avatar src={user.avatar} name={user.name} />
      <span className="flex-grow-1 fw-medium">
        {user.name}
        {isAuthUser && <span className="badge text-bg-dark ms-2">Anda</span>}
      </span>
      <span className="badge rounded-pill text-bg-primary fs-6">{score}</span>
    </li>
  );
}

export default PrasastiItem;

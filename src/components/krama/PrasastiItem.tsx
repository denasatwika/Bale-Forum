import type { Leaderboard } from '../../types';
import Avatar from '../common/Avatar';

type PrasastiItemProps = {
  leaderboard: Leaderboard;
  rank: number;
  isAuthUser: boolean;
};

function PrasastiItem({ leaderboard, rank, isAuthUser }: PrasastiItemProps) {
  const { user, score } = leaderboard;

  return (
    <li className={`prasasti-item ${rank <= 3 ? `prasasti-item--top${rank}` : ''}`}>
      <span className="prasasti-item__rank">{rank}</span>
      <Avatar src={user.avatar} name={user.name} />
      <span className="prasasti-item__name">
        {user.name}
        {isAuthUser && <em> (Anda)</em>}
      </span>
      <span className="prasasti-item__score">{score}</span>
    </li>
  );
}

export default PrasastiItem;
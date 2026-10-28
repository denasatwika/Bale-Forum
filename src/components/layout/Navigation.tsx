import { Link, NavLink } from 'react-router-dom';
import type { User } from '../../types';
import Avatar from '../common/Avatar';

type NavigationProps = {
  authUser: User | null;
  onLogout: () => void;
};

function Navigation({ authUser, onLogout }: NavigationProps) {
  return (
    <header className="navigation">
      <div className="navigation__inner">
        <Link to="/" className="navigation__brand">
          Balé
          <small>ruang paruman krama</small>
        </Link>
        <nav className="navigation__links">
          <NavLink to="/" end>Paruman</NavLink>
          <NavLink to="/krama-teraktif">Krama Teraktif</NavLink>
          {authUser ? (
            <div className="navigation__user">
              <Avatar src={authUser.avatar} name={authUser.name} size="sm" />
              <button type="button" className="button button--ghost" onClick={onLogout}>
                Keluar
              </button>
            </div>
          ) : (
            <NavLink to="/masuk">Masuk</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
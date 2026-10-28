import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import type { User } from '../../types';
import Avatar from '../common/Avatar';

type NavigationProps = {
  authUser: User | null;
  onLogout: () => void;
};

const navLinkClass = ({ isActive }: { isActive: boolean }) => (
  `nav-link ${isActive ? 'active text-prada' : ''}`
);

function Navigation({ authUser, onLogout }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-baseline gap-2" onClick={close}>
            <span className="font-serif fs-2 fw-bold text-prada">Balé</span>
            <small className="d-none d-sm-inline text-white-50 fs-6">ruang paruman krama</small>
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            aria-controls="mainNav"
            aria-expanded={isOpen}
            aria-label="Buka menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div id="mainNav" className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto align-items-md-center gap-md-2">
              <li className="nav-item">
                <NavLink to="/" end className={navLinkClass} onClick={close}>Paruman</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/krama-teraktif" className={navLinkClass} onClick={close}>
                  Krama Teraktif
                </NavLink>
              </li>
              {authUser ? (
                <li className="nav-item d-flex align-items-center gap-2 ms-md-3 py-2 py-md-0">
                  <Avatar src={authUser.avatar} name={authUser.name} size="sm" />
                  <span className="text-white-50 small d-md-none">{authUser.name}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-light"
                    onClick={() => {
                      close();
                      onLogout();
                    }}
                  >
                    Keluar
                  </button>
                </li>
              ) : (
                <li className="nav-item ms-md-2 py-2 py-md-0">
                  <Link to="/masuk" className="btn btn-sm btn-warning fw-semibold" onClick={close}>
                    Masuk
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="poleng-strip" aria-hidden="true" />
    </header>
  );
}

export default Navigation;

import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loading from './components/common/Loading';
import Navigation from './components/layout/Navigation';
import DetailParumanPage from './pages/DetailParumanPage';
import KramaTeraktifPage from './pages/KramaTeraktifPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ParumanBaruPage from './pages/ParumanBaruPage';
import ParumanPage from './pages/ParumanPage';
import RegisterPage from './pages/RegisterPage';
import { asyncUnsetAuthUser } from './states/authUser/action';
import { useAppDispatch, useAppSelector } from './states/hooks';
import { asyncPreloadProcess } from './states/isPreload/action';

function App() {
  const authUser = useAppSelector((state) => state.authUser);
  const isPreload = useAppSelector((state) => state.isPreload);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return <Loading />;
  }

  return (
    <>
      <Loading />
      <Navigation authUser={authUser} onLogout={onLogout} />
      <main className="main">
        <Routes>
          <Route path="/" element={<ParumanPage />} />
          <Route
            path="/paruman/baru"
            element={authUser ? <ParumanBaruPage /> : <Navigate to="/masuk" replace />}
          />
          <Route path="/paruman/:id" element={<DetailParumanPage />} />
          <Route path="/krama-teraktif" element={<KramaTeraktifPage />} />
          <Route
            path="/masuk"
            element={authUser ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
            path="/daftar"
            element={authUser ? <Navigate to="/" replace /> : <RegisterPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
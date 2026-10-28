import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="page page--narrow">
      <h2>Halaman tidak ditemukan</h2>
      <Link to="/">Kembali ke paruman</Link>
    </section>
  );
}

export default NotFoundPage;
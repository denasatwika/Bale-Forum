import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="text-center py-5">
      <p className="font-serif display-1 fw-bold text-primary mb-0">404</p>
      <h1 className="h3 mb-3">Halaman tidak ditemukan</h1>
      <Link to="/" className="btn btn-primary">Kembali ke paruman</Link>
    </section>
  );
}

export default NotFoundPage;

import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Todos</Link>
      <Link to="/category/terror" style={{ marginRight: '1rem' }}>Terror</Link>
      <Link to="/category/sobrenatural">Sobrenatural</Link>
    </nav>
  );
}

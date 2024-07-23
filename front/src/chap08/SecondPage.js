import { Link } from 'react-router-dom';

export default function SecondPage() {
  return (
    <>
      <h2>SecondPage</h2>
      <hr />
      <p style={{ height: 800 }}></p>
      <p><Link to="/">Firstページへ</Link></p>
    </>
  );
}
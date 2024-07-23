import { Link, Outlet } from 'react-router-dom';

export default function RouterApp() {
  return (
    <>
      <ul>
        <li><Link to="/">ログイン</Link></li>
        <li><Link to="/article">Rest API</Link></li>
        <li><Link to="/about">-</Link></li>
        {/* <li><Link to="/about" replace>このサイトについて</Link></li> */}
        <li><Link to="/article/info">-</Link></li>
      </ul>
      <hr />
      <Outlet />
    </>
  );
}

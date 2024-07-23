import { Outlet } from 'react-router-dom';
import { MyLink } from './MyLink';

export default function RouterCustom() {
  return (
    <>
      <ul>
        <li><MyLink to="/">トップ</MyLink></li>
        <li><MyLink to="/article">公開記事</MyLink></li>
        <li><MyLink to="/about">このサイトについて</MyLink></li>
      </ul>
      <hr />
      <Outlet />
    </>
  );
}
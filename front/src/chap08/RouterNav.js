import { NavLink, Outlet } from 'react-router-dom';
import './RouterNav.css';

// const isCurrent = ({ isActive, isPending }) => isActive ? 'active' : '';

// const isCurrent = ({ isActive }) => isActive ? {
//   color: 'Red',
//   fontWeight: 'bold'
// } : {};

export default function RouterNav() {
  return (
    <>
      <ul>
        <li><NavLink to="/">トップ</NavLink></li>
        <li><NavLink to="/article">公開記事</NavLink></li>
        <li><NavLink to="/about">このサイトについて</NavLink></li>

        {/* <li><NavLink className={isCurrent} to="/">トップ</NavLink></li>
        <li><NavLink className={isCurrent} to="/article">公開記事</NavLink></li>
        <li><NavLink className={isCurrent} to="/about">このサイトについて</NavLink></li> */}

        {/* <li><NavLink style={isCurrent} to="/">トップ</NavLink></li>
        <li><NavLink style={isCurrent} to="/article">公開記事</NavLink></li>
        <li><NavLink style={isCurrent} to="/about">このサイトについて</NavLink></li> */}
      </ul>
      <hr />
      <Outlet />
    </>
  );
}

import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import RouterCustom from './RouterCustom';
import TopPage from './TopPage';
import ArticlePage from './ArticlePage';
import AboutPage from './AboutPage';

const routesMyLink = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RouterCustom />}>
      <Route path="/" element={<TopPage />} />
      <Route path="/article" element={<ArticlePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Route>
  )
);

export default routesMyLink;
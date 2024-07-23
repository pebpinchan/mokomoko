import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import TopPage from './TopPage';
import ArticlePage from './ArticlePage';
import AboutPage from './AboutPage';
import InfoPage from './InfoPage';

const routesLink = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<ArticlePage />} />
      <Route path="/login" element={<TopPage />} />
      <Route path="/article/info" element={<InfoPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Route>
  )
);

export default routesLink;

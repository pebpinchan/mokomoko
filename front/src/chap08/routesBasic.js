import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import TopPage from './TopPage';
import ArticlePage from './ArticlePage';
import AboutPage from './AboutPage';

// const routesBasic = createBrowserRouter([
//   { path: '/', element: <TopPage /> },
//   { path: '/article', element: <ArticlePage /> },
//   { path: '/about', element: <AboutPage /> },
// ]);

const routesBasic = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<TopPage />} />
      <Route path="/article" element={<ArticlePage />} />
      <Route path="/about" element={<AboutPage />} />
    </>
  )
);

export default routesBasic;
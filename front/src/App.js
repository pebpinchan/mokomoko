import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TopPage from './chap08/TopPage';
import ArticlePage from './chap08/ArticlePage';
import AboutPage from './chap08/AboutPage';
import InfoPage from './chap08/InfoPage';
import DataList from './chap08/DataList';

function App() {
  return (
    <BrowserRouter>
      <>        
        <Routes>
          <Route path="/login" element={<TopPage />} />
          <Route path="/list" element={<DataList />} />
          <Route path="/graph" element={<ArticlePage />} />
          <Route path="/map" element={<InfoPage />} />
          <Route path="/" element={<AboutPage />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css'; // choose your theme
import 'react-loading-skeleton/dist/skeleton.css'
toastConfig({ theme: 'dark' });
toastConfig({ maxVisibleToasts: 1 });


function App() {
  return (
    <div className='main_container'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;

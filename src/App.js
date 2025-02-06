import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/light.css'; // choose your theme
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios';
toastConfig({ theme: 'light', maxVisibleToasts: 1, className: "react-simple-toast" });

console.log('test branch... from tashaf_dev')
function App() {
  axios.defaults.headers.common[process.env.REACT_APP_DEFAULT_HEADER] = process.env.REACT_APP_HEADER_KEY;

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

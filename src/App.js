import './App.css';
import Register from './page/register';
import Login from './page/login';
import Home from './page/home';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<page not Found />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

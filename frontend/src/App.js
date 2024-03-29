import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <>
    <Header/> 
    
      <div className='container'>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register />}/>
        </Routes>
      </div>
      <ToastContainer/>
    </>
  );
}

export default App;

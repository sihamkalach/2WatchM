import React from 'react';
import { BrowserRouter,Routes, Route ,Navigate} from 'react-router-dom';
import Home from './components/Home';
import Genres from './components/Genres';
import About from './components/About';
import Contact from './components/Contact';
import PageNotFound from './components/PageNotFound';
import Movies from './components/Movies';
import ProductDetail from "./components/ProductDetail";
import AuthPage from './components/AuthPage';
import { useAuth } from './auth';
import RedirectGoogleAuth from "./components/GoogleRedirectHandler";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
function App() {
  const {isAuthorized} = useAuth()
  const ProtectedLogin = () => {
    return isAuthorized ? <Navigate to='/dashboard' /> : <AuthPage initialMethod='login' />
  }
  const ProtectedRegister = () => {
    return isAuthorized ? <Navigate to='/' /> : <AuthPage initialMethod='register' />
  }
  return (
    <>
    <BrowserRouter>
    <ToastContainer /> 
    <Routes>
        <Route path="/login/callback" element={<RedirectGoogleAuth />} />
        <Route path="/login" element={<ProtectedLogin />}/>
        <Route path="/register" element={<ProtectedRegister />}/>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/dashboard' element={isAuthorized ? <Dashboard/> : <Navigate to='/login' /> }></Route>
        <Route path='/genres' element={<Genres></Genres>}></Route>
        <Route path="/movies/:categoryName" element={<Movies></Movies>} />
        <Route path='/movies' element={<Movies></Movies>}></Route>
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path='/about'element={<About></About>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

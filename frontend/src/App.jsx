import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/HomePage/Home';
import Header from './layout/Header/';
import Footer from './layout/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Detail from './pages/DetailPage/Detail';
import Products from './pages/ProductsPage/Products';
import Auth from './pages/AuthPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { profile } from './redux/userSlice';
import Profile from './pages/ProfilePage/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.user);
  // const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="/forgot" element={<ForgotPassword />} />
        <Route exact path="/reset/:token" element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route exact path="/profile" element={<Profile />} />
        </Route>
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/product/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

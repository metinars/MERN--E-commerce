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
import Cart from './pages/CartPage/Cart';
import Admin from './pages/AdminPage/Admin';

function App() {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.user);

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
        <Route exact path="/cart" element={<Cart />} />

        <Route element={<ProtectedRoute isAdmin={false} />}>
          <Route exact path="/profile" element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route exact path="/admin" element={<Admin />} />
        </Route>

        <Route exact path="/products" element={<Products />} />
        <Route exact path="/product/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

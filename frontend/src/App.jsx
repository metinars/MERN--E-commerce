import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/HomePage/Home';
import Header from './layout/Header/';
import Footer from './layout/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Detail from './pages/DetailPage/Detail';
import Products from './pages/ProductsPage/Products';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/product/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

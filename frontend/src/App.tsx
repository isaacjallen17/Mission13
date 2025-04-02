import './App.css';
import { CartProvider } from './context/CartContext';
import AdminPage from './pages/AdminPage';
import Cart from './pages/Cart';
import MainPage from './pages/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;

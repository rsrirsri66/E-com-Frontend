import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Homepage';
import Cart from './Cart';
import { CartProvider } from './CartContext';
import OrderHistory from './OrderHistory';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import ProductManagement from './ProductForm';
import PrivateRoute from "./PrivateRoute";
function App() {
  return (
    <CartProvider>
    <Router>
     <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='signup' element={<SignupPage />} />
      <Route path='/products' element={<PrivateRoute><ProductManagement /></PrivateRoute>} />
      <Route
          path="/home"
          element={
              <Home />
          }
        />
     <Route path="/cart" element={<Cart />} />
     <Route path='/order-history' element={<OrderHistory />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;

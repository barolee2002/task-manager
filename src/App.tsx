/* eslint-disable import/order */
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom';

import SignIn from 'Pages/SignIn';
import SignUp from 'Pages/SignUp';
import './app.scss';
import Account from 'Pages/Account';
import PrivateRoute from 'router/PrivateRouter';
import Home from 'Pages/Home';
import ProductDetail from 'Pages/ProductDetail';
import Cart from 'Pages/Cart';
export default function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path={'' || '/admin'} element={<Navigate to="/admin/home" />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/admin/home" element={<Home />} />
          <Route path="/admin/home/product/:id" element={<ProductDetail />} />
          <Route path="/admin/account/:id" element={<PrivateRoute>
            <Account />
          </PrivateRoute>} />
          <Route path="/admin/cart/:id" element={<PrivateRoute>
            <Cart />
          </PrivateRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

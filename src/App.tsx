/* eslint-disable import/order */
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom';

import SignIn from 'Pages/SignIn';
import SignUp from 'Pages/SignUp';
import './app.scss';
import Account from 'Pages/Account';
import PrivateRoute from 'router/PrivateRouter';
import DashBoard from 'Pages/DashBoard';
export default function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path={'' || '/admin'} element={<Navigate to="/sign-in" />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/admin/dashboard" element={<PrivateRoute>
            <DashBoard />
          </PrivateRoute>} />
          <Route path="/admin/account/:id" element={<PrivateRoute>
            <Account />
          </PrivateRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

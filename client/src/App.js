

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import './resources/global.css'
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';
import Loader from './components/Loader';
import AdminHome from './pages/Admin/AdminHome';
import AdminBuses from './pages/Admin/AdminBuses';
import AdminUsers from './pages/Admin/AdminUsers';
import BookNow from './pages/BookNow';
import Bookings from './pages/Bookings';

function App() {
  const { loading } = useSelector(state => state.alerts)
  return (

    <div>
      {loading && <Loader />}

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

          <Route path="/admin/buses" element={<ProtectedRoute><AdminBuses /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/book-now/:id" element={<ProtectedRoute><BookNow /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;

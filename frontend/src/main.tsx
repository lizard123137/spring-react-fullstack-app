import { BrowserRouter, Route, Routes } from 'react-router';
import ReactDOM from 'react-dom/client';

import { AuthProvider } from './context/AuthProvider';
import { ThemeProvider } from './context/ThemeProvider';

import ProtectedRoute from './helpers/ProtectedRoute';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';

import './index.css';
import Layout from './pages/Layout';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route index element={<Home />} />
        
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<Layout />}>
            <Route path="/users">
              <Route path=":id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Route>

            <Route path="/chat/:id" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          </Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);

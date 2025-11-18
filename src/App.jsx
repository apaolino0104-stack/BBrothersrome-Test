import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import ProprietariDashboard from './pages/ProprietariDashboard';
import OspitiDashboard from './pages/OspitiDashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/servizi" element={<Services />} />
          <Route
            path="/proprietari"
            element={(
              <ProtectedRoute role="proprietario">
                <ProprietariDashboard />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/ospiti"
            element={(
              <ProtectedRoute role="ospite">
                <OspitiDashboard />
              </ProtectedRoute>
            )}
          />
          <Route path="*" element={<p>Pagina non trovata</p>} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;

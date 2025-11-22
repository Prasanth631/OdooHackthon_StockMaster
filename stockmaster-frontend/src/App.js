import React, { useState, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';
import AppRoutes from './routes/AppRoutes';

const AppLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If not authenticated, render routes without layout
  if (!isAuthenticated) {
    return <AppRoutes />;
  }

  // Authenticated layout
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
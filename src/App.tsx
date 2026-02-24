import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ScrollToTop } from './components/ScrollToTop';
import { Login } from './pages/Login';
import { List } from './pages/List';
import { Details } from './pages/Details';
import { PhotoResult } from './pages/PhotoResult';
import { BarChart } from './pages/BarChart';
import { MapView } from './pages/MapView';
import { EmployeeProvider } from './context/EmployeeContext';

function App() {
  return (
    <EmployeeProvider>
      <div className="app-shell">
        <ScrollToTop />
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Navigate to="/list" replace />} />
              <Route path="/list" element={<List />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/photo" element={<PhotoResult />} />
              <Route path="/chart" element={<BarChart />} />
              <Route path="/map" element={<MapView />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </EmployeeProvider>
  );
}

export default App;


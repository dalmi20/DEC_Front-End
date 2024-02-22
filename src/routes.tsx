import { Routes, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard/dashboard';

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    )
}

export default MainRoutes;
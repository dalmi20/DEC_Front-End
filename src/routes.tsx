import { Routes, Route } from 'react-router-dom';
import App from './App';
import Model from './pages/Model/model';

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/model" element={<Model />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    )
}

export default MainRoutes;
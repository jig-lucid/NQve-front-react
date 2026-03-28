// src/App.tsx
import { Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './pages/login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
       <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;

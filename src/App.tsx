// src/App.tsx
import { Routes, Route, Navigate} from 'react-router';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
       <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;

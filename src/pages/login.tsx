// src/pages/LoginPage.tsx
import '../styles/LoginPage.css';
import { Link } from 'react-router-dom'

export default function LoginPage() {
    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/oauth2/authorization/google`;
      };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="logo">NQve</h1>
        <input type="email" placeholder="이메일 주소" className="login-input" />
        <input type="password" placeholder="비밀번호" className="login-input" />
        <button className="login-button">로그인</button>

        <div className="divider">
          <span>또는</span>
        </div>

        <button className="google-button" onClick={handleGoogleLogin} >Google로 로그인</button>

        <div className="forgot-password">
          <a href="#">비밀번호를 잊으셨나요?</a>
        </div>
        <div className="signup-link">
                  <span>계정이 없으신가요? </span>
                  <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
}
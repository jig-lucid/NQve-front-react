// src/pages/Page.tsx
import {Link, useNavigate} from 'react-router'
import {FormEvent, useState, useEffect} from "react";
import { getCsrfHeaders } from '../api/csrf';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(false);

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrorMessage('이메일을 입력해주세요.');
      return;
    }

    if (trimmedEmail.length > 100) {
      setErrorMessage('이메일은 100자 이하로 입력해주세요.');
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setErrorMessage('올바른 이메일 형식으로 입력해주세요.');
      return;
    }

    if (!password) {
      setErrorMessage('비밀번호를 입력해주세요.');
      return;
    }

    if (password.length < 8 || password.length > 64) {
      setErrorMessage('비밀번호는 8자 이상 64자 이하로 입력해주세요.');
      return;
    }

    if (/\s/.test(password)) {
      setErrorMessage('비밀번호에는 공백을 사용할 수 없습니다.');
      return;
    }

    if (!/[A-Za-z]/.test(password)) {
      setErrorMessage('비밀번호에는 영문이 포함되어야 합니다.');
      return;
    }

    if (!/\d/.test(password)) {
      setErrorMessage('비밀번호에는 숫자가 포함되어야 합니다.');
      return;
    }

    try {
      setIsSubmitting(true);
      const csrfHeaders = await getCsrfHeaders();

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...csrfHeaders,
        },
        body: JSON.stringify({
          email: email.trim(),
          password
        }),
      });

      if (!response.ok) {
        throw new Error(response.status === 401
          ? '이메일 또는 비밀번호를 확인해주세요.'
          : '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }else{
        navigate('/main');
      }

    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(()=>{
    const savedEmail = localStorage.getItem('savedEmail');
    const savedRememberEmail = localStorage.getItem('rememberEmail') === 'true';

    setRememberEmail(savedRememberEmail);

    if(savedEmail && isValidEmail(savedEmail)){
      setEmail(savedEmail);
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem('rememberEmail',String(rememberEmail));

    if(rememberEmail && email && isValidEmail(email))
      localStorage.setItem('savedEmail',email);
    else
      localStorage.removeItem('savedEmail');
  },[email, rememberEmail]);

  const handleGoogleLogin = () => {
    /*window.location.href = `${import.meta.env.VITE_BACKEND_URL}/oauth2/authorization/google`;*/
    alert('백엔드 연결 전');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-50 px-4">
      <div className="flex w-full max-w-[350px] flex-col gap-4 rounded-xl bg-white px-[30px] py-10 text-center shadow-[0_0_12px_rgba(0,0,0,0.08)]">
        <h1 className="mb-6 text-[32px] font-extrabold text-zinc-950">NQve</h1>

        <form noValidate className="mt-8 flex flex-col gap-4 text-left" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(event)=> setEmail(event.target.value)}
          placeholder="이메일 주소"
          className="mb-3 w-full rounded-md border border-zinc-300 px-3 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
        />
        <input
          type="password"
          value={password}
          onChange={(event)=> setPassword(event.target.value)}
          placeholder="비밀번호"
          className="mb-3 w-full rounded-md border border-zinc-300 px-3 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
        />

          <label className="flex items-center gap-2 text-sm text-zinc-600">
            <input
                type="checkbox"
                checked={rememberEmail}
                onChange={(e) => setRememberEmail(e.target.checked)}
            />
            이메일 기억하기
          </label>


          {errorMessage && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-center text-sm font-medium text-red-600">
                {errorMessage}
              </p>
          )}

        <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full cursor-pointer rounded-md bg-black px-3 py-3 font-semibold text-white transition hover:bg-zinc-800">
          {isSubmitting ? '로그인 중...' : '로그인'}
        </button>
      </form>

        <div className="my-4 flex items-center gap-3 text-sm text-zinc-500">
          <div className="h-px flex-1 bg-zinc-300" />
          <span>또는</span>
          <div className="h-px flex-1 bg-zinc-300" />
        </div>

        <button
          className="w-full cursor-pointer rounded-md bg-[#db4437] px-3 py-3 font-semibold text-white transition hover:bg-[#c63d31]"
          onClick={handleGoogleLogin}
        >
          Google로 로그인
        </button>

        <div className="mt-4 text-sm">
          <a href="#" className="text-[#0066cc] no-underline hover:underline">
            비밀번호를 잊으셨나요?
          </a>
        </div>

        <div className="mt-3 text-center text-sm text-zinc-700">
          <span>계정이 없으신가요? </span>
          <Link to="/signup" className="font-bold text-[#3897f0] no-underline hover:underline">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

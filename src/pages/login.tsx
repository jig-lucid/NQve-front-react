// src/pages/LoginPage.tsx
import { Link } from 'react-router'

export default function LoginPage() {
  const handleGoogleLogin = () => {
    /*window.location.href = `${import.meta.env.VITE_BACKEND_URL}/oauth2/authorization/google`;*/
    alert('백엔드 연결 전');
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-50 px-4">
      <div className="flex w-full max-w-[350px] flex-col gap-4 rounded-xl bg-white px-[30px] py-10 text-center shadow-[0_0_12px_rgba(0,0,0,0.08)]">
        <h1 className="mb-6 text-[32px] font-extrabold text-zinc-950">NQve</h1>

        <input
          type="email"
          placeholder="이메일 주소"
          className="mb-3 w-full rounded-md border border-zinc-300 px-3 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="mb-3 w-full rounded-md border border-zinc-300 px-3 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
        />
        <button className="mt-2 w-full cursor-pointer rounded-md bg-black px-3 py-3 font-semibold text-white transition hover:bg-zinc-800">
          로그인
        </button>

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

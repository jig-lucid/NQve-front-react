import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router';

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    const trimmedEmail = email.trim();
    const trimmedNickname = nickname.trim();

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

    if (!trimmedNickname) {
      setErrorMessage('닉네임을 입력해주세요.');
      return;
    }

    if (trimmedNickname.length < 2 || trimmedNickname.length > 20) {
      setErrorMessage('닉네임은 2자 이상 20자 이하로 입력해주세요.');
      return;
    }

    if (!/^[가-힣A-Za-z0-9_]+$/.test(trimmedNickname)) {
      setErrorMessage('닉네임은 한글, 영문, 숫자, _만 사용할 수 있습니다.');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
          nickname: nickname.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('회원가입에 실패했습니다.');
      }

      navigate('/login');
    } catch {
      setErrorMessage('회원가입에 실패했습니다. 입력값을 확인해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-50 px-4">
      <div className="flex w-full max-w-[380px] flex-col rounded-xl bg-white px-[30px] py-10 text-center shadow-[0_0_12px_rgba(0,0,0,0.08)]">
        <h1 className="text-[32px] font-extrabold text-zinc-950">NQve</h1>
        <p className="mt-3 text-sm text-zinc-500">계정을 만들고 NQve를 시작하세요.</p>

        <form noValidate className="mt-8 flex flex-col gap-4 text-left" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-800">
            이메일
            <input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="이메일 주소"
              maxLength={100}
              className="w-full rounded-md border border-zinc-300 px-3 py-3 text-sm font-normal outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-800">
            비밀번호
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호"
              minLength={8}
              maxLength={64}
              className="w-full rounded-md border border-zinc-300 px-3 py-3 text-sm font-normal outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-800">
            닉네임
            <input
              type="text"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              placeholder="닉네임"
              maxLength={20}
              className="w-full rounded-md border border-zinc-300 px-3 py-3 text-sm font-normal outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-200"
            />
          </label>

          {errorMessage && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-center text-sm font-medium text-red-600">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full cursor-pointer rounded-md bg-black px-3 py-3 font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
          >
            {isSubmitting ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-700">
          <span>이미 계정이 있으신가요? </span>
          <Link to="/login" className="font-bold text-[#3897f0] no-underline hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}

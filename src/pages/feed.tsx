import PostCard from '../components/PostCard';

// 지금은 직접 작성한 배열을 사용해요. 나중에 서버에서 받은 데이터로 바꿀 수 있어요.
const posts = [
  {
    id: 1,
    nickname: 'nqve_diary',
    content: '오늘부터 나의 일상을 기록해보기로 했다. 첫 게시글!',
  },
  {
    id: 2,
    nickname: 'react_beginner',
    content: '카페에서 React 공부 중. 작은 화면부터 하나씩 만들어보자 ☕',
  },
];

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-5">
          <h1 className="text-2xl font-extrabold">NQve</h1>
          <span className="text-sm text-zinc-500">홈 피드</span>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-8">
        <h2 className="text-lg font-bold">오늘의 이야기</h2>
        <p className="mt-1 mb-6 text-sm text-zinc-500">작은 일상을 나누는 공간</p>

        <div className="flex flex-col gap-4">
          {/* map은 게시글마다 PostCard를 만들어요. key에는 각 게시글의 고유 ID를 넣어요. */}
          {posts.map((post) => (
            <PostCard
              key={post.id}
              nickname={post.nickname}
              content={post.content}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

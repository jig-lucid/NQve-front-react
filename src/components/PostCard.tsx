// 이 컴포넌트가 부모에게서 받을 props의 이름과 타입이에요.
type PostCardProps = {
  nickname: string;
  content: string;
};

// props는 부모(FeedPage)가 자식(PostCard)에게 전달하는 값이에요.
export default function PostCard({ nickname, content }: PostCardProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-5">
      <h3 className="border-b border-zinc-100 pb-3 text-sm font-bold">{nickname}</h3>
      <p className="pt-4 text-sm leading-7 whitespace-pre-wrap break-words">{content}</p>
    </article>
  );
}

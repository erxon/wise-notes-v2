import { Link } from "react-router";

export default function History({
  history,
}: {
  history: { id: number; question: string; answer: string };
}) {
  return (
    <Link
      to={`/ask-ai/${history.id}`}
      className="p-2 hover:bg-secondary rounded-lg text-sm text-neutral-700 dark:text-neutral-300"
    >
      {history.question}
    </Link>
  );
}

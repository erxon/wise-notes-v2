interface Chat {
  id: number;
  conversation: Conversation[];
}

interface Conversation {
  id: number;
  question: string;
  answer: string;
}

export default function Logs({ chat }: { chat: Chat | undefined }) {
  return (
    <div className="flex flex-col gap-4">
      {chat ? (
        chat.conversation.map((item: Conversation) => (
          <div key={item.id} className="flex flex-col gap-4">
            <p className="w-fit p-2 rounded-lg bg-secondary self-end">
              {item.question}
            </p>
            <p>{item.answer}</p>
          </div>
        ))
      ) : (
        <div className="flex flex-col gap-2 items-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-300">
            Ask AI any question about your notes
          </p>
        </div>
      )}
    </div>
  );
}

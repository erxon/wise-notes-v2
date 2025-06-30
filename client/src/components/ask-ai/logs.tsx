import { useLLMOutput } from "@llm-ui/react";
import { markdownLookBack } from "@llm-ui/markdown";
import { useStreamExample, throttleBasic } from "@llm-ui/react";
import Markdown from "./markdown";
import type { Chat } from "@/lib/types";
import { useEffect, useState } from "react";

const throttle = throttleBasic({
  readAheadChars: 5,
  targetBufferChars: 2,
  adjustPercentage: 0.35,
  frameLookBackMs: 20000,
  windowLookBackMs: 10000,
});

export default function Logs({ chat }: { chat: Chat }) {
  const [chatState, setChatState] = useState<Chat>(chat);
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    const [thinking, actualAnswer] = chat.answer.split("</think>");

    setChatState(chat);
    setAnswer(actualAnswer);
  }, [chat]);

  const { isStreamFinished, output } = useStreamExample(answer);
  const { blockMatches } = useLLMOutput({
    llmOutput: output,
    blocks: [],
    fallbackBlock: {
      component: Markdown, // from Step 1
      lookBack: markdownLookBack(),
    },
    isStreamFinished,
    throttle: throttle,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-100 dark:bg-black dark:outline rounded-full p-3 w-fit self-end">
        {chatState.query}
      </div>
      <div>
        {blockMatches.map((blockMatch, index) => {
          const Component = blockMatch.block.component;
          return <Component key={index} blockMatch={blockMatch} />;
        })}
      </div>
    </div>
  );
}

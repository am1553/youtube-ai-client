import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import { Chat } from "../reducers/chat";
import React, { useEffect } from "react";

function ChatThread({ chatData }: { chatData: Chat[] }) {
  const containerRef = React.useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chatData]);

  return (
    <ul className="flex-1 flex flex-col gap-6 w-full mb-16" ref={containerRef}>
      {chatData.map((chat, i) => {
        const messages = chat.message.split("\n");
        return (
          <li
            key={i}
            className={`w-3/4 flex gap-4 ${
              chat.from === "me"
                ? "place-self-end flex-row-reverse"
                : "place-self-start"
            }`}
          >
            <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
              {chat.from === "bot" ? (
                <SmartToyIcon className="text-gray-400" />
              ) : (
                <PersonIcon className="text-gray-400" />
              )}
            </div>
            <div
              className={`${
                chat.from === "me"
                  ? "justify-end bg-gray-700"
                  : "justify-start bg-gray-600"
              } text-white p-4 rounded-lg shadow-md flex-1`}
            >
              {messages.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ChatThread;



import React from "react";

interface ChatBotProps {
  isChatOpen: boolean;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  messages: string[];
  currentMessage: string;
  setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  handleClearChat: () => void;
}

export default function ChatBot({
  isChatOpen,
  setIsChatOpen,
  messages,
  currentMessage,
  setCurrentMessage,
  handleSendMessage,
  handleClearChat,
}: ChatBotProps) {
  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isChatOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="font-bold text-lg text-blue-600">Echo</h2>
          <button
            onClick={() => setIsChatOpen(false)}
            className="text-gray-600 hover:text-red-500"
          >
            ✖️
          </button>
        </div>

        <div className="p-4 space-y-2 overflow-y-auto h-[calc(100%-8rem)]">
          <div className="text-sm bg-gray-100 p-2 rounded">
            Hello! 👋 What can I help you with today?
          </div>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className="text-sm bg-blue-100 p-2 rounded self-end text-right"
            >
              {msg}
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 p-4 w-full bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm"
            >
              Send
            </button>
            <button
              onClick={handleClearChat}
              className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-2 rounded-md text-sm"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

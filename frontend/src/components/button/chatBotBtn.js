const ChatBotButton = () => {
  return (
    <div className="hidden sm:block cursor-pointer animate-bounce fixed right-4 bottom-16 px-4 py-2 bg-white drop-shadow-lg rounded-3xl border-2 border-blue-300 z-50">
      <div className="flex flex-row items-center gap-x-2 relative">
        <span className="h-4 w-4 rounded-full bg-green-700 absolute -bottom-4 -right-3 border border-blue-300"></span>
        <p className="font-semibold text-blue-300">ChatAI</p>
        <div className="p-2 rounded-full bg-blue-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatBotButton;

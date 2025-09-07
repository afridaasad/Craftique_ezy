import { useState } from 'react';

const ChatbotIcon = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="fixed bottom-8 right-8 bg-brown-400 hover:bg-brown-500 text-white rounded-full p-4 shadow-lg z-50"
        onClick={() => setOpen(true)}
        aria-label="Open Chatbot"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </button>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-xl text-center">
            <h2 className="text-xl font-bold mb-4 text-brown-500">Chatbot coming soon!</h2>
            <button
              className="mt-4 px-4 py-2 bg-brown-400 text-white rounded hover:bg-brown-500"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotIcon;

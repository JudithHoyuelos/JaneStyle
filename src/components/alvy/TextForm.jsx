import { useState, useEffect } from 'react';
import * as alvy from '@/lib/alvy';

const TextForm = () => {
  const [textQuestion, setTextQuestion] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (textQuestion.trim() === '') return;

    setLoading(true);
    const questionMessage = alvy.sendMessage(textQuestion);
    setChatMessages([...chatMessages, { ...questionMessage, isUser: true }]);
    setTextQuestion('');
  };

  const onAlvyResponseReceived = (alvyMessage) => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { ...alvyMessage, isUser: false },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    alvy.onResponse(onAlvyResponseReceived);
    alvy.startConnection();

    return () => {
      alvy.closeConnection();
    };
  }, []);

  return (
    <div className="custom-container">
      <div className="glass-card">
        <div className="flex flex-col gap-4 mb-4">
        <div id="messages" className="overflow-y-auto max-h-60 space-y-4">
          {chatMessages.map((chatMessage, index) => (
            <div
              key={index}
              className={`p-2 rounded-md shadow-sm max-w-[75%] ${
                chatMessage.isUser
                  ? 'bg-blue-100 ml-auto text-right'
                  : 'bg-gray-100 mr-auto text-left'
              }`}
            >
              <p>{chatMessage.message}</p>
            </div>
          ))}
        </div>
          <form id="text-input" onSubmit={handleTextSubmit} className="space-y-4">
            <textarea
              value={textQuestion}
              onChange={(e) => setTextQuestion(e.target.value)}
              autoComplete="off"
              className="w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message here..."
            />
            <button
              type="submit"
              className="btn w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </form>
        </div>
        {/* <button
          className="btn w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-500"
          onClick={() => alert('Close connection logic here')}
        >
          Close connection
        </button> */}
      </div>
    </div>
  );
};

export default TextForm;

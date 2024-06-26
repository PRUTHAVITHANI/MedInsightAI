import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = async () => {
    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');

    try {
      const response = await axios.post('/api/chat', {
        message: userInput,
      });

      const aiMessage = response.data.message;
      setMessages([...newMessages, { sender: 'ai', text: aiMessage }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="ai-doctor-chat flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="chat-window bg-white shadow-lg rounded-lg w-full max-w-lg p-6 flex flex-col space-y-4">
        <div className="messages flex flex-col space-y-4 overflow-y-auto h-96">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message p-3 rounded-lg ${
                msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 self-start'
              }`}
            >
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="chat-input flex space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

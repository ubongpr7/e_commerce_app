'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPhoneAlt,
  FaComments,
  FaChevronDown,
  FaArrowLeft,
  FaPaperclip,
} from 'react-icons/fa';
import { MainNav } from '@/components/navigation/main-nav';
import { MainFooter } from '@/components/navigation/main-footer';

export default function ContactPage() {
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [step, setStep] = useState<'welcome' | 'form' | 'chat'>('welcome');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const toggleChat = () => {
    setShowChatWidget(!showChatWidget);
    if (!showChatWidget) {
      setStep('welcome');
      setForm({ name: '', email: '', message: '' });
      setMessages([]);
      setNewMessage('');
      setFile(null);
    }
  };

  const handleFormSubmit = () => {
    if (form.name && form.email && form.message) {
      setMessages([
        { from: 'bot', text: 'Hi ' + form.name + '! Thanks for reaching out. How can we assist you today?' },
      ]);
      setStep('chat');
    }
  };

  const handleSend = () => {
    if (!newMessage && !file) return;
    const updatedMessages = [...messages];
    if (newMessage) updatedMessages.push({ from: 'user', text: newMessage });
    if (file) updatedMessages.push({ from: 'user', text: `Sent an attachment: ${file.name}` });
    updatedMessages.push({ from: 'bot', text: 'Thanks for the message! An agent will respond shortly.' });
    setMessages(updatedMessages);
    setNewMessage('');
    setFile(null);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <main>
      <MainNav />
      <div className="min-h-screen bg-white text-center py-10 px-10">
        <div className="bg-orange-600 text-white py-6 rounded-md">
          <h1 className="text-3xl font-bold">NEED HELP?</h1>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mt-8">
          <div className="text-gray-700 max-w-md">
            <p>
              If you have inquiries or need assistance, do not hesitate to chat with us.
              <br />
              Available Monday to Sunday (8am to 7pm). Public Holidays (9am to 5pm).
            </p>

            <div className="mt-6 flex items-center justify-center gap-6">
              <button
                onClick={toggleChat}
                className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded shadow-md flex items-center gap-2"
              >
                <FaComments /> Chat With Us
              </button>
              <a
                href="tel:02018881106"
                className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded shadow-md flex items-center gap-2"
              >
                <FaPhoneAlt /> Call Us
              </a>
            </div>

            <p className="mt-6 text-sm text-gray-600">
              You can also reach us on 02018881106 (Mon–Fri 8am–5pm, Public Holidays 9am–5pm).
            </p>
          </div>

          <img src="/agent-main.png" alt="Support Agent" className="w-96 h-auto rounded-xl" />
        </div>

        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-16 bg-orange-600 text-white py-3 px-5 rounded-full shadow-xl flex items-center gap-2 z-50"
        >
          {showChatWidget ? <FaChevronDown className="text-white" /> : <FaComments className="text-white" />}
          <span>{showChatWidget ? 'Close Chat' : 'Chat with us'}</span>
        </button>

        <AnimatePresence>
          {showChatWidget && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed bottom-20 right-16 w-96 bg-white shadow-2xl rounded-xl z-50 flex flex-col"
            >
              <div className="bg-orange-600 text-white px-4 py-2 font-bold flex justify-between items-center">
                <span>Jemfave Support</span>
                <button onClick={toggleChat}>
                  <FaChevronDown />
                </button>
              </div>

              {step === 'welcome' && (
                <div className="p-5 text-center">
                  <img src="/chat-illustration.png" alt="Chat" className="mx-auto w-28 h-28 mb-4" />
                  <h2 className="text-lg font-semibold">Welcome to Jemfave!</h2>
                  <p className="text-sm text-gray-600 mt-1">We're here to help. Let's start by getting to know you.</p>
                  <button
                    onClick={() => setStep('form')}
                    className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded"
                  >
                    Start Conversation
                  </button>
                </div>
              )}

              {step === 'form' && (
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <button onClick={() => setStep('welcome')}>
                      <FaArrowLeft className="text-orange-600" />
                    </button>
                    <span className="text-sm font-semibold">Fill the form to proceed</span>
                  </div>

                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border rounded p-2 text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border rounded p-2 text-sm"
                  />
                  <textarea
                    placeholder="Your message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border rounded p-2 text-sm"
                    rows={3}
                  />

                  <button
                    onClick={handleFormSubmit}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded"
                  >
                    Proceed to Chat
                  </button>
                </div>
              )}

              {step === 'chat' && (
                <div className="p-4 flex flex-col h-96">
                  <div className="flex items-center gap-2 mb-2">
                    <button onClick={() => setStep('form')}>
                      <FaArrowLeft className="text-orange-600" />
                    </button>
                    <span className="text-sm font-semibold">Chat</span>
                  </div>

                  <div className="flex-1 overflow-y-auto bg-gray-50 rounded p-2 space-y-3">
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
                      >
                        {msg.from === 'bot' && (
                          <div className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
                            J
                          </div>
                        )}
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg text-sm shadow ${
                            msg.from === 'user'
                              ? 'bg-orange-100 text-right text-gray-800'
                              : 'bg-white border text-gray-700'
                          }`}
                        >
                          {msg.text}
                        </div>
                        {msg.from === 'user' && (
                          <img src="/avatar.png" alt="User Avatar" className="w-8 h-8 rounded-full" />
                        )}
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <label className="cursor-pointer">
                      <FaPaperclip className="text-gray-500" />
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => e.target.files && setFile(e.target.files[0])}
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 border p-2 rounded text-sm"
                    />
                    <button
                      onClick={handleSend}
                      className="bg-orange-600 text-white px-4 py-2 rounded text-sm"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <MainFooter />
    </main>
  );
}

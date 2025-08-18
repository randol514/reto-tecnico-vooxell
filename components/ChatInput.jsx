'use client';

import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Paperclip } from 'lucide-react'; 

const ChatInput = ({ onSendMessage, onSendFile, isSending }) => {
  const [input, setInput] = useState('');
  const fileInputRef = useRef(null);

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isSending) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('document', file);
      onSendFile(formData);
    }
  };

  return (
    <form onSubmit={handleTextSubmit} className="p-4 bg-gray-200 flex items-center">
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe un mensaje..."
        className="flex-1 p-2 border rounded-3xl bg-white border-gray-50 dark:bg-gray-800 dark:border-white focus:outline-none focus:ring-0"
        disabled={isSending}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="ml-2 rounded-3xl"
        onClick={() => fileInputRef.current.click()}
        disabled={isSending}
        >
        {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Paperclip className="h-4 w-4" />}
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <Button type="submit" className="ml-2 rounded-3xl" disabled={isSending}>
        {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enviar"}
      </Button>
    </form>
  );
}

export default ChatInput
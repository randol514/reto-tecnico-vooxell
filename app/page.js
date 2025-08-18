'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatList from '../components/ChatList ';

const Home = () =>{
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleNewChat = () => {
    const newChatId = v4();
    router.push(`/chat/${newChatId}`);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Tus Chats</h1>
      <div className="flex w-full max-w-xl mb-6 space-x-2">
        <Input
          type="text"
          placeholder="Buscar..."
          className='rounded-3xl'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button className="rounded-3xl" onClick={handleNewChat}>Nuevo Chat</Button>
      </div>
      <ChatList searchTerm={searchTerm} />
    </div>
  );
}

export default Home
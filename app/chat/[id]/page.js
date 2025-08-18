'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useChatActions } from '../../../hooks/useChatActions';
import ChatInput from '../../../components/ChatInput';
import ChatMessages from '../../../components/ChatMessages';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';


const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getChatMessages = async (chatId) => {
  const res = await fetch(`${API_URL}/chats/${chatId}`);
  if (!res.ok) {
    throw new Error('Error');
  }
  return res.json();
};

const ChatPage = () => {
  const params = useParams()
  const chatId = params.id
  const router = useRouter()

  const { data: messages, isLoading, error } = useQuery({
    queryKey: ['chatMessages', chatId],
    queryFn: () => getChatMessages(chatId),
  });

  const { sendMessage, uploadDocument, isSending, error: sendError } = useChatActions(chatId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Cargando chats
      </div>
    );
  }

  const combinedError = error || sendError;

  if (combinedError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {combinedError.message}
      </div>
    );
  }

  return (
    <section className="flex flex-col h-screen">
      <header className="p-4 bg-gray-200 flex items-center shadow-2xs">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="ml-2 text-2xl font-bold">Chat</h2>
      </header>
      <ChatMessages messages={messages} />
      <ChatInput
        onSendMessage={sendMessage}
        onSendFile={uploadDocument}
        isSending={isSending}
      />
    </section>
  );
};

export default ChatPage;
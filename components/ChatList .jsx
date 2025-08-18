import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const deleteChat = async (chatId) => {
  const res = await fetch(`/api/chats/${chatId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al borrar el chat');
};

const getChatList = async () => {
  const res = await fetch('/api/chats');
  if (!res.ok) throw new Error('Error al cargar la lista de chats');
  return res.json();
};

const ChatList = ({ searchTerm }) => {
  const queryClient = useQueryClient();

  const { data: chats, isLoading, isError, error } = useQuery({
    queryKey: ['chatList'],
    queryFn: getChatList,
  });

  const deleteChatMutation = useMutation({
    mutationFn: deleteChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatList'] });
    },
  });

  const handleDeleteChat = (e, chatId) => {
    e.preventDefault();
    deleteChatMutation.mutate(chatId);
  };

  const filteredChats = chats?.filter(chat =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <p className="text-gray-500">Cargando chats...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  if (filteredChats.length === 0) {
    return <p className="text-gray-500 text-center">No se encontraron chats.</p>;
  }

  return (
    <div className="w-full max-w-xl space-y-4">
      {filteredChats.map((chat) => (
        <div key={chat.id} className="relative">
          <Link href={`/chat/${chat.id}`} className="block">
            <Card className="hover:bg-gray-100 transition-colors">
              <CardHeader>
                <CardTitle>{chat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
              </CardContent>
            </Card>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            onClick={(e) => handleDeleteChat(e, chat.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

export default ChatList
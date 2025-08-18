import { useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useChatActions = (chatId) => {
  const queryClient = useQueryClient();

  const baseMutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatMessages', chatId] });
    },
  };

  const sendMessageMutation = useMutation({
    ...baseMutationOptions,
    mutationFn: async (message) => {
      const res = await fetch(`${API_URL}/chats/${chatId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) throw new Error('Error al enviar mensaje');
      return res.json();
    },
  });

  const uploadDocumentMutation = useMutation({
    ...baseMutationOptions,
    mutationFn: async (formData) => {
      const res = await fetch(`${API_URL}/chats/${chatId}/documents`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Error al subir el documento');
      return res.json();
    },
  });

  const isSending = sendMessageMutation.isPending || uploadDocumentMutation.isPending;
  const combinedError = sendMessageMutation.error || uploadDocumentMutation.error;

  return {
    sendMessage: sendMessageMutation.mutate,
    uploadDocument: uploadDocumentMutation.mutate,
    isSending,
    error: combinedError,
  };
};
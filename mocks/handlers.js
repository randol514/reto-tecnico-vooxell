import { http, HttpResponse } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { responses, defaultResponse } from './responses';
import { getDb, updateDb, loadDb } from './db'; 

loadDb(); 

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const handlers = [
  http.get(`${API_URL}/chats`, () => {
    const chats = getDb();
    const chatList = Object.keys(chats).map((id) => {
      const chatMessages = chats[id];
      const lastMessage = chatMessages[chatMessages.length - 1];
      const title = chatMessages[0]?.text || `Chat ${id.substring(0, 4)}...`;
      return {
        id,
        title,
        lastMessage: lastMessage?.text || 'Sin mensajes',
      };
    });
    return HttpResponse.json(chatList);
  }),

  http.delete(`${API_URL}/chats/:id`, ({ params }) => {
    const chats = getDb();
    const { id } = params;
    
    delete chats[id];
    
    updateDb(chats);
    
    return new HttpResponse(null, { status: 200 });
  }),

  http.get(`${API_URL}/chats/:id`, ({ params }) => {
    const chats = getDb();
    const { id } = params;
    const chatMessages = chats[id] || [];
    return HttpResponse.json(chatMessages);
  }),

  http.post(`${API_URL}/chats/:id`, async ({ request, params }) => {
    const chats = getDb();
    const { id } = params;
    const { message } = await request.json();

    if (!chats[id]) {
      chats[id] = [];
    }

    const userMessage = {
      id: uuidv4(),
      text: message,
      sender: 'user',
      type: 'text',
      timestamp: new Date().toISOString(),
    };
    chats[id].push(userMessage);

    const lowerCaseMessage = message.toLowerCase();
    let apiResponseMessage = defaultResponse;
    for (const key in responses) {
      if (lowerCaseMessage.includes(key)) {
        apiResponseMessage = responses[key];
        break;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 500)); 

    const apiMessage = {
      id: uuidv4(),
      text: apiResponseMessage,
      sender: 'api',
      type: 'text',
      timestamp: new Date().toISOString(),
    };
    chats[id].push(apiMessage);

    updateDb(chats);
    return HttpResponse.json([userMessage, apiMessage], { status: 201 });
  }),

  http.post(`${API_URL}/chats/:id/documents`, async ({ request, params }) => {
    const chats = getDb();
    const { id } = params;
    const formData = await request.formData();
    const document = formData.get('document');

    if (!document) {
      return new HttpResponse('Documento no encontrado.', { status: 400 });
    }

    let fileUrl = '';
    const fileData = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(document);
    });
    fileUrl = fileData;

    const newMessage = {
      id: uuidv4(),
      sender: 'user',
      type: 'document',
      document: {
        name: document.name,
        size: document.size,
        mimeType: document.type,
        url: fileUrl,
      },
      timestamp: new Date().toISOString(),
    };
    if (!chats[id]) {
      chats[id] = [];
    }
    chats[id].push(newMessage);

    await new Promise((resolve) => setTimeout(resolve, 500)); 

    const apiResponseMessage = `Documento "${document.name}" recibido.`;
    const apiMessage = {
      id: uuidv4(),
      text: apiResponseMessage,
      sender: 'api',
      type: 'text',
      timestamp: new Date().toISOString(),
    };
    chats[id].push(apiMessage);
    
    updateDb(chats);
    return HttpResponse.json([newMessage, apiMessage], { status: 201 });
  }),
];
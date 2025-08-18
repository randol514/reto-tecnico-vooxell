import { FileText, FileVideo, Download } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const messageClasses = `
    p-2 my-2 rounded-lg max-w-xs
    ${isUser
      ? 'bg-black text-white ml-auto'
      : 'bg-gray-300 text-gray-800'
    }
  `;
  
  const containerClasses = `flex ${isUser ? 'justify-end' : 'justify-start'}`;

  let messageContent;

  if (message.type === 'document') {
    const { document } = message;
    
    if (document.mimeType.startsWith('image/')) {
      messageContent = (
        <img
          src={document.url}
          alt={document.name}
          className="rounded-lg object-cover"
        />
      );
    } else if (document.mimeType.startsWith('video/')) {
      messageContent = (
        <a href={document.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-500 hover:underline">
          <FileVideo className="w-5 h-5" />
          <p className="font-bold truncate">Video: {document.name}</p>
          <Download className="w-4 h-4" />
        </a>
      );
    } else {
      messageContent = (
        <a href={document.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-500 hover:underline">
          <FileText className="w-5 h-5" />
          <p className="font-bold truncate">Documento: {document.name}</p>
          <Download className="w-4 h-4" />
        </a>
      );
    }
  } else {
    messageContent = message.text;
  }

  return (
    <div className={containerClasses}>
      <div className={messageClasses}>
        {messageContent}
      </div>
    </div>
  );
}

export default ChatMessage
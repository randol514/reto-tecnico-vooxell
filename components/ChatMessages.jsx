import ChatMessage from './ChatMessage';

const ChatMessages = ({ messages }) =>{
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
      {
        messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))
      }
    </div>
  );
}

export default ChatMessages
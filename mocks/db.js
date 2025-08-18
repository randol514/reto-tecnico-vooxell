let chats = {};

export const loadDb = () => {
  if (typeof localStorage !== 'undefined') {
    const storedChats = localStorage.getItem('mockChats');
    if (storedChats) {
      chats = JSON.parse(storedChats);
    }
  }
};

export const saveDb = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('mockChats', JSON.stringify(chats));
  }
};

export const getDb = () => chats;

export const updateDb = (newChats) => {
  chats = newChats;
  saveDb();
};
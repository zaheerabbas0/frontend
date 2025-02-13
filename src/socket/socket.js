let socket;

export const getOrCreateRoom = async (sender, receiver, isGroup) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/chat/get_or_create?user1_id=${sender}&user2_id=${receiver}&is_group=${isGroup}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to get or create room');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
export const connectSocket = (senderId, chatId, is_group) => {
  // console.log('LOGGING IN API', chatId, senderId, is_group);

  // Create a WebSocket connection
  const baseUrl = process.env.REACT_APP_BASE_URL.replace(/^https?:\/+/, '');
  socket = new WebSocket(
    `ws://${baseUrl}/api/v1/chat/ws/${senderId}/${chatId}/${is_group}`
  );

  socket.onopen = () => {
    console.log('Connected to the server');
  };

  socket.onerror = (error) => {
    console.error('Connection error:', error);
  };

  socket.onclose = () => {
    console.log('Disconnected from the server');
  };

  // Define the onmessage event listener to handle incoming messages
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log('Received message:', message);
  };
};

export const disconnectSocket = () => {
  if (socket) {
    socket.close();
    console.log('Socket disconnected');
  }
};

export const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('Socket is not open. Cannot send message.');
  }
};

export const receiveMessage = (callback) => {
  if (socket) {
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      callback(message);
    };
  }
};

export default {
  connectSocket,
  disconnectSocket,
  sendMessage,
  receiveMessage,
};

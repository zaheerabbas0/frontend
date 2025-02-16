import React, { useEffect, useState } from 'react';
import { Layout, message } from 'antd';
import ChatSidebar from '../../components/chat/ChatSidebar';
import ChatHeader from '../../components/chat/ChatHeader';
import ChatMessages from '../../components/chat/ChatMessages';
import ChatInput from '../../components/chat/ChatInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  connectSocket,
  disconnectSocket,
  sendMessage,
  receiveMessage,
  getOrCreateRoom,
} from '../../socket/socket';
import './chat.css';
import { fetchChatUsers } from '../../reduxToolkit/features/ChatSlice';

const { Content } = Layout;

const Chat = () => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [createGroup, setCreateGroup] = useState(false);
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.chatUser.chatUsers);

// const fetchUserData = useCallback(async () => {
//   try {
//     dispatch(fetchChatUsers());
//   } catch (error) {
//     message.error("Failed to fetch users");
//   }
// }, [dispatch]);

// useEffect(() => {
//   fetchUserData();
// }, [fetchUserData]);

  const userInfo = JSON.parse(localStorage.getItem('user_info'));
  useEffect(() => {
    const createRoomAndConnect = async () => {
      if (selectedUser) {
        try {
          const roomResponse = await getOrCreateRoom(
            userInfo?.id,
            selectedUser?.id,
            selectedUser?.is_group
          );
          if (roomResponse?.id) {
            setRoom(roomResponse.id);
          } else {
            console.log('NO ROOM RESPONSE ');
          }
          console.log('LOGGING ROOM ', userInfo, roomResponse);
        } catch (error) {
          message.error('Failed to create or join room');
        }
      }
    };

    createRoomAndConnect();

    return () => {
      disconnectSocket();
      setMessages([]);
    };
  }, [selectedUser]);

  useEffect(() => {
    if (room) {
      connectSocket(userInfo?.id, room, selectedUser?.is_group);
      receiveMessage((message) => {
        console.log('LOG RECIEVE MESSAGE', message);
        // if (message.sender_id !== userInfo.id) {}
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [room, userInfo?.id]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = (content) => {
    const newMessage = {
      sender: userInfo?.id,
      content: content,
      time: new Date().toLocaleTimeString(),
    };
    // setMessages((prevMessages) => [...prevMessages, newMessage]);
    sendMessage(content);
  };

  return (
    <Layout className="chat-layout">
      <ChatSidebar
        users={users}
        onSelectUser={handleUserClick}
        selectedUser={selectedUser}
        handleGroupCreation={() => setCreateGroup(!createGroup)}
      />

      <Layout>
        <Content className="chat-content">
          {selectedUser ? (
            <>
              <ChatHeader
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                users={users}
              />
              <ChatMessages messages={messages} />
              <ChatInput onSendMessage={handleSendMessage} />
            </>
          ) : (
            <div className="chat-unselected">
              <div>Select a user to start chatting</div>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Chat;

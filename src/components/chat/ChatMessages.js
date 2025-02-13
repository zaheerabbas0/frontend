import { FileTextOutlined } from '@ant-design/icons';
import React from 'react';

const ChatMessages = ({ messages }) => {
  const userInfo = JSON.parse(localStorage.getItem('user_info'));
  const renderMessage = (msg) => {
    if (typeof msg?.content === 'string') {
      return (
        <>
          <div className="text-message">
            {msg.content.replace(/^"|"$/g, '')}
          </div>
          <p className="message-time">
            {msg.timestamp
              ? new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : new Date().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
          </p>
        </>
      );
    }

    const fileURL = msg.file ? URL.createObjectURL(msg.file) : null;

    if (msg.type === 'photos' && msg.file.type.startsWith('image/')) {
      return (
        <div className="media-message">
          <img
            src={fileURL}
            alt={msg.file.name}
            className="media-thumbnail"
            onClick={() => window.open(fileURL, '_blank')}
          />
        </div>
      );
    }

    if (msg.type === 'photos' && msg.file.type.startsWith('video/')) {
      return (
        <div className="media-message">
          <video
            controls
            className="media-video"
            onClick={() => window.open(fileURL, '_blank')}
          >
            <source src={fileURL} type={msg.file.type} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    if (msg.type === 'document') {
      return (
        <div className="document-message">
          <FileTextOutlined />
          <a
            href={fileURL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              window.open(fileURL, '_blank');
            }}
          >
            {msg.file.name}
          </a>
        </div>
      );
    }

    return null;
  };
  return (
    <div
      className="messages-content"
      style={{ height: '70vh', overflowY: 'auto' }}
    >
      {messages.map((msg, index) => (
        <div
          className={`message`}
          // className={`message-map ${index % 2 === 0 ? "right" : "left"}`}
          key={index}
        >
          <div
            className={` ${
              msg.sender_id === userInfo?.id ? 'sent' : 'received'
            }`}
          >
            {renderMessage(msg)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;

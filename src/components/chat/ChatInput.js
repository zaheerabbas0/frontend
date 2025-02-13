import React, { useState } from 'react';
import { Input, Button, Dropdown, Menu } from 'antd';
import {
  PaperClipOutlined,
  SendOutlined,
  FileImageOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

const ChatInput = ({ onSendMessage }) => {
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleAttachmentClick = ({ key }) => {
    const input = document.createElement('input');
    input.type = 'file';

    if (key === 'photos') {
      input.accept = 'image/*,video/*';
    } else if (key === 'document') {
      input.accept = '.pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx';
    }

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        onSendMessage({ file, type: key });
      }
    };
    input.click();
  };

  const attachmentMenu = (
    <Menu onClick={handleAttachmentClick}>
      <Menu.Item key="photos" icon={<FileImageOutlined />}>
        Photos and Videos
      </Menu.Item>
      <Menu.Item key="document" icon={<FileTextOutlined />}>
        Document
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="chat-content-footer">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        className="chat-input"
        onKeyDown={handleKeyDown}
      />
      {/* <Dropdown
        overlay={attachmentMenu}
        trigger={["click"]}
        onOpenChange={(visible) => setShowAttachmentOptions(visible)}
        open={showAttachmentOptions}
      >
        <Button icon={<PaperClipOutlined />} className="attach-btn" />
      </Dropdown> */}
      <Button
        className="chat-send-btn"
        icon={<SendOutlined />}
        onClick={handleSend}
      />
    </div>
  );
};

export default ChatInput;

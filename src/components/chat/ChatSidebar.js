import React, { useState } from 'react';
import { Input, Button, List, Layout, Form } from 'antd';
import { SearchOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { CardTitle } from '../ui/typography';
import CustomAvatar from '../../styledComponents/CustomAvatar';
import { CustomButton } from '../../styledComponents/CustomButton';
import { CustomInput } from '../../styledComponents/CustomInput';
import CustomForm from '../../styledComponents/CustomForm';
import { useDispatch } from 'react-redux';
import { createGroup as createChatGroup } from '../../reduxToolkit/features/ChatSlice';
import CustomCheckbox from '../../styledComponents/CustomCheckbox';
import { hasPermission } from '../../constants/UsersRole';
const { Sider } = Layout;

const ChatSidebar = ({
  users,
  onSelectUser,
  selectedUser,
  handleGroupCreation,
}) => {
  const [search, setSearch] = useState('');
  const [createGroup, setCreateGroup] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState('');
  // const [groupCheck, setGroupCheck] = useState(false);
  // const handleGroupClicked=()=>{
  //   setGroupCheck(!groupCheck);
  // }
  // useEffect(() => {
  //   console.log('selectedUser', selectedUsers);
  // }, [selectedUsers]);

  // useEffect(() => {
  //   console.log('createGroup', createGroup);
  // }, [createGroup]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCheckboxChange = (e, user) => {
    e.stopPropagation();
    if (e.target.checked) {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
    } else {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((u) => u.id !== user.id)
      );
    }
  };

  const userInfo = JSON.parse(localStorage.getItem('user_info'));
  return (
    <Sider theme="light" className="chat-sider" width={300}>
      <div className="chat-sider-header">
        <CardTitle>Chat</CardTitle>
        {hasPermission('create:groupChat') && (
          <Button
            onClick={() => setCreateGroup(!createGroup)}
            icon={<UsergroupAddOutlined />}
          />
        )}
      </div>
      <div className="chat-sider-search">
        {!createGroup && (
          <Input
            placeholder="Search"
            value={search}
            onChange={handleSearch}
            prefix={<SearchOutlined />}
            className="chat-search-input"
          />
        )}
        {createGroup && (
          <GroupNameInput groupName={groupName} setGroupName={setGroupName} />
        )}
      </div>
      {!createGroup && (
        <div className="chat-user-list">
          <List
            dataSource={users.filter(
              (user) =>
                user.name.toLowerCase().includes(search.toLowerCase()) &&
                user.id !== userInfo.id
            )}
            renderItem={(user) => (
              <List.Item
                className={`sider-chat-list ${
                  selectedUser?.id === user.id ? 'selected' : ''
                }`}
                onClick={() => onSelectUser(user)}
              >
                {createGroup && (
                  <CustomCheckbox
                    checked={selectedUsers.includes(user)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleCheckboxChange(e, user);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
                <CustomAvatar
                  key={user.id}
                  name={user.name}
                  image_url={user.image_url}
                  size="medium"
                />
                {user.name}
              </List.Item>
            )}
          />
        </div>
      )}
      {createGroup && (
        <GroupSiderFooter
          setSelectedUsers={setSelectedUsers}
          selectedUsers={selectedUsers}
          groupName={groupName}
          disabled={!groupName.length > 0}
          createGroup={createGroup}
          setCreateGroup={setCreateGroup}
        />
      )}
      &nbsp;
    </Sider>
  );
};

export default ChatSidebar;

const GroupSiderFooter = ({
  setSelectedUsers,
  selectedUsers,
  groupName,
  disabled,
  createGroup,
  setCreateGroup,
}) => {
  const dispatch = useDispatch();
  const handleCreateGroup = () => {
    dispatch(createChatGroup(groupName))
      .then((response) => {
        setCreateGroup(false);
      })
      .catch((error) => {
        console.error('Error creating group:', error);
      });
  };

  return (
    <div className="create-group-button">
      {/* <CustomButton width="100px" >
          Canel
        </CustomButton> */}
      <CustomButton
        width="100px"
        onClick={handleCreateGroup}
        disabled={disabled}
      >
        Done
      </CustomButton>
    </div>
  );
};

const GroupNameInput = ({ groupName, setGroupName }) => {
  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  return (
    <CustomForm layout="vertical" style={{ marginTop: '15px' }}>
      <Form.Item
        label="Group Name"
        name="groupName"
        rules={[{ required: true, message: 'Please input the group name!' }]}
      >
        <CustomInput
          placeholder=""
          value={groupName}
          onChange={handleGroupNameChange}
        />
      </Form.Item>
    </CustomForm>
  );
};

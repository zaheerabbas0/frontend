import React, { useEffect, useState } from 'react';
import CustomAvatar from '../../styledComponents/CustomAvatar';
import { Dropdown, Menu, Modal, List } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import {
  addUsersToGroup,
  removeUsersFromGroup,
} from '../../reduxToolkit/features/ChatSlice';
import { useDispatch } from 'react-redux';
import CustomCheckbox from '../../styledComponents/CustomCheckbox';

const ChatHeader = ({ selectedUser, setSelectedUser, users }) => {
  const dispatch = useDispatch();
  const [chatUsers, setChatUsers] = useState(users);
  const [showModal, setShowModal] = useState(false);
  const [addMembers, setAddMembers] = useState(false);
  const [viewMembers, setViewMembers] = useState(false);
  const [removeMembers, setRemoveMembers] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  useEffect(() => {
    setChatUsers(users);
  }, [users]);
  const userInfo = JSON.parse(localStorage.getItem('user_info'));
  const loggedInUserId = userInfo?.id;

  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          setShowModal(true);
          setAddMembers(true);
        }}
      >
        Add users to group
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          setShowModal(true);
          setRemoveMembers(true);
        }}
      >
        Remove users from group
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => {
          setShowModal(true);
          setViewMembers(true);
        }}
      >
        View group members
      </Menu.Item>
    </Menu>
  );
  const handleOk = () => {
    if (addMembers) {
      const user_id = selectedUsers.map((user) => user.id);
      user_id.push(loggedInUserId);

      const group = {
        group_id: selectedUser?.id,
        user_id,
      };
      dispatch(addUsersToGroup(group))
        .then((res) => {
          const newUsers = res?.payload?.data;
          setSelectedUser((prevSelectedUser) => ({
            ...prevSelectedUser,
            group_users: [...prevSelectedUser.group_users, ...newUsers],
          }));
        })
        .catch((err) => {
          console.log(err, 'error');
        })
        .finally(() => {
          setSelectedUsers([]);
          setShowModal(false);
          setAddMembers(false);
        });
    } else if (removeMembers) {
      const user_ids = selectedUsers.map((user) => user.id);

      const group = {
        group_id: selectedUser?.id,
        user_ids,
      };
      dispatch(removeUsersFromGroup(group))
        .then((res) => {
          const usersToRemove = res?.payload?.data;
          setSelectedUser((prevSelectedUser) => ({
            ...prevSelectedUser,
            group_users: prevSelectedUser.group_users.filter(
              (user) =>
                !usersToRemove.some((removeUser) => removeUser.id === user.id)
            ),
          }));
        })
        .catch((err) => {
          console.log(err, 'error');
        })
        .finally(() => {
          setSelectedUsers([]);
          setShowModal(false);
          setRemoveMembers(false);
        });
    }
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
  return (
    <>
      <Modal
        title={
          addMembers
            ? 'Add Users to Group'
            : removeMembers
              ? 'Remove Users from Group'
              : viewMembers
                ? 'View Group Members'
                : ''
        }
        open={showModal}
        onOk={handleOk}
        onCancel={() => {
          setShowModal(false);
          setSelectedUsers([]);
          setAddMembers(false);
          setRemoveMembers(false);
          setViewMembers(false);
        }}
        footer={!setViewMembers && false}
      >
        <List
          dataSource={
            (addMembers &&
              chatUsers.filter(
                (user) =>
                  user.id !== userInfo.id &&
                  user.is_group === false &&
                  !selectedUser?.group_users.some(
                    (groupUser) => groupUser.id === user.id
                  )
              )) ||
            (removeMembers &&
              selectedUser?.group_users.filter(
                (user) => user.id !== userInfo.id
              )) ||
            (viewMembers && selectedUser?.group_users)
          }
          renderItem={(user) => (
            <List.Item className="sider-chat-list">
              {!viewMembers && (
                <CustomCheckbox
                  style={{ marginRight: '5px' }}
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
      </Modal>
      <div
        className="content-user-info"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="content-user-info">
          <CustomAvatar
            key={selectedUser.id}
            name={selectedUser.name}
            image_url={selectedUser.image_url}
            size="medium"
          />{' '}
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            <div>{selectedUser.name}</div>
            <p>{selectedUser.status || 'Online'}</p>
          </span>
        </div>
        {selectedUser.is_group === true && (
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <EllipsisOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
          </Dropdown>
        )}
      </div>
    </>
  );
};

export default ChatHeader;

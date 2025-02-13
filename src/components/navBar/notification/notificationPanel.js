import { useEffect, useState } from 'react';
import AxiosInstance from '../../../appURL/AxiosInstance';
import { Badge, Button, Dropdown } from 'antd';
import useSSE from '../../../hooks/useSSE';
import NotificationIcon from '../../../assets/NotificationIcon.svg';
import LoadingSkeleton from '../../skeleton/skeleton';
import CustomAvatar from '../../../styledComponents/CustomAvatar';

const NotificationsPanel = ({ user_id }) => {
  const [count, setCount] = useState(null);
  const [notificationsList, setNotificationsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (dropdownOpen) {
      setLoading(true);
      AxiosInstance.get(`/api/v1/notifications/users/${user_id}`)
        .then((response) => {
          setNotificationsList(response.data); // Axios automatically handles the JSON conversion
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching notifications:', error);
          setLoading(false);
        });
    }
  }, [dropdownOpen, user_id]);

  const markNotificationsAsRead = async (unreadNotificationIds) => {
    try {
      const payload = {
        notification_ids: unreadNotificationIds,
        user_id: user_id,
      };
      await AxiosInstance.post('/api/v1/notifications/mark-as-read/', payload);
      // Update the state to reflect the notifications have been marked as read
      setNotificationsList(
        notificationsList.map((notification) => ({
          ...notification,
          is_seen: true,
        }))
      );
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    const unreadNotificationIds = notificationsList
      .filter((notification) => !notification.is_seen)
      .map((notification) => notification.id);

    if (unreadNotificationIds.length > 0) {
      await markNotificationsAsRead(unreadNotificationIds);
    }
  };

  const handleNotificationClick = async (notification) => {
    if (notification && !notification.is_seen) {
      await markNotificationsAsRead([notification.id]);
    }
  };

  const menu = (
    <div className="notifications-panel">
      <div className="panel-header">
        Notifications{' '}
        <Button onClick={handleMarkAllAsRead}>Mark all as read</Button>
      </div>
      {loading ? (
        <div key="loading">
          <LoadingSkeleton num={5} styles={{ minHeight: '50px' }} />
        </div>
      ) : notificationsList.length === 0 ? ( // Check if notificationsList is empty
        <div className="no-notifications">No Notifications</div> // Display message if no notifications
      ) : (
        <div className="notifications">
          {notificationsList.map((notification, index) => (
            <div
              key={notification.id}
              className={`notification ${
                !notification.is_seen ? 'notification-unseen' : ''
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <CustomAvatar
                name={notification?.author_name || 'Ahmad Sheh'}
                image_url={notification?.author_image}
                size="medium"
                showTooltip={false}
              />
              <div className="notification-content-header">
                <span className="notification-header">
                  {notification.category}
                  <span> {notification.time_ago}</span>
                </span>
                <span className="notification-content">
                  {notification.content}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  useSSE(`/api/v1/notifications/sse/unseen-count/${user_id}`, (data) => {
    setCount(data);
  });

  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: '12px',
        display: 'flex',
        alignItems: 'center',
        marginTop: '5px',
        cursor: 'pointer',
      }}
    >
      <Dropdown
        overlay={menu}
        trigger={['click']}
        onVisibleChange={(visible) => setDropdownOpen(visible)}
      >
        <Badge count={count}>
          <img src={NotificationIcon} alt="notification" className="nav-icon" />
        </Badge>
      </Dropdown>
    </div>
  );
};

export default NotificationsPanel;

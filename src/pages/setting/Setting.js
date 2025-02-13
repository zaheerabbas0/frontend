import React, { useEffect } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Row, Col, Typography, Spin, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../reduxToolkit/features/SettingSlice';
import { userNameBgColor } from '../../utils/Utils';
import './Setting.css';

const { Title, Text } = Typography;

const Setting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.setting);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleEditInfo = () => {
    if (userInfo?.id) {
      navigate(`/supportx/setting/edit-info/${userInfo.id}`);
    } else {
      console.error('User ID is not available');
    }
  };

  const userInfoData = [
    { label: 'Email Address', value: userInfo?.email || 'N/A' },
    { label: 'Password', value: '******' },
    // { label: 'Role', value: userInfo?.designation?.name || 'N/A' },
    { label: 'Country', value: userInfo?.country?.name || 'N/A' },
    { label: 'State', value: userInfo?.state?.name || 'N/A' },
    { label: 'City', value: userInfo?.city?.name || 'N/A' },
    { label: 'Present Address', value: userInfo?.presentAddress || 'N/A' },
    { label: 'Timezone', value: userInfo?.time_zone || 'N/A' },
    // { label: "Postal Code", value: userInfo?.postalCode || "N/A" },
  ];

  return (
    <div className="setting-info-container">
      <div className="setting-info-top">
        <div className="setting-info">
          <div className="user-setting-image">
            {userInfo?.image_url ? (
              <img
                src={userInfo.image_url}
                alt={userInfo.name}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Avatar
                size={110}
                style={{
                  backgroundColor: userNameBgColor(userInfo?.name),
                  fontSize: '36px',
                }}
              >
                {userInfo?.name
                  ? userInfo.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()
                  : 'N/A'}
              </Avatar>
            )}
          </div>
          <div>
            <p className="user-name">{userInfo?.name || 'N/A'}</p>
            <p className="user-role">{userInfo?.designation?.name || ''}</p>
            <p className="user-role">+{userInfo?.phone || ''}</p>
            <p className="user-city-country">
              {userInfo?.city?.name || ''} {userInfo?.country?.name || ''}
            </p>
          </div>
        </div>

        <Button onClick={handleEditInfo} icon={<EditOutlined />} type="default">
          Edit
        </Button>
      </div>

      <Title level={4} className="add-info">
        Additional Information
      </Title>

      <Row gutter={[24, 50]}>
        {userInfoData.map((info, index) => (
          <Col key={index} xs={24} sm={12} md={6}>
            <Text>{info.label}</Text>
            <br />
            <Text strong>{info.value}</Text>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Setting;

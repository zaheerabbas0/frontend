import React from 'react';
import { Card } from 'antd';
import CustomAvatar from '../../styledComponents/CustomAvatar';
import ShowMoreItems from '../../utils/ShowMoreItems';
import { CardTitle } from '../ui/typography';
import { renderStatusTag } from '../../utils/Utils';
import styles from './DetailsPage.module.css';

const DetailsInfo = ({
  title = title,
  user = {},
  entityName = entityName,
  userType = userType,
}) => {
  const visibleFields = {
    user: ['name', 'email', 'phone', 'projects'],
    admin: ['name', 'email', 'phone', 'projects'],
    customer: ['name', 'email', 'phone', 'projects'],
  };

  const UserInfoBlock = ({ label, value }) => (
    <div className={styles.info_block}>
      <div>{label}:</div>
      <div>{value || 'N/A'}</div>
    </div>
  );
  const userVisibleFields = visibleFields[userType] || [];

  const shouldShowField = (field) => userVisibleFields.includes(field);

  return (
    <Card className={styles.detail_card}>
      <div className={styles.info_header}>
        <CardTitle>{title}</CardTitle>
        <div>{user?.status ? renderStatusTag(user.status) : 'N/A'}</div>
      </div>
      <div className={styles.info_image}>
        <CustomAvatar
          name={user?.name}
          image_url={user?.image_url}
          size={110}
          fontSize="36px"
          shape="square"
          showTooltip={false}
        />
      </div>
      <div className={styles.info_detail}>
        <div className={styles.detail_columns}>
          {shouldShowField('name') && (
            <UserInfoBlock label="Name" value={user?.name} />
          )}
          {shouldShowField('phone') && (
            <UserInfoBlock
              label="Phone"
              value={user?.phone ? `+${user.phone}` : null}
            />
          )}
        </div>
        <div className={styles.detail_columns}>
          {shouldShowField('email') && (
            <UserInfoBlock label="Email" value={user?.email} />
          )}
          {shouldShowField('projects') && (
            <div className={styles.entity_name}>
              <div>{entityName}:</div>
              <div>
                {user?.projects?.length ? (
                  <ShowMoreItems
                    items={user.projects.map((project) => project.name)}
                    maxVisible={1}
                    moreLabel="+{remaining} more..."
                  />
                ) : (
                  <span>No {entityName.toLowerCase()} available</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DetailsInfo;

import { Badge, Card, Col, Space } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

const BoardCard = ({
  status,
  title,
  details,
  navigatePath,
  renderDetail,
  cardStyles,
  onDetailClick,
}) => {
  const cardCount = details.length;
  const navigate = useNavigate();

  return (
    <Col xs={24} sm={12} md={8} lg={7}>
      <Card
        title={
          <Space>
            <Badge
              status={status}
              text={title}
              style={{
                color: '#0D062D',
                fontSize: '21.1px',
                fontWeight: 600,
                lineHeight: '25.01px',
                textAlign: 'left',
              }}
            />
            <Badge
              count={cardCount}
              style={{
                backgroundColor: cardStyles.badgeBackgroundColor(status),
              }}
            />
          </Space>
        }
        headStyle={{ backgroundColor: 'white' }}
        style={{
          background: '#F7F7F7',
          color: 'white',
        }}
        bodyStyle={{
          padding: '1px',
        }}
      >
        <div className="scrollable-container">
          <Space direction="vertical" style={{ width: '100%' }} size="small">
            {details.map((detail, index) => (
              <Card
                className="board-card"
                key={index}
                hoverable={true}
                type="inner"
                onClick={() => onDetailClick(detail)}
              >
                {renderDetail(detail)}
              </Card>
            ))}
          </Space>

          <div className="card-footer" onClick={() => navigate(navigatePath)}>
            <span>
              <PlusOutlined /> New Task
            </span>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default BoardCard;

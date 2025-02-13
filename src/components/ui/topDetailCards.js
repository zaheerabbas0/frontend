import { useNavigate } from 'react-router-dom';
import CustomCard from '../../styledComponents/CustomCard';
import { Col, Row } from 'antd';

const Card = ({ title, count, icon, path, pathState, colSpan = 6 }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (path) {
      navigate(path, { state: pathState });
    }
  };

  return (
    <Col xs={24} sm={12} md={12} lg={colSpan}>
      <CustomCard
        title={title}
        count={count}
        icon={icon}
        onClick={handleCardClick}
        style={{
          height: '100%',
        }}
      />
    </Col>
  );
};

const TopDetailCards = ({ cardData }) => {
  if (!Array.isArray(cardData)) {
    console.error('Type mismatch: cardData should be an object');
    return null;
  }

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
      {cardData.map((data, index) => (
        <Card key={index} {...data} />
      ))}
    </Row>
  );
};

export default TopDetailCards;

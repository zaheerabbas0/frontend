import { CheckCircleOutlined } from '@ant-design/icons';
import './card.css';
import { Button } from 'antd';
import pdf from '../../assets/pdf.svg';

const DocumentCard = ({ text, url }) => {
  const handleViewDetail = () => {
    window.open(url, '_self');
  };

  return (
    <div className="document-pdf-card">
      <CheckCircleOutlined
        style={{
          padding: '5px',
          marginLeft: '7px',
          marginTop: '5px',
          color: 'green',
        }}
      />
      <div className="document-pdf-card-inner">
        <img src={pdf} width={80} alt="PDF" />
        <p className="document-text">{text}</p>
        <Button
          className="alltickets-button"
          style={{ marginBottom: '15px' }}
          onClick={handleViewDetail}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default DocumentCard;

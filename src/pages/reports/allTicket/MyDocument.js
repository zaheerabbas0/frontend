import React from 'react';
import './AllTickets.css';
import { Button, Col, Row } from 'antd';
import {
  DeleteOutlined,
  DownloadOutlined,
  FilterOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import DocumentCard from '../../../components/document/documentCard';

function MyDocument() {
  const documentData = [
    { key: 1, text: 'Contact 1' },
    { key: 2, text: 'Contact 2' },
    { key: 3, text: 'Contact 3' },
    { key: 4, text: 'Contact 4' },
    { key: 5, text: 'Contact 1' },
    { key: 6, text: 'Contact 2' },
    { key: 7, text: 'Contact 3' },
    { key: 7, text: 'Contact 4' },
    // Add more documents if needed
  ];
  return (
    <div>
      <div
        className="document-nav"
        style={{ border: ' 1px solid #EAECF0', borderRadius: '8px' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '10px',
            paddingLeft: '10px',
            paddingBottom: '20px',
          }}
        >
          <div className="alltickets-heading" style={{ marginLeft: '20px' }}>
            All Tickets
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '7px' }}>
            <Button
              className="alltickets-button"
              icon={<FilterOutlined />}
            ></Button>
            <Button
              className="alltickets-button"
              style={{ color: 'red', border: '1px solid red' }}
              icon={<DeleteOutlined />}
            ></Button>
            <Button className="alltickets-button" icon={<ShareAltOutlined />}>
              Share
            </Button>
            <Button
              className="alltickets-button"
              style={{
                backgroundColor: 'green',
                color: 'white',
                marginRight: '37px',
              }}
              icon={<DownloadOutlined />}
            >
              DownLoad
            </Button>
          </div>
        </div>
        <div style={{ padding: '20px', marginBottom: '25px' }}>
          <Row gutter={[20, 16]}>
            {documentData.map((doc) => (
              <Col xs={24} sm={12} md={8} lg={6} key={doc.key}>
                <DocumentCard text={doc.text} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default MyDocument;

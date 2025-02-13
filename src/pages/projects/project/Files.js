import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'antd';
import { Container } from '../../../styledComponents/CustomCard';
import DocumentCard from '../../../components/document/documentCard';
import AxiosInstance from '../../../appURL/AxiosInstance';
import { Project_Entity_Name } from '../../../constants/project/TitleRoutesConstants';

const Files = () => {
  const { projectId } = useParams();
  const [documentData, setDocumentData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjectFiles = async () => {
    try {
      const response = await AxiosInstance.get(
        `/api/v1/project/projects/${projectId}/files`
      );
      setDocumentData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching project files:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectFiles();
  }, [projectId]);

  return (
    <Container
      style={{
        padding: '15px',
        minHeight: '100%',
        background: '#fff',
        borderRadius: '10px',
      }}
    >
      {/* <FormHeader title="All Files" showDate={false} /> */}

      {loading ? (
        <p>Loading files...</p>
      ) : (
        <Row
          gutter={[16]}
          style={{
            justifyContent: 'flex-start',
            height: '69vh',
            overflow: 'auto',
          }}
        >
          {documentData.length > 0 ? (
            documentData.map((doc) => (
              <Col xs={24} sm={12} md={6} lg={4} key={doc.key || doc.id}>
                <DocumentCard text={doc.name} url={doc.url} />
              </Col>
            ))
          ) : (
            <div
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '14px',
                padding: '10px',
              }}
            >{`No files available for this ${Project_Entity_Name}`}</div>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Files;

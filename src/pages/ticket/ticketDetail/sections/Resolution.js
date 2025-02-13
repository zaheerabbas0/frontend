import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../../../../appURL/AxiosInstance';
import CustomAvatar from '../../../../styledComponents/CustomAvatar';
import dayjs from 'dayjs';
import CustomSpin from '../../../../styledComponents/CustomSpin';
import { AttachmentListUI } from './AttachmentList';

const Resolution = () => {
  const [loading, setLoading] = useState(true);
  const [resolutions, setResolutions] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      AxiosInstance.get(`/api/v1/ticketresolutions/${id}`)
        .then((response) => {
          setResolutions(response?.data?.data || []);
        })
        .catch((error) => {
          console.error('Error fetching resolution:', error);
          setResolutions([]);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <CustomSpin spinning={loading}>
      <div style={{ maxHeight: '20vw', flexGrow: '1', overflowY: 'auto' }}>
        {resolutions.length > 0 ? (
          resolutions.map((resolution) => (
            <div key={resolution.id}>
              <div
                style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
              >
                <CustomAvatar
                  name={resolution.user_name}
                  image_url={resolution.user_image_url}
                  size="medium"
                />
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: '500' }}>
                    {resolution.user_name}
                  </span>
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#BEBEBE',
                      fontWeight: '500',
                    }}
                  >
                    {dayjs(resolution.created_at).format('DD/MM/YYYY')} on{' '}
                    {dayjs(resolution.created_at).format('HH:mm A')}
                  </p>
                </div>
              </div>
              <p style={{ margin: '12px 0' }}>{resolution.content}</p>
              {resolution.files && resolution.files.length > 0 ? (
                <AttachmentListUI
                  attachmentsData={resolution.files}
                  handleFileDelete={() => {}}
                />
              ) : (
                <div
                  style={{
                    fontWeight: 'normal',
                    fontStyle: 'italic',
                    fontSize: '13px',
                    textAlign: 'center',
                  }}
                >
                  No attachments{' '}
                </div>
              )}
            </div>
          ))
        ) : (
          <div
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '14px',
              padding: '10px',
            }}
          >
            No resolutions yet
          </div>
        )}
      </div>
    </CustomSpin>
  );
};

export default Resolution;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { List, Typography, Space } from 'antd';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../../../../appURL/AxiosInstance';
import AttachmentPin from '../../../../assets/AttachmentPinIcon.svg';
import AttachmentEye from '../../../../assets/AttachmentEyeIcon.svg';
import AttachmentDelete from '../../../../assets/AttachmentDeleteIcon.svg';
import CustomSpin from '../../../../styledComponents/CustomSpin';
import Swal from 'sweetalert2';

const { Text } = Typography;

const AttachmentList = () => {
  const { id } = useParams();
  const [attachmentsData, setAttachmentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchTicketFiles = async () => {
    try {
      const response = await AxiosInstance.get(
        `/api/v1/ticket/tickets/${id}/files`
      );
      setAttachmentsData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ticket files:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketFiles();
  }, [id]);

  const handleFileDelete = async (fileId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this file',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await AxiosInstance.delete(
            `/api/v1/ticket/delete-ticket-file/${fileId}`
          );
          setAttachmentsData((prevData) =>
            prevData.filter((file) => file.id !== fileId)
          );
          Swal.fire({
            title: 'Deleted!',
            text: 'File has been deleted.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete the file.', 'error');
        }
      }
    });
  };

  return (
    <CustomSpin spinning={loading}>
      {/* <List
        style={{ marginTop: '0px', maxheight: '200px', overflowY: 'auto' }}
        dataSource={attachmentsData}
        renderItem={(item) => (
          <AttachmentItem>
            <Space>
              <img src={AttachmentPin} alt="pin" />

              <FileName>{item.name}</FileName>
            </Space>
            <Space size="small">
              <IconWrapper onClick={() => handleView(item.url)}>
                <img src={AttachmentEye} alt="eye" />
              </IconWrapper>
              <IconWrapper>
                <img
                  onClick={() => handleFileDelete(item.id)}
                  src={AttachmentDelete}
                  alt="delete"
                />
              </IconWrapper>
            </Space>
          </AttachmentItem>
        )}
      /> */}
      <AttachmentListUI
        attachmentsData={attachmentsData}
        handleFileDelete={handleFileDelete}
      />
    </CustomSpin>
  );
};

export default AttachmentList;

export function AttachmentListUI({
  attachmentsData,
  handleFileDelete = () => {},
}) {
  const handleView = (url) => {
    window.open(url, '_self');
  };
  return (
    <List
      style={{ marginTop: '0px', maxheight: '200px', overflowY: 'auto' }}
      dataSource={attachmentsData}
      renderItem={(item) => (
        <AttachmentItem>
          <Space>
            <img src={AttachmentPin} alt="pin" />

            <FileName>{item.name}</FileName>
          </Space>
          <Space size="small">
            <IconWrapper onClick={() => handleView(item.url)}>
              <img src={AttachmentEye} alt="eye" />
            </IconWrapper>
            {/* <IconWrapper>
              <img
                onClick={() => handleFileDelete(item.id)}
                src={AttachmentDelete}
                alt="delete"
              />
            </IconWrapper> */}
          </Space>
        </AttachmentItem>
      )}
    />
  );
}

const AttachmentItem = styled(List.Item)`
  background-color: #f7f7f7;
  border-radius: 8px;
  margin-bottom: 18px !important;
  padding: 12px 16px !important;
  justify-content: space-between;
  border: none !important;
`;
const FileName = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  line-height: 118.5%;
  color: #0d062d;
  text-transform: capitalize;
  padding-left: 8px;
`;

const IconWrapper = styled.span`
  cursor: pointer;
  color: #999;
  transition: color 0.3s;

  &:hover {
    color: #1890ff;
  }
`;

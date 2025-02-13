import React, { useState } from 'react';
import AddOptionModal from '../../../modals/AddOptionModal';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { updateForApproval } from '../../../reduxToolkit/features/TicketSlice';
import { Resolution_Comment_Name } from '../../../constants/ticket/FieldsLabelsConstants';

export const RESOLUTION_MODE = 'resolution';
export const COMMENT_MODE = 'comment';

const ResolutionModal = ({ open, close, mode = RESOLUTION_MODE }) => {
  const dispatch = useDispatch();

  const [loading, setLoadng] = useState(false);
  const [attachmentFile, setAttachmentFile] = useState([]);

  const { id: ticketId } = useParams();

  const userInfo = JSON.parse(localStorage.getItem('user_info'));
  const currentUserId = userInfo?.role_id;

  const formConfig = [
    {
      label: `${Resolution_Comment_Name}`,
      name: 'comment',
      type: 'input',
      placeholder: `Enter ${Resolution_Comment_Name}`,
      rules: [
        {
          required: true,
          message: `Please write a  ${Resolution_Comment_Name}`,
        },
      ],
    },
    {
      label: 'Attachment',
      name: 'attachment',
      type: 'dragger',
      valuePropName: 'fileList',
      props: {
        accept: '.pdf, image/png, image/jpeg',
        mode: 'multiple',
        onFileChange: setAttachmentFile,
      },
    },
  ];
  const onFinish = async (values) => {
    setLoadng(true);

    const processedAttachments = attachmentFile.map((file) => ({
      file_name: file.file_name || file.name,
      file_url: file.file_url,
    }));

    const payload = {
      ...values,
      user_id: currentUserId,
      ticket_id: ticketId,
      attachment_file: processedAttachments,
    };

    if (mode === RESOLUTION_MODE) {
      dispatch(updateForApproval(payload))
        .unwrap()
        .then(() => {
          message.success('Resolution created successfully');
          close();
        })
        .catch((error) => {
          message.error(
            'Failed to create resolution: ' +
              (error.response?.data?.message || error.message)
          );
        })
        .finally(() => {
          setLoadng(false);
        });
    } else {
      console.log('OPEN AGAIN FLOW');
    }
  };

  return (
    <AddOptionModal
      open={open}
      setAddCategoryModal={close}
      title={
        mode === RESOLUTION_MODE
          ? 'Create new Resolution'
          : `Create ${Resolution_Comment_Name}`
      }
      formConfig={formConfig}
      onFinish={onFinish}
      confirmLoading={loading}
    />
  );
};

export default ResolutionModal;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Modal } from 'antd';
import dayjs from 'dayjs';
import CustomTextArea from '../../../../styledComponents/CustomTextArea';
import { CustomButton } from '../../../../styledComponents/CustomButton';
import { useParams } from 'react-router-dom';
import {
  handlePostComment,
  handleEditComment,
  handleDeleteComment,
} from '../../../../utils/TicketUtils';
import CustomAvatar from '../../../../styledComponents/CustomAvatar';
import { noWhitespaceValidator } from '../../../../utils/Utils';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const TicketComments = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id } = useParams();
  const comments = useSelector((state) => state.ticket.comments[id] || []);
  const ticket = useSelector((state) =>
    state.ticket.tickets.find((ticket) => ticket.id === parseInt(id))
  );

  const [commentLoading, setCommentLoading] = useState(false);
  const [editingComment, setEditingComment] = useState(null);

  // Get current user ID from local storage
  const currentUser = JSON.parse(localStorage.getItem('user_info'));
  const currentUserId = currentUser?.id;

  const handleCommentSubmit = () => {
    setCommentLoading(true);
    handlePostComment(form, dispatch, id, ticket, editingComment).finally(
      () => {
        setCommentLoading(false);
        setEditingComment(null);
      }
    );
  };

  const handleEditSubmit = () => {
    form.validateFields().then((values) => {
      handleEditComment(editingComment.id, values.comment, dispatch).finally(
        () => {
          setEditingComment(null);
          form.resetFields();
        }
      );
    });
  };

  const startEdit = (comment) => {
    setEditingComment(comment);
    form.setFieldsValue({ comment: comment.content });
  };

  const handleDelete = (commentId) => {
    Modal.confirm({
      title: 'Delete Comment',
      content: 'Are you sure you want to delete this comment?',
      okText: 'Yes',
      cancelText: 'No',
      centered: true,
      onOk: async () => {
        try {
          await handleDeleteComment(commentId, dispatch);
        } catch (error) {
          console.error('Error deleting comment:', error);
        }
      },
    });
  };

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} style={{ marginBottom: '10px' }}>
              <div
                style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
              >
                <CustomAvatar
                  key={comment.id}
                  name={comment.user_name}
                  image_url={comment.user_image_url}
                  size="medium"
                />
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: '500' }}>{comment.user_name}</span>
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#BEBEBE',
                      fontWeight: '500',
                    }}
                  >
                    {dayjs(comment.created_at).format('DD/MM/YYYY')} on{' '}
                    {dayjs(comment.created_at).format('HH:mm A')}
                  </p>
                </div>
                {comment.user_id === currentUserId && (
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <Button size="small" onClick={() => startEdit(comment)}>
                      <EditOutlined />
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleDelete(comment.id)}
                    >
                      <DeleteOutlined />
                    </Button>
                  </div>
                )}
              </div>
              {editingComment?.id === comment.id ? (
                <Form
                  form={form}
                  onFinish={handleEditSubmit}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '10px',
                  }}
                />
              ) : (
                <p>{comment.content}</p>
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
            No comments yet
          </div>
        )}
      </div>

      <Form
        style={{ marginRight: '10px', flexShrink: 0, marginTop: 'auto' }}
        form={form}
        name="commentsForm"
        onFinish={editingComment ? handleEditSubmit : handleCommentSubmit}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Form.Item
            name="comment"
            rules={[
              { required: true, message: '' },
              { validator: noWhitespaceValidator('Comment') },
            ]}
            style={{ flex: 1, marginRight: '10px' }}
          >
            <CustomTextArea
              height={'45px'}
              placeholder="Type your comments here..."
            />
          </Form.Item>

          <CustomButton
            style={{ marginBottom: '10px' }}
            variant=""
            htmlType="submit"
            loading={commentLoading}
          >
            {editingComment ? 'Update' : 'Post'}
          </CustomButton>
        </div>
      </Form>
    </div>
  );
};

export default TicketComments;

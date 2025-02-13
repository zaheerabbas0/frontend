import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddOptionModal from '../AddOptionModal';
import { message } from 'antd';
import { createGroup } from '../../reduxToolkit/features/GroupSlice';

const AddGroupModal = ({ open, close }) => {
  const userData = JSON.parse(localStorage.getItem('user_info'));
  const currentUserId = userData?.id;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const groupFormConfig = [
    {
      label: 'Add Group',
      name: 'name',
      type: 'input',
      placeholder: 'Enter Group Name',
      rules: [
        { required: true, message: 'Please enter Group' },
        {
          pattern: /^.{1,20}$/,
          message: 'Group Name must be up to 20 characters.',
        },
        {
          pattern: /^(?! )/,
          message: 'Group Name cannot start with a space.',
        },
        {
          pattern: /^(?!.*  )/,
          message: 'Group Name cannot have consecutive spaces.',
        },
      ],
    },
  ];

  const onFinish = async (values) => {
    const payload = { ...values, user_id: currentUserId };
    setLoading(true);
    try {
      const response = await dispatch(createGroup(payload)).unwrap();
      message.success(response.message);
      close();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddOptionModal
      open={open}
      setAddCategoryModal={close}
      title="Add new Group"
      formConfig={groupFormConfig}
      onFinish={onFinish}
      confirmLoading={loading}
    />
  );
};

export default AddGroupModal;

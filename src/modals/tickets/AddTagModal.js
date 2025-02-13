import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddOptionModal from '../AddOptionModal';
import { message } from 'antd';
import { addTags } from '../../reduxToolkit/features/TagSlice';

const AddTagModal = ({ open, close }) => {
  const userData = JSON.parse(localStorage.getItem('user_info'));
  const currentUserId = userData?.id;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const formConfig = [
    {
      label: 'Add Tag ',
      name: 'name',
      type: 'input',
      placeholder: 'Enter Tag',
      rules: [
        { required: true, message: 'Please enter Tag' },
        {
          pattern: /^.{1,15}$/,
          message: 'Tag Name must be up to 15 characters.',
        },
        {
          pattern: /^(?! )/,
          message: 'Tag Name cannot start with a space.',
        },
        {
          pattern: /^(?!.*  )/,
          message: 'Tag Name cannot have consecutive spaces.',
        },
      ],
    },
    {
      label: 'Pick Color ',
      name: 'hex_code',
      type: 'colorpicker',
      defaultValue: '#229849',
      rules: [
        { required: true, message: 'Please select color' },
        {
          pattern:
            /^(?!#(?:[DdEeFf][0-9A-Fa-f]{2}[0-9A-Fa-f]{2}|[EeFf]{6}|FFFFFF|ffffff|[EeFf]{2}[0-9A-Fa-f]{2}[EeFf]{2}))/,
          message: 'White and very light colors are not allowed.',
        },
      ],
    },
  ];

  const onFinish = async (values) => {
    const payload = { ...values, user_id: currentUserId };
    setLoading(true);
    try {
      const response = await dispatch(addTags(payload)).unwrap();
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
      title="Add new Tag"
      formConfig={formConfig}
      onFinish={onFinish}
      confirmLoading={loading}
    />
  );
};

export default AddTagModal;

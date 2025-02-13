import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSkill } from '../../reduxToolkit/features/SkillSlice';
import AddOptionModal from '../AddOptionModal';
import { message } from 'antd';

const AddSkillModal = ({ open, close }) => {
  const userData = JSON.parse(localStorage.getItem('user_info'));
  const currentUserId = userData?.id;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const formConfig = [
    {
      label: 'Add Skills',
      name: 'name',
      type: 'input',
      placeholder: 'Enter Skill',
      rules: [
        { required: true, message: 'Please enter Skill' },
        {
          pattern: /^.{1,20}$/,
          message: 'Skill Name must be up to 20 characters.',
        },
        {
          pattern: /^(?! )/,
          message: 'Skill Name cannot start with a space.',
        },
        {
          pattern: /^(?!.*  )/,
          message: 'Skill Name cannot have consecutive spaces.',
        },
      ],
    },
  ];

  const onFinish = async (values) => {
    const payload = { ...values, created_by_id: currentUserId };
    setLoading(true);
    try {
      const response = await dispatch(addSkill(payload)).unwrap();
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
      title="Add new Skill"
      formConfig={formConfig}
      onFinish={onFinish}
      confirmLoading={loading}
    />
  );
};

export default AddSkillModal;

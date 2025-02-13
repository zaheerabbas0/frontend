import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSla } from '../../reduxToolkit/features/SlaSlice';
import AddOptionModal from '../AddOptionModal';
import { message, Form } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const AddSlaModal = ({ open, close }) => {
  const userData = JSON.parse(localStorage.getItem('user_info'));
  const currentUserId = userData?.id;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const disabledHours = () => {
    const hours = [0];
    for (let i = 13; i < 24; i++) {
      hours.push(i);
    }
    return hours;
  };

  const formConfig = [
    {
      label: 'SLA Tag',
      name: 'name',
      type: 'input',
      placeholder: 'Enter SLA Tag',
      rules: [{ required: true, message: 'Please enter SLA Tag!' }],
    },
    {
      label: 'Enter Hours To Respond',
      name: 'duration',
      type: 'input',
      format: 'HH',
      placeholder: 'Select Hours',
      rules: [
        { required: true, message: 'Please enter numbre of Hours to Respond!' },
      ],
    },
  ];

  const onFinish = async (values) => {
    const payload = {
      ...values,
      duration: dayjs(values.duration).hour(),
      created_by_id: currentUserId,
    };
    setLoading(true);
    try {
      const response = await dispatch(createSla(payload)).unwrap();
      if (response?.message) {
        message.error(response.message);
        return;
      }
      message.success('SLA created successfully');
      close();
    } catch (error) {
      console.error('Error in SLA creation:', error);
      const errorMessage = error?.message || 'An unexpected error occurred.';

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddOptionModal
      open={open}
      close={close}
      title="Create New SLA"
      formConfig={formConfig}
      onFinish={onFinish}
      confirmLoading={loading}
    />
  );
};

export default AddSlaModal;

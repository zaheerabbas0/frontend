import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPriority } from '../../reduxToolkit/features/PrioritySlice';
import AddOptionModal from '../AddOptionModal';
import { message, Form } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const AddPriorityModal = ({ open, close }) => {
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
      label: 'Priority Tag',
      name: 'name',
      type: 'input',
      placeholder: 'Enter Priority Tag',
      rules: [
        { required: true, message: 'Please enter Priority Tag!' },
        {
          pattern: /^.{1,15}$/,
          message: 'Priority Tag Name must be up to 15 characters.',
        },
        {
          pattern: /^(?! )/,
          message: 'Priority Tag Name cannot start with a space.',
        },
        {
          pattern: /^(?!.*  )/,
          message: 'Priority Tag Name cannot have consecutive spaces.',
        },
      ],
    },
    {
      label: 'Hours To Respond',
      name: 'duration',
      type: 'input',
      placeholder: 'Enter Hours',
      rules: [
        { required: true, message: 'Please enter Hours to Respond!' },
        {
          pattern: /^\d+$/,
          message: 'Only numbers are allowed for Hours to Respond.',
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
    const payload = {
      ...values,
      // duration: dayjs(values.duration).hour(),
      created_by_id: currentUserId,
    };
    setLoading(true);
    try {
      const response = await dispatch(createPriority(payload)).unwrap();
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
      title="Add New Priority"
      formConfig={formConfig}
      onFinish={onFinish}
      confirmLoading={loading}
    />
  );
};

export default AddPriorityModal;

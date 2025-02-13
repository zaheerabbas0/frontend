import React, { useState, useEffect } from 'react';
import AddOptionModal from '../AddOptionModal';
import { useDispatch, useSelector } from 'react-redux';
import { addCategories } from '../../reduxToolkit/features/CategorySlice';
import { message } from 'antd';

const CreateCategoryModal = ({ addCategoryModal, setAddCategoryModal }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const formConfig = [
    {
      label: 'Category Name',
      name: 'name',
      type: 'input',
      placeholder: 'Enter Category Name',
      rules: [
        { required: true, message: 'Please enter Category Name!' },
        {
          pattern: /^.{1,20}$/,
          message: 'Category Name must be up to 20 characters.',
        },
        {
          pattern: /^(?! )/,
          message: 'Category Name cannot start with a space.',
        },
        {
          pattern: /^(?!.*  )/,
          message: 'Category Name cannot have consecutive spaces.',
        },
      ],
    },
  ];
  const { error } = useSelector((state) => state.categories);
  useEffect(() => {
    if (error) {
      message.error(error);
      setTimeout(() => {
        dispatch({ type: 'categories/resetError' });
      }, 2000);
    }
  }, [error]);

  const onFinish = async (values) => {
    setLoading(true);
    const userData = JSON.parse(localStorage.getItem('user_info'));
    const userId = userData?.id;
    const payload = {
      ...values,
      user_id: userId,
    };
    try {
      dispatch(addCategories(payload));
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
      setAddCategoryModal(false);
    }
  };

  return (
    <AddOptionModal
      open={addCategoryModal}
      close={addCategoryModal}
      title="Create New Category"
      formConfig={formConfig}
      onFinish={onFinish}
      confirmLoading={loading}
      setAddCategoryModal={setAddCategoryModal}
    />
  );
};

export default CreateCategoryModal;

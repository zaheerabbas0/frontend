import React, { useState, useEffect } from 'react';
import AddOptionModal from '../AddOptionModal';
import { useDispatch, useSelector } from 'react-redux';
import { addSubCategories } from '../../reduxToolkit/features/CategorySlice';
import { message } from 'antd';

const CreateSubCategoryModal = ({
  addSubCategoryModal,
  setAddSubCategoryModal,
  categoryID,
}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const formConfig = [
    {
      label: 'Name',
      name: 'name',
      type: 'input',
      placeholder: 'Enter SubCategory Name',
      rules: [
        { required: true, message: 'Please enter Sub Category Name!' },
        {
          pattern: /^.{1,20}$/,
          message: 'SubCategory Name must be up to 20 characters.',
        },
        {
          pattern: /^(?! )/,
          message: 'SubCategory Name cannot start with a space.',
        },
        {
          pattern: /^(?!.*  )/,
          message: 'SubCategory Name cannot have consecutive spaces.',
        },
      ],
    },
  ];

  const { subError } = useSelector((state) => state.categories);
  useEffect(() => {
    if (subError) {
      message.error(subError);
      setTimeout(() => {
        dispatch({ type: 'categories/resetSubError' });
      }, 2000);
    }
  }, [subError]);

  const onFinish = async (values) => {
    setLoading(true);

    const payload = {
      ...values,
      category_id: categoryID,
    };

    try {
      dispatch(addSubCategories(payload));
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
      setAddSubCategoryModal(false);
    }
  };

  return (
    <>
      <AddOptionModal
        open={addSubCategoryModal}
        close={addSubCategoryModal}
        title="Create Subcategory"
        formConfig={formConfig}
        onFinish={onFinish}
        confirmLoading={loading}
        setAddCategoryModal={setAddSubCategoryModal}
      />
    </>
  );
};

export default CreateSubCategoryModal;

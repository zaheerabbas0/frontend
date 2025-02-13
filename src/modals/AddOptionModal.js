import React, { useEffect } from 'react';
import { Modal, Form } from 'antd';
import { renderFormItem } from '../pages/projects/createProject/ProjectFormFields';
import CustomForm from '../styledComponents/CustomForm';

const AddOptionModal = ({
  open,
  title,
  formConfig,
  initialValues = {},
  onFinish,
  confirmLoading = false,
  setAddCategoryModal = () => {},
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <Modal
      title={title}
      visible={open}
      onCancel={() => setAddCategoryModal(false)}
      onOk={() => form.submit()}
      confirmLoading={confirmLoading}
      centered
      closable={true}
    >
      <CustomForm
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={initialValues}
        labelWrap
        style={{ padding: '20px 0' }}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{ span: 24 }}
      >
        {formConfig.map((field) => (
          <Form.Item
            key={field.name}
            label={field.label}
            name={field.name}
            style={{ marginBottom: '6px' }}
            rules={field.rules}
          >
            {renderFormItem(field)}
          </Form.Item>
        ))}
      </CustomForm>
    </Modal>
  );
};

export default AddOptionModal;

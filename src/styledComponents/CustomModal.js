import React from 'react';
import { Modal, Form, Select, DatePicker } from 'antd';
import CustomForm from './CustomForm';
import { CustomInput } from './CustomInput';
import CustomSelect from './CustomSelect';
import CustomTextArea from './CustomTextArea';
import { CustomButton } from './CustomButton';
import { dateFormat } from '../utils/Utils';
import { disabledDate, handleOpenChange } from '../utils/ContractUtils';

const { Option } = Select;

const CustomModal = ({
  isVisible,
  onClose,
  onOk,
  form,
  modalFields,
  title,
  footerButtons = [],
  okButtonText,
  buttonLoading,
  variant,
}) => {
  return (
    <Modal
      title={title}
      visible={isVisible}
      onCancel={onClose}
      footer={
        footerButtons.length > 0
          ? footerButtons.map((button, index) => (
              <CustomButton
                key={index}
                variant={button.variant}
                onClick={button.onClick}
                type={button.type}
              >
                {button.label}
              </CustomButton>
            ))
          : [
              <CustomButton variant="default" key="cancel" onClick={onClose}>
                Cancel
              </CustomButton>,
              <CustomButton
                variant={variant}
                key="ok"
                loading={buttonLoading}
                type="primary"
                onClick={onOk}
              >
                {okButtonText}
              </CustomButton>,
            ]
      }
    >
      <CustomForm form={form} layout="vertical" name="modal_form">
        {modalFields.map((field) => {
          switch (field.type) {
            case 'input':
              return (
                <Form.Item
                  name={field.name}
                  label={field.label}
                  key={field.name}
                >
                  <CustomInput placeholder={field.placeholder} />
                </Form.Item>
              );
            case 'select':
              return (
                <Form.Item
                  name={field.name}
                  label={field.label}
                  key={field.name}
                >
                  <CustomSelect placeholder={field.placeholder}>
                    {field.options.map((option) => (
                      <Option value={option.value} key={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </CustomSelect>
                </Form.Item>
              );
            case 'datePicker':
              return (
                <Form.Item
                  name={field.name}
                  label={field.label}
                  key={field.name}
                >
                  <DatePicker
                    showTime
                    format={dateFormat}
                    style={{ width: '100%' }}
                    disabledDate={disabledDate}
                    onOpenChange={handleOpenChange}
                    {...field.props}
                  />
                </Form.Item>
              );
            case 'textarea':
              return (
                <Form.Item
                  name={field.name}
                  label={field.label}
                  key={field.name}
                >
                  <CustomTextArea
                    placeholder={field.placeholder}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              );
            default:
              return null;
          }
        })}
      </CustomForm>
    </Modal>
  );
};

export default CustomModal;

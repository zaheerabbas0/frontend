import React, { useState, useEffect } from 'react';
import { Drawer, Form, Select, DatePicker } from 'antd';
import CustomForm from '../../styledComponents/CustomForm';
import { CustomInput } from '../../styledComponents/CustomInput';
import CustomSelect from '../../styledComponents/CustomSelect';
import { CustomButton } from '../../styledComponents/CustomButton';

const { Option } = Select;

const FilterDrawer = ({
  isVisible,
  onClose,
  form,
  filterFields,
  title,
  onOk,
  filterValues = {},
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (!isVisible) {
      setIsButtonDisabled(true);
    }
  }, [isVisible]);

  useEffect(() => {
    form.setFieldsValue(filterValues);
    const hasValues = Object.values(filterValues).some(
      (value) => value !== undefined && value !== ''
    );
    setIsButtonDisabled(!hasValues);
  }, [filterValues, form]);

  const handleValuesChange = (_, allValues) => {
    const hasValues = Object.values(allValues).some(
      (value) => value !== undefined && value !== ''
    );
    setIsButtonDisabled(!hasValues);
  };

  return (
    <Drawer
      title={title}
      placement="right"
      visible={isVisible}
      onClose={onClose}
      width={400}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <CustomButton
            variant="default"
            onClick={onClose}
            style={{ marginRight: 8 }}
          >
            Cancel
          </CustomButton>
          <CustomButton
            onClick={onOk}
            type="primary"
            disabled={isButtonDisabled}
          >
            Apply Filter
          </CustomButton>
        </div>
      }
    >
      <CustomForm
        form={form}
        layout="vertical"
        name="filter_form"
        onValuesChange={handleValuesChange}
      >
        {filterFields.map((field) => {
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
                  <CustomSelect
                    popupClassName="filter-dropdown"
                    placeholder={field.placeholder}
                  >
                    {field?.options?.map((option) => (
                      <Option
                        value={option.value ? option.value : option?.id}
                        key={option.value ? option.value : option?.id}
                      >
                        {option.label ? option.label : option?.name}
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
    </Drawer>
  );
};

export default FilterDrawer;

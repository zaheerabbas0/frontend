import React, { useState } from 'react';
import { Col, Form, Select } from 'antd';
import 'react-phone-input-2/lib/style.css';
import { settingFieldConfigurations } from './Fields';
import { renderFormItem } from './FormItems';

const { Option } = Select;

const SettingFormFields = ({
  fileList,
  setFileList,
  setBase64Image,
  countriesList,
  GetState,
  stateList,
  setStateList,
  GetCity,
  cityList,
  setCityList,
  country,
  setCountry,
  state,
  setState,
  city,
  setCity,
}) => {
  return (
    <>
      <Col span={24} className="image-update">
        <Form.Item name="image_base64">
          {renderFormItem(
            { type: 'upload' },
            fileList,
            setFileList,
            setBase64Image
          )}
        </Form.Item>
      </Col>

      {settingFieldConfigurations.map((field) => (
        <Col lg={12} xs={24} sm={24} key={field.name}>
          <Form.Item
            label={field.label}
            name={field.name}
            rules={field.rules}
            validateTrigger="onSubmit"
          >
            {renderFormItem(
              field,
              fileList,
              setFileList,
              setBase64Image,
              country,
              setCountry,
              state,
              setState,
              city,
              setCity,
              countriesList,
              GetState,
              stateList,
              setStateList,
              GetCity,
              cityList,
              setCityList
            )}
          </Form.Item>
        </Col>
      ))}
    </>
  );
};

export default SettingFormFields;

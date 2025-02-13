import React from 'react';
import { DatePicker, Select } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
  CustomInput,
  CustomPasswordInput,
} from '../../../../styledComponents/CustomInput';
import { disabledDate, handleOpenChange } from '../../../../utils/ProjectUtils';
import UploadPicture from '../../../../components/uploadPicture/UploadPicture';
import { dateFormat } from '../../../../utils/Utils';
// import CustomTimezone from '../../../../styledComponents/CustomTimezone';
import CustomSelect from '../../../../styledComponents/CustomSelect';
import TimezoneSelect from 'react-timezone-select';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
const { Option } = Select;

export const renderFormItem = (
  field,
  fileList,
  setFileList,
  setBase64Image
  // projects,
  // userTypes
) => {
  switch (field.type) {
    // case 'time_zone':
    // return <CustomTimezone field={field} onChange={field.onChange} />;
    case 'time_zone':
      return (
        <TimezoneSelect
          menuPlacement="top"
          placeholder={field.placeholder || ''}
        />
      );
    case 'input':
      return (
        <CustomInput
          placeholder={field.placeholder || ''}
          style={{ width: '100%' }}
        />
      );

    case 'status':
      return (
        <CustomSelect placeholder={field.placeholder}>
          {field.options.map((option) => {
            return (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            );
          })}
        </CustomSelect>
      );

    case 'select':
      return (
        <CustomSelect
          dropdownRender={field.dropdownRender}
          placeholder={field.placeholder || ''}
          style={{ width: '100%' }}
        >
          {field.options.map((option) => (
            <Option key={option?.id} value={option?.id}>
              {option?.name}
            </Option>
          ))}
        </CustomSelect>
      );
    case 'date':
      return (
        <DatePicker
          showTime
          format={dateFormat}
          style={{ width: '100%' }}
          disabledDate={disabledDate}
          onOpenChange={handleOpenChange}
        />
      );
    case 'upload':
      return (
        <UploadPicture
          fileList={fileList}
          setFileList={setFileList}
          setBase64Image={setBase64Image}
        />
      );
    case 'phone':
      return (
        <PhoneInput
          country="pk"
          inputStyle={{
            width: '100%',
            background: '#fafafa',
            borderColor: '#dfdfdf',
            borderRadius: '5px',
          }}
          inputProps={{
            name: field.name,
            required: true,
          }}
        />
      );
    case 'password':
      return (
        <CustomPasswordInput
          style={{
            padding: ' 0px 10px',
          }}
          placeholder={field.placeholder}
          iconRender={(visible) =>
            visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
          }
        />
      );
    default:
      return <CustomInput style={{ width: '100%' }} />;
  }
};

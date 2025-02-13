import React from 'react';
import { DatePicker, Select } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
  CustomInput,
  CustomPasswordInput,
} from '../../../../styledComponents/CustomInput';
import CustomSelect from '../../../../styledComponents/CustomSelect';
import { disabledDate, handleOpenChange } from '../../../../utils/ProjectUtils';
import UploadPicture from '../../../../components/uploadPicture/UploadPicture';
import { dateFormat } from '../../../../utils/Utils';
import TimezoneSelect from 'react-timezone-select';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const { Option } = Select;

export const renderFormItem = (
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
) => {
  switch (field.type) {
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
    case 'password':
      return (
        <CustomPasswordInput
          style={{
            padding: ' 0px 11px',
          }}
          placeholder={field.placeholder}
          iconRender={(visible) =>
            visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
          }
        />
      );

    case 'select':
      return (
        <CustomSelect
          placeholder={field.placeholder || ''}
          style={{ width: '100%' }}
        >
          {field.options.map((option) => (
            <Option key={option} value={option}>
              {option}
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
            padding: ' 0px 0px 0px 48px',
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

    case 'country':
      return (
        <CustomSelect
          value={country}
          onChange={(val) => {
            const selectedCountry = countriesList.find(
              (option) => option.id === val
            );
            setCountry(selectedCountry);
            GetState(val).then((result) => {
              setStateList(result);
            });
          }}
          placeholder={field.placeholder || ''}
          showSearch
          style={{ width: '100%' }}
          optionFilterProp="children"
        >
          {countriesList.map((option) => (
            <Option key={option.id} value={option.id}>
              {option.name}
            </Option>
          ))}
        </CustomSelect>
      );
    case 'state':
      return (
        <CustomSelect
          value={state}
          onChange={(val) => {
            const selectedState = stateList.find((option) => option.id === val);
            setState(selectedState);
            GetCity(country.id, val).then((result) => {
              setCityList(result);
            });
          }}
          placeholder={field.placeholder || ''}
          showSearch
          style={{ width: '100%' }}
          optionFilterProp="children"
        >
          {stateList &&
            stateList.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
            ))}
        </CustomSelect>
      );
    case 'city':
      return (
        <CustomSelect
          value={city}
          onChange={(val) => {
            const selectedCity = cityList.find((option) => option.id === val);
            setCity(selectedCity);
          }}
          placeholder={field.placeholder || ''}
          showSearch
          style={{ width: '100%' }}
          optionFilterProp="children"
        >
          {cityList &&
            cityList.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.name}
              </Option>
            ))}
        </CustomSelect>
      );
    default:
      return <CustomInput style={{ width: '100%' }} />;
  }
};

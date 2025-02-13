import { React, useState } from 'react';
import {
  Col,
  Form,
  DatePicker,
  Select,
  Input,
  Switch,
  Row,
  Tooltip,
} from 'antd';
import {
  CustomInput,
  CustomPasswordInput,
} from '../../../styledComponents/CustomInput';
import CustomSelect from '../../../styledComponents/CustomSelect';
import UploadPicture from '../../../components/uploadPicture/UploadPicture';
import { handleOpenChange } from '../../../utils/ProjectUtils';
import { dateFormat, getStatusStyles } from '../../../utils/Utils';
import CustomForm from '../../../styledComponents/CustomForm';
import CustomSpin from '../../../styledComponents/CustomSpin';
import CustomDragger from '../../../styledComponents/CustomDragger';
import CustomTextArea from '../../../styledComponents/CustomTextArea';
import PhoneInput from 'react-phone-input-2';
import TimezoneSelect from 'react-timezone-select';
import { GetState, GetCity } from 'react-country-state-city';
import CustomColorPicker from '../../../styledComponents/CustomColorPicker';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

const { Option } = Select;

export const renderFormItem = (
  field,
  fileList,
  setFileList,
  setBase64Image,
  onFileChange,
  notifyExpire,
  countriesList,
  stateList,
  setStateList,
  cityList,
  setCityList,
  country,
  setCountry,
  state,
  setState,
  city,
  setCity,
  onNotifyExpireChange = () => {}
) => {
  switch (field.type) {
    case 'input':
      return (
        <CustomInput
          placeholder={field.placeholder}
          type={field.inputType}
          suffix={field.suffixIcon}
          {...field.props}
        />
      );
    case 'time_zone':
      return (
        <TimezoneSelect
          menuPlacement="top"
          placeholder={field.placeholder || ''}
        />
      );
    case 'colorpicker':
      return <CustomColorPicker defaultValue={field.defaultValue} />;
    case 'phone':
      return (
        <PhoneInput
          country="pk"
          inputStyle={{
            width: '100%',
            height: '42px',
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
    case 'select':
      return (
        <CustomSelect
          placeholder={field.placeholder}
          mode={field?.mode}
          dropdownRender={field.dropdownRender}
          maxTagCount="responsive"
          maxTagPlaceholder={(omittedValues) => {
            const names = omittedValues
              .map((option) =>
                typeof option?.label === 'string'
                  ? option.label
                  : option?.label?.props?.children || 'Unknown'
              )
              .join(', ');

            return (
              <Tooltip title={names}>
                <span>+{omittedValues.length}</span>
              </Tooltip>
            );
          }}
        >
          {field.options.map((option) => {
            const { color } = getStatusStyles(option.name);
            return (
              <Option
                key={option?.id || option?.value}
                value={option?.id || option?.value}
                style={{
                  color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2px',
                }}
              >
                {field.renderOptions ? (
                  field.renderOptions(option)
                ) : (
                  <span>{option?.name}</span>
                )}
              </Option>
            );
          })}
        </CustomSelect>
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
    case 'date':
      return (
        <DatePicker
          showTime
          format={dateFormat}
          placeholder={field.placeholder}
          // disabledDate={disabledDate}
          onOpenChange={handleOpenChange}
          style={{ width: '100%' }}
          {...field.props}
        />
      );
    case 'upload':
      return (
        <UploadPicture
          showUserIcon={field.showUserIcon}
          fileList={fileList}
          setFileList={setFileList || (() => {})}
          setBase64Image={setBase64Image}
          {...field.props}
        />
      );
    case 'dragger':
      return <CustomDragger {...field.props} />;
    case 'textarea':
      return (
        <CustomTextArea placeholder={field.placeholder || ''} height="120px" />
      );
    case 'notify_expire':
      return (
        <Switch
          id={`switch-${field.name}`}
          checkedChildren="Yes"
          unCheckedChildren="No"
          onChange={onNotifyExpireChange}
        />
      );
    case 'switch':
      return (
        <Switch
          id={`switch-${field.name}`}
          checkedChildren="Yes"
          unCheckedChildren="No"
          onChange={
            field.name === 'notify_expire' ? onNotifyExpireChange : () => {}
          }
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
          {countriesList &&
            countriesList.map((option) => (
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
      return <Input placeholder={field.placeholder} />;
  }
};

export const defaultResponsiveness = { lg: 12, md: 24, sm: 24, xs: 24 };

const ProjectFormFields = ({
  fileList,
  setFileList,
  setBase64Image,
  onValuesChange = () => {},
  fieldConfiguration,
  form,
  spin,
  onFileChange = () => {},
  updateNotify = false,
  countriesList,
  stateList,
  setStateList,
  cityList,
  setCityList,
  country,
  setCountry,
  state,
  setState,
  city,
  setCity,
}) => {
  const [notifyExpire, setNotifyExpire] = useState(updateNotify);
  const handleNotifyExpireChange = (checked) => {
    setNotifyExpire(checked);
  };
  return (
    <CustomForm
      form={form}
      layout="vertical"
      style={{ overflow: 'hidden', width: '100%', flexShrink: 0 }}
      onValuesChange={onValuesChange}
    >
      <CustomSpin spinning={spin}>
        <Row gutter={[20, 0]} style={{ padding: '15px 3px' }}>
          {fieldConfiguration.map((field) => {
            if (
              field.name === 'notify_expiry' ||
              field.name === 'notify_before'
            ) {
              if (!notifyExpire) return null;
            }
            return (
              <>
                <Col
                  {...(field?.responsiveness || defaultResponsiveness)}
                  key={field.name}
                  style={field.colStyles || { position: 'relative' }}
                >
                  <Form.Item
                    label={field.label}
                    name={field.name}
                    rules={field.rules}
                    validateTrigger="onSubmit"
                    className={
                      field.name.endsWith('image_url') ||
                      field.name.endsWith('image_base64')
                        ? 'upload-project'
                        : ''
                    }
                    layout={field?.Layout}
                    valuePropName={field.valuePropName || 'value'}
                    getValueFromEvent={field.getValueFromEvent}
                    {...field.formItemsProps}
                  >
                    {renderFormItem(
                      field,
                      fileList,
                      setFileList,
                      setBase64Image,
                      onFileChange,
                      notifyExpire,
                      countriesList,
                      stateList,
                      setStateList,
                      cityList,
                      setCityList,
                      country,
                      setCountry,
                      state,
                      setState,
                      city,
                      setCity,
                      handleNotifyExpireChange
                    )}
                  </Form.Item>

                  {field.type === 'switch' && (
                    <label
                      htmlFor={`switch-${field.name}`}
                      style={{
                        fontWeight: '500',
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      {field.labelAfter}
                    </label>
                  )}
                </Col>
              </>
            );
          })}
        </Row>
      </CustomSpin>
    </CustomForm>
  );
};
export default ProjectFormFields;

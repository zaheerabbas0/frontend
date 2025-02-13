import React from 'react';
import { DatePicker, Tag, Button, Select } from 'antd';
import CustomDragger from '../../../../styledComponents/CustomDragger';
import { CustomInput } from '../../../../styledComponents/CustomInput';
import CustomSelect from '../../../../styledComponents/CustomSelect';
import CustomTextArea from '../../../../styledComponents/CustomTextArea';
// import TimezoneSelect from 'react-timezone-select';
import {
  dateFormat,
  // getPriorityStyles,
  // getStatusStyles,
} from '../../../../utils/Utils';
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  TagOutlined,
} from '@ant-design/icons';
import {
  disabledDate,
  handleOpenChange,
} from '../../../../utils/ContractUtils';
import CustomTimezone from '../../../../styledComponents/CustomTimezone';

const { Option } = Select;

export const renderFormItem = (
  field,
  slaTypes,
  users,
  projects,
  customers,
  contracts,
  addAddress,
  handleAddAddress,
  onFileChange,
  handleGenerateTemplate,
  templates = [],
  isGeneratingTemplate,
  updateSelectedTemplate,
  // handleSLATypeChange
  handleProjectChange,
  onTimezoneChange,
  dateDisabled = false
) => {
  switch (field.type) {
    case 'input':
      return (
        <CustomInput placeholder={field.placeholder || ''} {...field.props} />
      );
    case 'select':
      return (
        <CustomSelect
          allowClear
          mode={field.mode}
          placeholder={field.placeholder || ''}
          dropdownRender={field?.dropdownRender}
          {...field.props}
        >
          {field.name === 'user_ids' && users.length > 0
            ? users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.name}
                </Option>
              ))
            : field.name === 'project_id' && projects.length > 0
              ? projects.map((project) => (
                  <Option key={project.id} value={project.id}>
                    {project.name}
                  </Option>
                ))
              : field.name === 'customer_id' && customers.length > 0
                ? customers.map((customer) => (
                    <Option key={customer.id} value={customer.id}>
                      {customer.name}
                    </Option>
                  ))
                : field.name === 'contract_id' && contracts.length > 0
                  ? contracts.map((contract) => (
                      <Option key={contract.id} value={contract.id}>
                        {contract.name}
                      </Option>
                    ))
                  : field.options.map((option) => (
                      <Option
                        key={option.value ? option.value : option.id}
                        value={option.value ? option.value : option.id}
                      >
                        {option.name ? option.name : option}
                      </Option>
                    ))}
        </CustomSelect>
      );
    case 'status':
      return (
        <CustomSelect placeholder={field.placeholder}>
          {field.options.map((option) => {
            return (
              <Option
                key={option}
                value={option?.value}
                disabled={option?.isDisabled}
                style={{
                  display: option?.isDisabled ? 'none' : '',
                }}
              >
                {option.name}
              </Option>
            );
          })}
        </CustomSelect>
      );

    case 'tag_ids':
      return (
        <CustomSelect placeholder={field.placeholder} mode={field.mode}>
          {field.options.map((option) => {
            const styles =
              // getTagStyles
              option.value;
            return (
              <Option key={option.key} value={option.key}>
                <Tag
                  color={styles.backgroundColor}
                  style={{ color: styles.color }}
                >
                  <TagOutlined /> {option.value}
                </Tag>
              </Option>
            );
          })}
        </CustomSelect>
      );
    case 'add_address':
      return (
        <Button
          onClick={handleAddAddress}
          style={{ width: '100%', marginTop: '20px', background: '#FAFAFA' }}
        >
          {addAddress ? (
            <>
              <MinusCircleOutlined /> Close Address
            </>
          ) : (
            <>
              <PlusCircleOutlined /> Add Address
            </>
          )}
        </Button>
      );

    case 'user_type_id':
      return (
        <CustomSelect
          placeholder={field.placeholder || ''}
          allowClear
          style={{ width: '100%' }}

          // onChange={(v) => handleSLATypeChange(v)}
        >
          {slaTypes.map((type) => (
            <Option key={type.id} value={type.id}>
              {`${type.name} - ${type.duration} Hours`}
            </Option>
          ))}
        </CustomSelect>
      );
    case 'date':
      return (
        <DatePicker showTime format={dateFormat} style={{ width: '100%' }} />
      );
    case 'due_date':
      return (
        <DatePicker
          showTime
          format={dateFormat}
          style={{ width: '100%' }}
          disabled={dateDisabled}
          disabledDate={disabledDate}
          onOpenChange={handleOpenChange}
        />
      );
    case 'time_zone':
      return (
        <CustomTimezone
          menuPlacement="top"
          placeholder={field.placeholder || ''}
          onChange={onTimezoneChange}
        />
      );
    case 'textarea':
      return <CustomTextArea placeholder={field.placeholder || ''} />;
    case 'dragger':
      return <CustomDragger mode="multiple" onFileChange={onFileChange} />;
    case 'template':
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: isGeneratingTemplate ? '6px' : '14px',
          }}
        >
          {isGeneratingTemplate ? (
            <CustomInput placeholder="Enter template name" />
          ) : (
            <CustomSelect
              placeholder="Select Template"
              onChange={(value) => updateSelectedTemplate(value)}
            >
              {Array.isArray(templates) &&
                templates?.map((option, i) => (
                  <Option key={i} value={i}>
                    {option.template}
                  </Option>
                ))}
            </CustomSelect>
          )}
          <button
            type="button"
            style={{
              background: 'none',
              color: '#4CAF50',
              display: 'flex',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={handleGenerateTemplate}
          >
            <span style={{ marginRight: '5px' }}>+</span>
            {isGeneratingTemplate ? 'Create Ticket' : ' Create Template'}
          </button>
        </div>
      );
    default:
      return (
        <CustomInput
          placeholder={field.placeholder || ''}
          defaultValue={'asdasd'}
        />
      );
  }
};

// case 'prioity':
//   return (
//     <CustomSelect placeholder={field.placeholder}>
//       {field.options.map((option) => {
//         const { color, backgroundColor } = getPriorityStyles(option);
//         return (
//           <Option key={option} value={option}>
//             <Tag color={backgroundColor} style={{ color }}>
//               <FlagOutlined /> {option}
//             </Tag>
//           </Option>
//         );
//       })}
//     </CustomSelect>
//   );

import React, { useState } from 'react';
import { Col, Form } from 'antd';
import styled from 'styled-components';
import { renderFormItem } from './FormItems';
// import styles from './CreateTicket.module.css';

const StyledFormItem = styled(Form.Item)`
  // .ant-row.ant-form-item-row {
  //   gap: 6px;
  // }

  // .ant-form-item-label > label {
  //   font-family: 'Rubik', sans-serif;
  //   font-weight: 400;
  //   font-size: 14px;
  //   line-height: 16.59px;
  // }
`;

const TicketFormFields = ({
  columnSpan = 12,
  fields,
  ticketExcludedFields = [],
  slaTypes = [],
  users = [],
  projects,
  customers,
  contracts,
  onFileChange,
  isGeneratingTemplate,
  templates,
  handleGenerateTemplate,
  updateSelectedTemplate,
  handleProjectChange = () => {},
  onTimezoneChange,
}) => {
  const [addAddress, setaddAddress] = useState(false);

  const handleAddAddressChange = () => {
    setaddAddress(!addAddress);
  };

  const filteredFields = fields?.filter(
    (field) => !ticketExcludedFields.includes(field.name)
  );

  return (
    <>
      {filteredFields?.map((field) => {
        if (field.isAddress === 'true' && !addAddress) {
          return null;
        }

        return (
          <Col
            lg={field.columnSpan || columnSpan}
            xs={24}
            sm={24}
            key={field.name}
          >
            <StyledFormItem
              label={field.name === 'add_address' ? null : field.label}
              name={field.name}
              rules={field.rules}
              validateTrigger="onSubmit"
            >
              {renderFormItem(
                field,
                slaTypes,
                users,
                // filteredUsers,
                projects,
                customers,
                contracts,
                addAddress,
                handleAddAddressChange,
                onFileChange,
                handleGenerateTemplate,
                templates,
                isGeneratingTemplate,
                updateSelectedTemplate,
                // handleSLATypeChange
                handleProjectChange,
                onTimezoneChange,
                field.disabled
              )}
            </StyledFormItem>
          </Col>
        );
      })}
    </>
  );
};

export default TicketFormFields;

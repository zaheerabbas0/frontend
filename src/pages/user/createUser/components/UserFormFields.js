import React from 'react';
import { Col, Form } from 'antd';
import 'react-phone-input-2/lib/style.css';
import { userFieldConfigurations } from './Fields';
import { renderFormItem } from './FormItems';
import useCheckStateStatus, {
  SKILL_STATE,
  GROUPS_STATE,
  ADMIN_STATE,
} from '../../../../hooks/useCheckStateStatus';

// const { Option } = Select;

const UserFormFields = ({
  fileList,
  setFileList,
  setBase64Image,
  // projects,
  // userTypes,
  openSkillModal,
  openGroupModal,
}) => {
  const { admins } = useCheckStateStatus([ADMIN_STATE]);
  const { skills } = useCheckStateStatus([SKILL_STATE]);
  const { groups } = useCheckStateStatus([GROUPS_STATE]);
  return (
    <>
      <Col span={24} className="upload-user">
        <Form.Item name="image_base64">
          {renderFormItem(
            { type: 'upload' },
            fileList,
            setFileList,
            setBase64Image
          )}
        </Form.Item>
      </Col>

      {userFieldConfigurations(
        admins,
        skills,
        groups,
        openSkillModal,
        openGroupModal
      ).map((field) => (
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
              setBase64Image
              // projects,
              // userTypes
            )}
          </Form.Item>
        </Col>
      ))}
    </>
  );
};

export default UserFormFields;

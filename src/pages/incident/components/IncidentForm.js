import { Col, Form, Row } from 'antd';
import CustomForm from '../../../styledComponents/CustomForm';
import FormHeader from '../../../components/ui/Form/FormHeader';
import {
  CenteredButtonContainer,
  CustomButton,
} from '../../../styledComponents/CustomButton';
import {
  defaultResponsiveness,
  renderFormItem,
} from '../../projects/createProject/ProjectFormFields';
import { fieldsConfiguration } from './FormField';
import { useNavigate } from 'react-router-dom';
import useCheckStateStatus, {
  PROJECT_STATE,
} from '../../../hooks/useCheckStateStatus';
import useIncidentApis from '../../../utils/IncidentUtils';

const IncidentForm = () => {
  const navigate = useNavigate();

  const [incidentForm] = Form.useForm();

  const { createIncident } = useIncidentApis();

  const onFinish = async (values) => {
    const userData = JSON.parse(localStorage.getItem('user_info'));
    const currentUserId = userData?.id;
    const formData = {
      ...values,
      admin_id: userData.created_by_id,
      customer_id: currentUserId,
    };
    createIncident(formData);
  };
  return (
    <>
      <FormHeader title={'Report Problem'} renderChildrenOnLeft>
        <span style={{ marginLeft: 'auto' }} />
      </FormHeader>

      <Col
        span={18}
        style={{ margin: 'auto', alignItems: 'center', width: '70%' }}
      >
        <CustomForm form={incidentForm} layout="vertical" onFinish={onFinish}>
          <FromFields />
          <CenteredButtonContainer>
            <CustomButton
              variant="default"
              width="120px"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </CustomButton>
            <CustomButton width="120px" marginLeft="35px" htmlType="submit">
              Create
            </CustomButton>
          </CenteredButtonContainer>
        </CustomForm>
      </Col>
    </>
  );
};
export default IncidentForm;

const FromFields = () => {
  const { projects } = useCheckStateStatus([PROJECT_STATE]);
  return (
    <Row gutter={[35, 0]}>
      {fieldsConfiguration(projects).map((field) => (
        <Col
          {...(field?.responsiveness || defaultResponsiveness)}
          key={field.name}
          style={{ position: 'relative' }}
        >
          <Form.Item
            label={field.label}
            name={field.name}
            rules={field.rules}
            validateTrigger="onSubmit"
            layout={field?.Layout}
            valuePropName={field.type === 'switch' ? 'checked' : 'value'}
          >
            {renderFormItem(
              field
              // [],
              // () => {},
              // () => {},
              // () => {},
              // '',
              // () => {}
            )}
          </Form.Item>
          {field.customButton ? (
            <CustomButton
              variant="inputTag"
              onClick={field.customButton.onclick}
              style={{
                position: 'absolute',
                right: field.customButton.align === 'right' ? '0px' : '',
                bottom: '-11px',
              }}
            >
              {field.customButton.label}
            </CustomButton>
          ) : null}
        </Col>
      ))}
    </Row>
  );
};

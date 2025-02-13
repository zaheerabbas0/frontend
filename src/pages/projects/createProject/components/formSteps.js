import { CheckCircleOutlined } from '@ant-design/icons';
import { Progress, Steps } from 'antd';
import styled from 'styled-components';
import {
  CREATE_CONTRACT,
  // CREATE_CUSTOMER,
  EDIT_CONTRACT,
  // EDIT_CUSTOMER,
  EDIT_PROJECT,
} from '../CreateProject';
import { Project_Entity_Name } from '../../../../constants/project/TitleRoutesConstants';

const { Step } = Steps;
const StyledSteps = styled(Steps)`
  margin-bottom: 15px;
  border-bottom: 1px solid gray;
  padding-top: 8px !important;
  .ant-steps-item-icon {
    width: 28px !important;
    height: 28px !important;
  }
  .ant-steps-icon {
    top: -1.6px !important;
  }
  .ant-steps-item-title {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 16px;
    // line-height: 15.4px;
  }
  .ant-steps-item::before {
    display: none !important;
    background-color: #229849 !important;
  }
  .ant-steps-item::after {
    display: none !important;
    width: 0;
    height: 0;
  }
  .ant-steps-item-process .ant-steps-item-icon {
    background-color: #229849 !important;
  }
`;

const FormSteps = ({ progressPercent, currentStep, mode, id }) => {
  const renderSteps = () => {
    switch (mode) {
      case EDIT_PROJECT:
        return (
          <Step
            title={`${id ? 'Edit' : 'Create'} ${Project_Entity_Name}`}
            icon={<CheckCircleOutlined style={{ color: '#229849' }} />}
          />
        );
      // case EDIT_CUSTOMER:
      // case CREATE_CUSTOMER:
      //   return (
      //     <Step
      //       title={`${id ? 'Edit' : 'Create'}  ${Customer_Entity_Name}`}
      //       icon={<CheckCircleOutlined style={{ color: '#229849' }} />}
      //     />
      //   );
      case EDIT_CONTRACT:
      case CREATE_CONTRACT:
        return (
          <Step
            title={`${id ? 'Edit' : 'Create'} Contract`}
            icon={<CheckCircleOutlined style={{ color: '#229849' }} />}
          />
        );
      default:
        return (
          <>
            <Step
              title={`${id ? 'Edit' : 'Create'} ${Project_Entity_Name}`}
              icon={
                currentStep > 1 ? (
                  <CheckCircleOutlined style={{ color: '#229849' }} />
                ) : undefined
              }
            />
            {/* <Step
              title={`${id ? 'Edit' : 'Create'}  ${Customer_Entity_Name}`}
              icon={
                currentStep > 2 ? (
                  <CheckCircleOutlined style={{ color: '#229849' }} />
                ) : undefined
              }
            />
            <Step
              title={`${id ? 'Edit' : 'Create'} Contract`}
              icon={
                currentStep > 3 ? (
                  <CheckCircleOutlined style={{ color: '#229849' }} />
                ) : undefined
              }
            /> */}
            <Step
              title={`${id ? 'Edit' : 'Create'} Contract`}
              icon={
                currentStep > 2 ? (
                  <CheckCircleOutlined style={{ color: '#229849' }} />
                ) : undefined
              }
            />
          </>
        );
    }
  };
  return (
    <>
      <Progress
        percent={progressPercent}
        showInfo={false}
        strokeWidth={5}
        strokeColor="#229849"
        style={{ marginTop: '-10px' }}
      />
      <StyledSteps
        type="navigation"
        current={mode ? currentStep : currentStep - 1}
        className="create-project-steps"
        style={{ borderColor: '#1C1C1C1A', padding: '0 3%' }}
      >
        {renderSteps()}
      </StyledSteps>
    </>
  );
};
export default FormSteps;

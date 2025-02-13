import React from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import FormHeader from '../../../components/ui/Form/FormHeader';
import { CustomButton } from '../../../styledComponents/CustomButton';
import './styles.css';

const SettingsPageWrapper = ({
  buttonText = 'no text provided',
  buttonAction = () => console.log('no action function provided'),
  showEdtButton = false,
  pageTitle = 'Title',
  children,
}) => {
  return (
    <div className="settings-page-container">
      <FormHeader
        title={pageTitle}
        showDate={false}
        style={{ justifyContent: 'flex-start' }}
        renderChildrenOnLeft={true}
        withBackButton={false}
      >
        <div
          style={{
            display: 'flex',
            width: '100% ',
            justifyContent: 'flex-end',
          }}
        >
          <div>
            <CustomButton
              icon={<PlusOutlined />}
              variant="inputTag"
              onClick={buttonAction}
            >
              {buttonText}
            </CustomButton>
            &nbsp; &nbsp;
            {/* {showEdtButton && (
              <CustomButton icon={<EditOutlined />}>Edit</CustomButton>
            )} */}
          </div>
        </div>
      </FormHeader>
      {children}
      {/* <Pagefooter /> */}
    </div>
  );
};

export default SettingsPageWrapper;

function Pagefooter() {
  return <div>footer</div>;
}

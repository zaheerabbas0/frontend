import React, { useEffect, useState } from 'react';
import { Form, Row, Col, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdmins } from '../../../reduxToolkit/features/AdminSlice';
import CustomForm from '../../../styledComponents/CustomForm';
import { handleAdminForm } from '../../../utils/AdminUtils';
import CustomSpin from '../../../styledComponents/CustomSpin';
import {
  CustomButton,
  CenteredButtonContainer,
} from '../../../styledComponents/CustomButton';
import { convertImageToBase64 } from '../../../utils/Utils';
import FormHeader from '../../../components/ui/Form/FormHeader';
import StyledCard from '../../../styledComponents/StyledCard';
import { renderFormItem } from '../../projects/createProject/ProjectFormFields';
import { adminFieldConfigurations } from './Fields';
import styles from './CreateAdmin.module.css';

const CreateAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [adminForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [base64Image, setBase64Image] = useState(null);
  const [fileList, setFileList] = useState([]);

  const admin = useSelector((state) =>
    state.admin.admins.find((admin) => admin.id === parseInt(id))
  );

  useEffect(() => {
    if (id && admin) {
      const [gmtOffset, timeZone] = admin.time_zone
        ? admin.time_zone.match(/\(([^)]+)\)\s(.+)/).slice(1, 3)
        : [null, null];

      const formattedTimeZone =
        gmtOffset && timeZone
          ? { value: timeZone, label: admin.time_zone }
          : undefined;

      adminForm.setFieldsValue({
        ...admin,
        designation_id: admin.designation.name,
        time_zone: formattedTimeZone,
        password: admin.static_password,
      });

      if (admin.image_url) {
        setFileList([{ url: admin.image_url }]);
        convertImageToBase64(admin.image_base64)
          .then((base64) => {
            setBase64Image(base64);
          })
          .catch((error) => {
            console.error('Error converting image to base64:', error.message);
          });
      }
    } else if (id && !admin) {
      dispatch(fetchAdmins());
    }
  }, [id, admin, dispatch, adminForm]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem('user_info'));
      const currentUserId = userData?.id;
      if (!currentUserId) {
        message.error('User data not found.');
        return;
      }
      const formData = {
        ...values,
        role_name: 'Admin',
        created_by_id: currentUserId,
        phone: values.phone.toString(),
        image_base64: base64Image ? base64Image : null,
        time_zone: values?.time_zone ? values.time_zone.label : '',
      };
      await handleAdminForm(formData, id, dispatch, navigate);
    } catch (error) {
      message.error(`Error submitting form ${error.response}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '1vw' }}>
      <StyledCard styles={{ minHeight: '38vh' }}>
        <CustomSpin spinning={loading}>
          <Row className={styles.create_admin}>
            <FormHeader
              title={id ? 'Update Admin' : 'Create Admin'}
              id={id}
              renderChildrenOnLeft
            >
              <span style={{ marginLeft: 'auto' }} />
            </FormHeader>
            <Col span={18}>
              <CustomForm
                layout="vertical"
                form={adminForm}
                onFinish={onFinish}
              >
                <Row gutter={[35, 0]}>
                  {adminFieldConfigurations().map((field) => (
                    <Col
                      sm={field.colSpan || 24}
                      md={field.colSpan || 12}
                      lg={field.colSpan || 12}
                      xl={field.colSpan || 12}
                      key={field.name}
                    >
                      <Form.Item
                        label={field.label}
                        name={field.name}
                        rules={field.rules}
                        className={
                          field.name.endsWith('image_url') ||
                          field.name.endsWith('image_base64')
                            ? styles.upload_user
                            : ''
                        }
                        validateTrigger="onSubmit"
                      >
                        {renderFormItem(
                          field,
                          fileList,
                          setFileList,
                          setBase64Image
                        )}
                      </Form.Item>
                    </Col>
                  ))}
                </Row>

                <CenteredButtonContainer margin="5.6vw 0px 0px 0px">
                  <CustomButton
                    variant="default"
                    width="120px"
                    type="button"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </CustomButton>
                  <CustomButton
                    width="120px"
                    marginLeft="35px"
                    htmlType="submit"
                  >
                    {id ? 'Update' : 'Create'}
                  </CustomButton>
                </CenteredButtonContainer>
              </CustomForm>
            </Col>
          </Row>
        </CustomSpin>
      </StyledCard>
    </div>
  );
};

export default CreateAdmin;

import React, { useEffect, useState } from 'react';
import { Form, Row, Col, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchProjects } from '../../../reduxToolkit/features/ProjectSlice';
import { fetchUsers } from '../../../reduxToolkit/features/UserSlice';
import CustomForm from '../../../styledComponents/CustomForm';
import { handleUserForm } from '../../../utils/UserUtils';
import CustomSpin from '../../../styledComponents/CustomSpin';
import {
  CustomButton,
  CenteredButtonContainer,
} from '../../../styledComponents/CustomButton';
import { convertImageToBase64 } from '../../../utils/Utils';
import FormHeader from '../../../components/ui/Form/FormHeader';
import UserFormFields from './components/UserFormFields';
import './CreateUser.css';
import AddSkillModal from '../../../modals/userModals/AddSkillModal';
import AddGroupModal from '../../../modals/userModals/AddGroupModal';
import useCheckStateStatus, {
  PROJECT_STATE,
} from '../../../hooks/useCheckStateStatus';
import StyledCard from '../../../styledComponents/StyledCard';
import { User_Entity_Name } from '../../../constants/user/TitleRoutesConstants';

// export const userTypes = [
//   { key: 1, value: 'L1' },
//   { key: 2, value: 'L2' },
//   { key: 3, value: 'L3' },
// ];

const CreateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [userForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [base64Image, setBase64Image] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);

  const user = useSelector((state) =>
    state.user.users.find((user) => user.id === parseInt(id))
  );

  // const projects = useSelector((state) => state.project.projects);
  const { projects } = useCheckStateStatus([PROJECT_STATE]);

  useEffect(() => {
    if (id && user) {
      // const projectIds = user.projects
      //   ? user.projects.map((project) => project.id)
      //   : [];
      // Find the key for user_type_id using the label

      // const selectedUserType = userTypes.find(
      //   (type) => type.value === user.user_type_id
      // );
      const [gmtOffset, timeZone] = user.time_zone
        ? user.time_zone.match(/\(([^)]+)\)\s(.+)/).slice(1, 3)
        : [null, null];

      const formattedTimeZone =
        gmtOffset && timeZone
          ? { value: timeZone, label: user.time_zone }
          : undefined;

      userForm.setFieldsValue({
        ...user,
        designation_id: user.designation.id,
        group_id: user.group.id,
        time_zone: formattedTimeZone,
        password: user.static_password,
        // user_type_id: selectedUserType
        //   ? selectedUserType.key
        //   : user.user_type_id,
        // project_ids: projectIds,
      });
      // console.log("userfrom", userForm.getFieldsValue());

      if (user.image_url) {
        setFileList([{ url: user.image_url }]);
        convertImageToBase64(user.image_base64)
          .then((base64) => {
            setBase64Image(base64);
          })
          .catch((error) => {
            console.error('Error converting image to base64:', error);
          });
      }
    } else if (id && !user) {
      dispatch(fetchUsers());
    }
  }, [id, user, dispatch, userForm]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem('user_info'));
      const currentUserId = userData?.id;
      if (!currentUserId) {
        message.error('Data ot found.');
        return;
      }

      // Ensure we're sending the key for user_type_id, not the value
      // const selectedUserType = userTypes.find(
      //   (type) =>
      //     type.key === values.user_type_id || type.value === values.user_type_id
      // );
      // console.log("LOGGING TIME", values);

      const formData = {
        role_id: 2,
        ...values,
        created_by_id: currentUserId,
        phone: values.phone.toString(),
        image_base64: base64Image ? base64Image : null,
        time_zone: values?.time_zone ? values.time_zone.label : '',
        // project_ids: Array.isArray(values.project_ids)
        //   ? values.project_ids
        //   : [values.project_ids],
        // user_type_id: selectedUserType
        //   ? selectedUserType.key
        //   : values.user_type_id,
      };

      // console.log('formData', formData);

      await handleUserForm(formData, id, dispatch, navigate);
    } catch (error) {
      message.error(`Error submitting form ${error.response}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomSpin spinning={loading}>
      <div style={{ margin: '1vw' }}>
        <StyledCard>
          <Row className="create-user">
            <FormHeader
              title={
                id ? `Update ${User_Entity_Name}` : `Create ${User_Entity_Name}`
              }
              id={id}
              renderChildrenOnLeft
            >
              <span style={{ marginLeft: 'auto' }} />
            </FormHeader>

            <Col span={18}>
              <CustomForm form={userForm} layout="vertical" onFinish={onFinish}>
                <Row gutter={[35, 0]}>
                  <UserFormFields
                    fileList={fileList}
                    setFileList={setFileList}
                    setBase64Image={setBase64Image}
                    projects={projects}
                    openSkillModal={() => setShowSkillModal(true)}
                    openGroupModal={() => setShowGroupModal(true)}
                  />
                </Row>
                <CenteredButtonContainer>
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
        </StyledCard>
      </div>
      <AddSkillModal
        open={showSkillModal}
        close={() => setShowSkillModal(false)}
      />
      <AddGroupModal
        open={showGroupModal}
        close={() => setShowGroupModal(false)}
      />
    </CustomSpin>
  );
};

export default CreateUser;

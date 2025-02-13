import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Tag, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContracts } from '../../../reduxToolkit/features/ContractSlice';
import 'sweetalert2/dist/sweetalert2.min.css';
import CustomForm from '../../../styledComponents/CustomForm';
import { handleContractForm } from '../../../utils/ContractUtils';
import CustomSpin from '../../../styledComponents/CustomSpin';
import {
  CustomButton,
  CenteredButtonContainer,
} from '../../../styledComponents/CustomButton';
import './CreateContract.css';
import ContractFormFields from './ContractFormFields';
import dayjs from 'dayjs';
import { fetchUsers } from '../../../reduxToolkit/features/UserSlice';
import { fetchCustomers } from '../../../reduxToolkit/features/CustomerSlice';
import { CardTitle } from '../../../components/ui/typography';
import FormHeader from '../../../components/ui/Form/FormHeader';

const CreateContract = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [contractForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [attachmentFile, setAttachmentFile] = useState([]);
  const [autoRenew, setAutoRenew] = useState(true);

  const contract = useSelector((state) =>
    state.contract.contracts.find((contract) => contract.id === parseInt(id))
  );
  const customers = useSelector((state) => state.customer.customers);
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    if (id && contract) {
      const customerId = contract.customer ? contract.customer.id : null;
      const visibleUserIds = contract.visible_users
        ? contract.visible_users.map((user) => user.id)
        : [];
      const collaboratorIds = contract.collaborators
        ? contract.collaborators.map((user) => user.id)
        : [];
      contractForm.setFieldsValue({
        ...contract,
        start_date: contract.start_date ? dayjs(contract.start_date) : null,
        due_date: contract.due_date ? dayjs(contract.due_date) : null,
        customer_id: customerId,
        visible_to_ids: visibleUserIds,
        collaborator_ids: collaboratorIds,
        auto_renew: contract.auto_renew,
      });
      setAttachmentFile(contract.attachment_file || null);
      setAutoRenew(contract.auto_renew);
    } else if (id && !contract) {
      dispatch(fetchContracts());
    }
    dispatch(fetchCustomers());
    dispatch(fetchUsers());
  }, [id, contract, dispatch, contractForm]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem('user_info'));
      const currentUserId = userData?.id;
      if (!currentUserId) {
        return;
      }
      const formattedDueDate = values.due_date
        ? dayjs(values.due_date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        : null;
      const formattedStartDate = values.start_date
        ? dayjs(values.start_date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        : null;
      const formData = {
        ...values,
        auto_renew: autoRenew ? 'True' : 'False',
        created_by_id: currentUserId,
        attachment_file: attachmentFile,
        due_date: formattedDueDate,
        start_date: formattedStartDate,
      };
      if (id) {
        await handleContractForm({ id, ...formData }, id, dispatch, navigate);
      } else {
        await handleContractForm(formData, id, dispatch, navigate);
      }
    } catch (error) {
      message.error(`Error submitting form ${error.response}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomSpin spinning={loading}>
      <Row className="create-contract">
        <Col span={24}>
          <Row className="create-contract-header">
            <FormHeader
              title={id ? 'Update Contract' : 'Create Contract'}
              id={id}
            />
          </Row>
        </Col>

        <Col span={18}>
          <CustomForm form={contractForm} layout="vertical" onFinish={onFinish}>
            <Row gutter={[24, 0]}>
              <ContractFormFields
                customers={customers}
                users={users}
                autoRenew={autoRenew}
                onAutoRenewChange={setAutoRenew}
                onFileChange={setAttachmentFile}
              />
            </Row>
            <CenteredButtonContainer margin="2vw 0vw 0.2vw 0vw">
              <CustomButton
                variant="default"
                width="120px"
                type="button"
                onClick={() => navigate('/supportx/contracts')}
              >
                Cancel
              </CustomButton>
              <CustomButton width="120px" marginLeft="20px" htmlType="submit">
                {id ? 'Update' : 'Create'}
              </CustomButton>
            </CenteredButtonContainer>
          </CustomForm>
        </Col>
      </Row>
    </CustomSpin>
  );
};

export default CreateContract;

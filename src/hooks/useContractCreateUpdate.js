import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { message } from 'antd';
import { handleContractForm } from '../utils/ContractUtils';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { fetchProjects } from '../reduxToolkit/features/ProjectSlice';
import { PROJECT_BASE_URL } from '../pages/projects/createProject/CreateProject';
import { handleMultiSelectWithAll } from '../utils/ProjectUtils';

const useContractCreateUpdate = ({
  id,
  NewProjectId,
  contractForm,
  contract,
  setLoading,
  setAttachmentFile,
  attachmentFile,
  users,
  projectId,
  setStartDate,
  setValues,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('user_info'));
  const currentUserId = userData?.id;

  useEffect(() => {
    if (id && contract) {
      const customerId = contract.customer ? contract.customer.id : null;
      console.log('LOG Contract', contract);
      const visibleUserIds = contract.visible_to
        ? contract.visible_to.map((user) => user.id)
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
        notify_expire: contract.notify_expiry ? true : false,
        // attachment_file:contract.attachment_file ? contract.attachment_file:null
      });
      setAttachmentFile(
        contract.attachment_file
          ? [{ file_name: contract.attachment_file }]
          : []
      );
      if (contract?.start_date) {
        setStartDate(dayjs(contract.start_date));
      }

      let valuesForUpdateChecking = {
        attachment_file: contract.attachment_file,
        auto_renew: contract.auto_renew,
        collaborator_ids: contract.collaborators
          ? contract.collaborators.map((user) => user.id)
          : [],
        contract_type: contract.contract_type,
        cost: contract.cost,
        due_date: contract.due_date ? dayjs(contract.due_date) : null,
        name: contract.name,
        notify_expire: contract.notify_expiry ? true : false,
        start_date: contract.start_date ? dayjs(contract.start_date) : null,
        status: contract.status,
        vendor_name: contract.vendor_name,
        visible_to_ids: contract.visible_to
          ? contract.visible_to.map((user) => user.id)
          : [],
      };
      setValues(valuesForUpdateChecking);
      // setAutoRenew(contract.auto_renew);
    }
  }, [id, contract, dispatch, contractForm, setAttachmentFile]);

  const onContractFinish = async (values) => {
    let hasError;
    setLoading(true);
    try {
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
        auto_renew: values.auto_renew ? 'true' : 'false',
        // notify_expiry: values.notify_expiry ? "true" : "false",
        created_by_id: currentUserId,
        attachment_file: attachmentFile[0]?.file_url,
        due_date: formattedDueDate ? formattedDueDate.toString() : null,
        start_date: formattedStartDate,
        // project_ids: NewProjectId.current,
        project_ids: Array.isArray(NewProjectId.current)
          ? NewProjectId.current.map((id) => parseInt(id))
          : [parseInt(NewProjectId.current)],
        visible_to_ids: handleMultiSelectWithAll(values.visible_to_ids, users),
        collaborator_ids: handleMultiSelectWithAll(
          values?.collaborator_ids,
          users
        ),
      };

      await handleContractForm(formData, id, dispatch, navigate);
      dispatch(fetchProjects());
    } catch (error) {
      message.error(
        `Error submitting form: ${error.message || error.response}`
      );
      hasError = true;
    } finally {
      setLoading(false);
      !hasError &&
        navigate(
          `${PROJECT_BASE_URL}${parseInt(
            projectId ? projectId : NewProjectId.current
          )}`
        );
    }
  };

  return { onContractFinish };
};

export default useContractCreateUpdate;

import React, { useEffect, useState } from 'react';
import { Col, Form, message, Row } from 'antd';
import styles from './CreateTicket.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TicketFormFields from './components/TicketFormFields';
import CustomForm from '../../../styledComponents/CustomForm';
import { fetchTickets } from './../../../reduxToolkit/features/TicketSlice';
import { handleTicketForm } from './../../../utils/TicketUtils';
import CustomSpin from '../../../styledComponents/CustomSpin';
import { CustomButton } from '../../../styledComponents/CustomButton';
import dayjs from 'dayjs';
import FormHeader from '../../../components/ui/Form/FormHeader';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import useTicketTemplate from '../../../hooks/useFormTemplate';
import { leftColumnFields, rightColumnFields } from './components/Fields';
import { OVERDUE_Key } from '../../../constants/FieldOptionConstants';
import useCheckStateStatus, {
  CATEGORY_STATE,
  CONTRACTS_STATE,
  CUSTOMERS_STATE,
  PRIORITY_STATE,
  PROJECT_STATE,
  TAGS_STATE,
  USER_STATE,
} from '../../../hooks/useCheckStateStatus';
import CreateCategoryModal from '../../../modals/tickets/addCategoryModal';
import CreateSubCategoryModal from '../../../modals/tickets/addSubCategoryModal';
import AddPriorityModal from '../../../modals/tickets/AddPriorityModal';
import AddTagModal from '../../../modals/tickets/AddTagModal';
import CustomCheckbox from '../../../styledComponents/CustomCheckbox';
import { ticketExcludedFields } from '../../../constants/ticket/TicketExcludedFields';

export const Category = 'category';
export const Subcategory = 'subCategory';
export const TAG = 'tag';
export const PRIORITY_MODAL = 'priority';

const CreateTicket = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [ticketForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState(null);

  const [attachmentFile, setAttachmentFile] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [showDates, setShowDates] = useState(null);
  const [activeModal, setActiveModal] = useState('');
  const { height } = useWindowDimensions();

  const [timezone, setTimezone] = useState(null);

  const handleTimezoneChange = (timezone) => {
    setTimezone(timezone);
  };

  const {
    isGeneratingTemplate,
    templates,
    selectedTemplate,
    handleGenerateTemplate,
    updateSelectedTemplate,
  } = useTicketTemplate();

  const ticket = useSelector((state) => {
    const ticketById = state.ticket.tickets?.find(
      (ticket) => ticket.id === parseInt(id)
    );
    return (
      ticketById ||
      state.ticket.approvals?.find((ticket) => ticket.id === parseInt(id))
    );
  });

  const {
    users,
    customers,
    projects,
    contracts,
    categories,
    tags,
    priorities,
  } = useCheckStateStatus([
    USER_STATE,
    CUSTOMERS_STATE,
    PROJECT_STATE,
    CONTRACTS_STATE,
    CATEGORY_STATE,
    TAGS_STATE,
    PRIORITY_STATE,
  ]);

  useEffect(() => {
    if (id && ticket) {
      const projectId = ticket.project ? ticket.project?.id : null;
      const categoryId = ticket.category ? ticket.category?.id : null;
      const subcategoryId = ticket.sub_category
        ? ticket.sub_category?.id
        : null;
      // let selectedPriority = priorities.filter((p) => p?.id === projectId);

      setSelectedPriority([ticket.sla]);
      setCategory(categoryId);
      const status = ticket.status === OVERDUE_Key ? null : ticket.status;

      const [gmtOffset, timeZone] = ticket.time_zone
        ? ticket.time_zone?.match(/\(([^)]+)\)\s(.+)/).slice(1, 3)
        : [null, null];
      const formattedTimeZone =
        gmtOffset && timeZone
          ? { value: timeZone, label: ticket.time_zone }
          : undefined;

      ticketForm.setFieldsValue({
        ...ticket,
        time_zone: formattedTimeZone,
        user_type_id: ticket.sla?.id,
        category_id: categoryId,
        sub_category_id: subcategoryId,
        name: ticket.subject,
        project_id: projectId,
        user_ids: ticket.assignees.map((assignee) => assignee.id) || [],
        tag_ids: ticket.tags.map((tag) => tag.id),
        start_date: ticket.start_date ? dayjs(ticket.start_date) : null,
        close_date: ticket.close_date ? dayjs(ticket.close_date) : null,
        // due_date: ticket.due_date ? dayjs(ticket.due_date) : null,
        notify_to: ticket.email,
      });
      setAttachmentFile(ticket.attachment_file || null);
    } else if (id && !ticket) {
      dispatch(fetchTickets());
    }
    // dispatch(fetchUsers());
    // dispatch(fetchContracts());
    // dispatch(fetchProjects());
    // dispatch(fetchCustomers());
  }, [id, ticket, dispatch, ticketForm]);

  useEffect(() => {
    if (selectedTemplate) {
      setSelectedPriority([selectedTemplate.sla]);
      setCategory(selectedTemplate.category?.id);
      const templateWithFormattedDueDate = {
        ...selectedTemplate,
        user_type_id: selectedTemplate.sla?.id,
        name: selectedTemplate.subject,
        category_id: selectedTemplate.category
          ? selectedTemplate.category?.id
          : null,
        sub_category_id: selectedTemplate.sub_category
          ? selectedTemplate.sub_category?.id
          : null,
        start_date: selectedTemplate.start_date
          ? dayjs(selectedTemplate.start_date)
          : null,
        close_date: selectedTemplate.close_date
          ? dayjs(selectedTemplate.close_date)
          : null,
        // due_date: selectedTemplate.due_date
        //   ? dayjs(selectedTemplate.due_date)
        //   : null,
        // contract_id: selectedTemplate.contract
        //   ? selectedTemplate.contract.id
        //   : null,
        // customer_id: selectedTemplate.customer
        //   ? selectedTemplate.customer.id
        //   : null,
        project_id: selectedTemplate.project
          ? selectedTemplate.project.id
          : null,
        user_ids:
          selectedTemplate.assignees.map((assignee) => assignee.id) || [],
        tag_ids: selectedTemplate.tags.map((tag) => tag.id),
        notify_to: selectedTemplate.email,
      };
      ticketForm.setFieldsValue(templateWithFormattedDueDate);
    }
  }, [selectedTemplate, ticketForm]);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const userData = JSON.parse(localStorage.getItem('user_info'));
      const currentUserId = userData?.id;
      if (!currentUserId) {
        message.error('User data not found.');
        return;
      }
      const formattedStartDate = values.start_date
        ? dayjs(values.start_date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        : null;
      const formattedDueDate =
        showDates && values.close_date
          ? dayjs(values.close_date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
          : values.due_date
            ? dayjs(values.due_date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
            : null;

      const formattedAttachments = attachmentFile
        ? attachmentFile.map((file) => ({
            file_name: file.file_name,
            file_url: file.file_url,
          }))
        : [];

      let formData = {
        ...values,
        attachment_file: formattedAttachments,
        created_by_id: ticket?.created_by_id
          ? ticket.created_by_id
          : currentUserId,
        // user_type_id: values.priority,
        start_date: formattedStartDate,
        due_date: formattedDueDate,
        time_zone: values?.time_zone ? values.time_zone.label : '',
      };
      if (isGeneratingTemplate) {
        formData = { ...formData, template_name: values.template };
        await handleTicketForm(formData, id, dispatch, navigate, true);
        ticketForm.resetFields();
      } else {
        if (id) {
          await handleTicketForm(
            { id, ...formData },
            id,
            dispatch,
            navigate,
            false
          );
        } else {
          await handleTicketForm(formData, id, dispatch, navigate, false);
        }
      }
    } catch (error) {
      message.error(`Error submitting form ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getGutterSize = () => {
    if (height < 768) return [16, 6];
    if (height < 1080) return [24, 14];
    return [32, 24];
  };

  const handlePriorityChange = (value) => {
    if (!value) {
      setSelectedPriority(null);
    } else {
      let selectedpriority = priorities.filter((p) => p?.id === value);
      setSelectedPriority(selectedpriority); // Update selected SLA type
    }
  };

  // Filter users based on selected SLA type
  let filteredSlas = selectedPriority ? selectedPriority[0]?.duration : null;

  if (filteredSlas) {
    ticketForm.setFieldsValue({
      sla_time_priority: `${filteredSlas} hours to resolve`,
    });
  }

  const handleCheckboxChange = (e) => {
    setShowDates(e.target.checked);
  };

  const openModal = (modalName) => {
    setActiveModal(modalName); // Set the active modal name
  };

  let filteredLeftColumns = leftColumnFields(
    showDates,
    isGeneratingTemplate,
    tags,
    categories,
    priorities,
    category,
    setCategory,
    handlePriorityChange,
    openModal
  );

  if (!showDates) {
    filteredLeftColumns = filteredLeftColumns.slice(2);
  }

  const closeModal = () => {
    setActiveModal('');
  };

  return (
    <>
      <CustomSpin spinning={loading}>
        <CustomForm form={ticketForm} layout="vertical" onFinish={onFinish}>
          <Row className={styles.create_ticket}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={15}
              xl={16}
              className={styles.left_create}
            >
              <FormHeader
                style={{ display: 'flex', flexWrap: 'wrap' }}
                renderChildrenOnLeft={true}
                title={
                  isGeneratingTemplate
                    ? 'New Ticket Template'
                    : id
                      ? 'Update Ticket'
                      : 'Create Ticket'
                }
                id={id}
              >
                {!isGeneratingTemplate && (
                  <CustomCheckbox
                    onChange={handleCheckboxChange}
                    style={{
                      marginLeft: 'auto',
                      marginRight: '10px',
                    }}
                  />
                )}
                Back Dated Ticket
                <span style={{ marginLeft: 'auto' }}></span>
              </FormHeader>

              <Row gutter={getGutterSize()}>
                <TicketFormFields
                  projects={projects}
                  customers={customers}
                  contracts={contracts}
                  fields={filteredLeftColumns}
                  ticketExcludedFields={ticketExcludedFields}
                  isGeneratingTemplate={isGeneratingTemplate}
                  templates={templates}
                  handleGenerateTemplate={handleGenerateTemplate}
                  updateSelectedTemplate={updateSelectedTemplate}
                  handleProjectChange={handlePriorityChange}
                  handleTimezoneChange={handleTimezoneChange}
                />
              </Row>
              <Row justify="end">
                <Col className={styles.ticketFormBtns}>
                  <CustomButton
                    variant="default"
                    width="110px"
                    type="button"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </CustomButton>
                  <CustomButton
                    width={isGeneratingTemplate ? '130px' : '110px'}
                    margin="5px 0px 3px 20px"
                    htmlType="submit"
                    className={styles.ticketBtns}
                  >
                    {isGeneratingTemplate
                      ? 'Create Template'
                      : id
                        ? 'Update'
                        : 'Create'}
                  </CustomButton>
                </Col>
              </Row>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={8}
              xl={7}
              className={styles.right_assign}
            >
              <FormHeader
                withBackButton={false}
                title="Assign"
                showDate={false}
              />
              <Row gutter={getGutterSize()}>
                <TicketFormFields
                  fields={rightColumnFields}
                  ticketExcludedFields={ticketExcludedFields}
                  // slaTypes={filteredSlas}
                  columnSpan={24}
                  users={users}
                  onFileChange={setAttachmentFile}
                />
              </Row>
            </Col>
          </Row>
        </CustomForm>
      </CustomSpin>

      {/* MODALS */}
      <CreateCategoryModal
        addCategoryModal={activeModal === Category}
        setAddCategoryModal={closeModal}
      />
      <CreateSubCategoryModal
        addSubCategoryModal={activeModal === Subcategory}
        setAddSubCategoryModal={closeModal}
        categoryID={category}
      />
      <AddTagModal open={activeModal === TAG} close={closeModal} />
      <AddPriorityModal
        open={activeModal === PRIORITY_MODAL}
        close={closeModal}
      />
    </>
  );
};

export default CreateTicket;

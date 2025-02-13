import React, { useEffect, useRef, useState } from 'react';
import { Form, Row, Col, message } from 'antd';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  handleMultiSelectWithAll,
  handleProjectForm,
} from '../../../utils/ProjectUtils';
import {
  CustomButton,
  CenteredButtonContainer,
} from '../../../styledComponents/CustomButton';
import ProjectFormFields from './ProjectFormFields';
import dayjs from 'dayjs';
import { convertImageToBase64 } from '../../../utils/Utils';
import './CreateProject.css';
import FormHeader from '../../../components/ui/Form/FormHeader';
import {
  projectFieldConfigurations,
  customerFieldConfigurations,
  contractFieldConfigurations,
} from './fieldsConfiguration';
import FormSteps from './components/formSteps';
import useCheckStateStatus, {
  CONTRACTS_STATE,
  CUSTOMERS_STATE,
  PROJECT_STATE,
  SLA_STATE,
  USER_STATE,
} from '../../../hooks/useCheckStateStatus';
// import useCustomerCreateUpdate from '../../../hooks/useCustmerCreateUpdate';
import useContractCreateUpdate from '../../../hooks/useContractCreateUpdate';
import AddSlaModal from '../../../modals/projectModals/AddSlaModal';
import useFormChanged from '../../../hooks/useFormChanged';
import {
  Project_Entity_Name,
  Project_Route_Name,
} from '../../../constants/project/TitleRoutesConstants';

export const PROJECT_BASE_URL = `/supportx/${Project_Route_Name}/`;
export const EDIT_PROJECT = 'editProject';
export const EDIT_CUSTOMER = 'editCustomer';
export const CREATE_CUSTOMER = 'createCustomer';
export const CREATE_CONTRACT = 'createContract';
export const EDIT_CONTRACT = 'editContract';

const stepAsPerMode = {
  [EDIT_PROJECT]: 1,
  // [EDIT_CUSTOMER]: 2,
  // [CREATE_CUSTOMER]: 2,
  // [EDIT_CONTRACT]: 3,
  // [CREATE_CONTRACT]: 3,
  [EDIT_CONTRACT]: 2,
  [CREATE_CONTRACT]: 2,
};

const CreateProject = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const projectId = location?.state?.projectId;
  const contract = location?.state?.contract;
  const [projectForm] = Form.useForm();
  const [customerForm] = Form.useForm();
  const [contractForm] = Form.useForm();
  const dispatch = useDispatch();
  const [attachmentFile, setAttachmentFile] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [base64Image, setBase64Image] = useState(null);
  // const totalSteps = 3;
  const totalSteps = 2;
  const [currentStep, setCurrentStep] = useState(
    mode ? stepAsPerMode[mode] : 1
  );
  const [showModal, setShowModal] = useState(false);

  const [startDate, setStartDate] = useState(null);

  const userData = JSON.parse(localStorage.getItem('user_info'));
  const currentUserId = userData?.id;
  const NewProjectId = useRef(
    mode === CREATE_CUSTOMER || mode === CREATE_CONTRACT ? projectId : null
  );

  const {
    users,
    customers,
    projects,
    contracts,
    slas: slaTypes,
  } = useCheckStateStatus([
    USER_STATE,
    CUSTOMERS_STATE,
    PROJECT_STATE,
    CONTRACTS_STATE,
    SLA_STATE,
  ]);

  const customer = customers.find((customer) => customer.id === parseInt(id));
  const project = projects.find((project) => project.id === parseInt(id));

  const [setValues, isFormChanged, checkFormChanged, initialValues] =
    useFormChanged();

  // const {
  //   onCustomerFinish,
  //   countriesList,
  //   stateList,
  //   setStateList,
  //   cityList,
  //   setCityList,
  //   country,
  //   setCountry,
  //   state,
  //   setState,
  //   city,
  //   setCity,
  // } = useCustomerCreateUpdate({
  //   skipStep,
  //   id,
  //   NewProjectId,
  //   customerForm,
  //   customer,
  //   setLoading,
  //   setFileList,
  //   setBase64Image,
  //   base64Image,
  //   projectId,
  //   mode,
  //   setValues,
  // });

  const { onContractFinish } = useContractCreateUpdate({
    id,
    NewProjectId,
    contractForm,
    contract,
    setLoading,
    setAttachmentFile,
    setBase64Image,
    base64Image,
    attachmentFile,
    users,
    projectId,
    setStartDate,
    setValues,
  });

  // function skipStep(skipToStep = -1) {
  //   if (mode) navigate(`/supportx/${Project_Route_Name}/${parseInt(projectId, 10)}`);
  //   if (currentStep < totalSteps) {
  //     if (skipToStep !== -1) setCurrentStep(skipToStep);
  //     else setCurrentStep(currentStep + 1);
  //   }
  // }

  // UPDATE CHECK ON EVERY INPUT CHANGE
  let imageKey =
    mode === EDIT_CUSTOMER
      ? 'image_base64'
      : mode === EDIT_CONTRACT
        ? 'attachment_file'
        : 'image_url';

  useEffect(() => {
    if (initialValues !== null) {
      let allValues;
      switch (mode) {
        case EDIT_PROJECT:
          allValues = {
            ...projectForm.getFieldsValue(),
          };
          break;
        // case EDIT_CUSTOMER:
        //   allValues = {
        //     ...customerForm.getFieldsValue(),
        //   };
        //   break;
        case EDIT_CONTRACT:
          allValues = {
            ...contractForm.getFieldsValue(),
          };
          break;
        default:
          allValues = {
            ...projectForm.getFieldsValue(),
            ...customerForm.getFieldsValue(),
            ...contractForm.getFieldsValue(),
          };
      }
      checkFormChanged(
        allValues,
        mode === EDIT_CONTRACT
          ? attachmentFile[0]?.file_name
          : fileList[0]?.url || fileList[0]?.name,
        imageKey
      );
    }
  }, [fileList, attachmentFile]);

  function skipStep(skipToStep = -1) {
    if (currentStep < totalSteps) {
      if (skipToStep !== -1) setCurrentStep(skipToStep);
      else setCurrentStep(currentStep + 1);
    } else if (NewProjectId.current) {
      navigate(`${PROJECT_BASE_URL}${NewProjectId.current}`);
    } else {
      navigate(-1);
    }
  }
  const handleNextStep = async () => {
    try {
      let values;
      switch (currentStep) {
        case 1:
          values = await projectForm.validateFields();
          onProjectFinish(values);
          break;
        // case 2:
        //   values = await customerForm.validateFields();
        //   onCustomerFinish(values);
        //   break;
        // case 3:
        //   values = await contractForm.validateFields();
        //   onContractFinish(values);
        //   break;
        case 2:
          values = await contractForm.validateFields();
          onContractFinish(values);
          break;
        default:
          throw new Error('Unknown step');
      }
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  useEffect(() => {
    if (id && mode === EDIT_PROJECT && project) {
      projectForm.setFieldsValue({
        ...project,
        customer_id: project?.customer[0]?.id,
        user_ids: project?.users.map((user) => user.id) || [],
        sla_ids: project?.slas.map((sla) => sla.id) || [],
        due_date: project.due_date ? dayjs(project.due_date) : null,
      });

      if (project.start_date) {
        setStartDate(dayjs(project.due_date));
      }

      if (project.image_url) {
        setFileList([{ url: project.image_url }]);
        convertImageToBase64(project.image_url)
          .then((base64) => {
            setBase64Image(base64);
          })
          .catch((error) => {
            console.error('Error converting image to base64:', error);
          });
      }
      let valuesForUpdateChecking = {
        customer_id: project.customer[0]?.id,
        description: project.description,
        due_date: project.due_date ? dayjs(project.due_date) : null,
        image_url: project.image_url,
        name: project.name,
        status: project.status,
        user_ids: project.users.map((user) => user.id),
      };
      setValues(valuesForUpdateChecking);
    }
  }, [id, project, projectForm]);

  const onProjectFinish = async (values) => {
    let skipToStep = 2;
    setLoading(true);
    try {
      if (!currentUserId) {
        return;
      }
      const formattedDueDate = values.due_date
        ? dayjs(values.due_date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
        : null;
      const formData = {
        ...values,
        created_by: currentUserId,
        image_url: base64Image ? base64Image : null,
        due_date: formattedDueDate,
        user_ids: handleMultiSelectWithAll(values.user_ids, users),
      };
      let response;
      response = await handleProjectForm(formData, id, dispatch, navigate);
      if (response?.customer_added) {
        skipToStep += 1;
      }
      NewProjectId.current = response?.id;

      !mode && skipStep(skipToStep);
    } catch (error) {
      message.error(`Error submitting form ${error.response}`);
    } finally {
      if (mode) {
        navigate(`${PROJECT_BASE_URL}${parseInt(id)}`);
      }
      setLoading(false);
    }
  };

  const formTitle = {
    1: `${id ? 'Update' : 'Create'} ${Project_Entity_Name}`,
    // 2: `${id ? 'Update' : 'Create'} ${Customer_Entity_Name}`,
    // 3: `${id ? 'Update' : 'Create'} Contract`,
    2: `${id ? 'Update' : 'Create'} Contract`,
  };

  const progressPercent = !mode
    ? (currentStep / totalSteps) * 100
    : totalSteps * 100;

  const handleValuesChange = (changedValues, allValues) => {
    if (allValues.hasOwnProperty('cost')) {
      allValues.cost = parseInt(allValues.cost, 10);
    }
    if (allValues.hasOwnProperty('notify_expire') && !allValues.notify_expire) {
      delete allValues.notify_before;
      delete allValues.notify_expiry;
    }
    checkFormChanged(
      allValues,
      mode === EDIT_CONTRACT ? attachmentFile[0]?.file_name : fileList[0]?.url,
      imageKey
    );
  };

  return (
    <>
      <Row
        className="create-project"
        style={{ flexDirection: 'column', paddingTop: mode ? '0px' : 0 }}
      >
        <FormSteps
          currentStep={currentStep}
          progressPercent={progressPercent}
          mode={mode}
          id={id}
        />
        <div style={{ padding: ' 0 22px' }}>
          <FormHeader
            title={formTitle[currentStep]}
            id={id}
            renderChildrenOnLeft={true}
          >
            <span
              style={{
                opacity: currentStep === totalSteps ? 1 : 0,
                marginLeft: 'auto',
              }}
            >
              {!mode && (
                <CustomButton variant="default" onClick={() => skipStep()}>
                  Skip
                </CustomButton>
              )}
            </span>
          </FormHeader>
        </div>

        <Col
          span={16}
          style={{
            overflow: 'hidden',
            margin: '0 auto',
            paddingLeft: '0px',
            flexGrow: '2',
          }}
        >
          <Row
            style={{
              whiteSpace: 'nowrap',
              flexWrap: 'nowrap',
              transform: `translateX(-${(currentStep - 1) * 100}%)`,
              transition: 'transform 1s ease-in-out',
              padding: '5px 0',
            }}
          >
            <ProjectFormFields
              spin={loading}
              form={projectForm}
              onValuesChange={handleValuesChange}
              key="projectFields"
              fileList={fileList}
              setFileList={setFileList}
              setBase64Image={setBase64Image}
              fieldConfiguration={projectFieldConfigurations(
                customers,
                slaTypes,
                users,
                () => setShowModal(true),
                () => setFileList([])
              )}
            />
            {/* <ProjectFormFields
              spin={loading}
              form={customerForm}
              key="customerFields"
              fileList={fileList}
              setFileList={setFileList}
              onValuesChange={handleValuesChange}
              setBase64Image={setBase64Image}
              fieldConfiguration={customerFieldConfigurations(mode)}
              countriesList={countriesList}
              stateList={stateList}
              setStateList={setStateList}
              cityList={cityList}
              setCityList={setCityList}
              country={country}
              setCountry={setCountry}
              state={state}
              setState={setState}
              city={city}
              setCity={setCity}
            /> */}
            <ProjectFormFields
              spin={loading}
              form={contractForm}
              key="contractFields"
              onValuesChange={handleValuesChange}
              fileList={fileList}
              setFileList={setFileList}
              setBase64Image={setBase64Image}
              fieldConfiguration={contractFieldConfigurations(
                customers,
                users,
                setAttachmentFile,
                setStartDate,
                startDate
              )}
              onFileChange={setAttachmentFile}
              updateNotify={contract?.notify_expiry ? true : false}
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
              marginLeft="20px"
              htmlType="submit"
              onClick={handleNextStep}
              disabled={id && !isFormChanged}
            >
              {id ? 'Update' : 'Create'}
            </CustomButton>
          </CenteredButtonContainer>
        </Col>
      </Row>
      <AddSlaModal open={showModal} close={() => setShowModal(false)} />
    </>
  );
};

export default CreateProject;

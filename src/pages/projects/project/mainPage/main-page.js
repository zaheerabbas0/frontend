import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FormHeader from '../../../../components/ui/Form/FormHeader';
import NavigationTabs from '../components/navigation';
import { Button, message, Row, Select } from 'antd';
import CustomSelect from '../../../../styledComponents/CustomSelect';
import { CustomButton } from '../../../../styledComponents/CustomButton';
import { ExportOutlined } from '@ant-design/icons';
import DeleteIcon from '../../../../assets//DeleteIcon.svg';
import EditIcon from '../../../../assets/EditIcon.svg';
import useIsAuthorized from '../../../../hooks/useIsAuthorized';
import { handleProjectDelete } from '../../../../utils/ProjectUtils';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Reports from '../../../reports/Reports';
import { useEffect, useState } from 'react';
import {
  ProjectTicketProvider,
  useProjectTicket,
} from '../../../../context/projectTicketContext';
import { Container } from '../../../../styledComponents/CustomCard';
import { Project_Route_Name } from '../../../../constants/project/TitleRoutesConstants';
import { hasPermission } from '../../../../constants/UsersRole';

export const EDIT_PROJECT_BASE_PATH = `/supportx/${Project_Route_Name}/edit-${Project_Route_Name}`;

const { Option } = Select;
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Index = () => {
  const [generateReport, setGenerateReport] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const location = useLocation();
  // const [activeTab, setActiveTab] = useState('overview');
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get('tab') || 'overview';

  const projects = useSelector((state) => state.project.projects);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projectId } = useParams();
  const project = projects.find(
    (project) => project.id === parseInt(projectId)
  );
  const isUserAllowed = useIsAuthorized();

  const handleExportAsPDF = async () => {
    // console.log("MONTH",selectedMonth);
    setGenerateReport(true);

    message.success('Your file will be downloaded shortly.');
  };
  const { invalidateData, isDataStale } = useProjectTicket();
  useEffect(() => {
    return () => {
      invalidateData();
    };
  }, [invalidateData]);

  return (
    <Container>
      {/* <Row className="tickets-tabs"> */}
      {generateReport && (
        <div style={{ position: 'absolute', left: '-9999px' }}>
          <Reports
            projectId={project?.id}
            setGenerateReport={() => setGenerateReport(!generateReport)}
            month_number={selectedMonth}
          />
        </div>
      )}

      <FormHeader withBackButton={false} title={project?.name}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginLeft: 'auto',
          }}
        >
          {hasPermission('update:project') && (
            <Button
              ghost
              className="projectActionBtns"
              onClick={(event) => {
                event.stopPropagation();
                navigate(`${EDIT_PROJECT_BASE_PATH}/${project.id}`);
              }}
              icon={<img src={EditIcon} alt="edit" />}
            />
          )}
          {hasPermission('delete:project') && (
            <Button
              ghost
              className="projectActionBtns"
              onClick={(event) => {
                event.stopPropagation();
                handleProjectDelete(
                  project.id,
                  dispatch,
                  null,
                  navigate,
                  projects
                );
              }}
              icon={<img src={DeleteIcon} alt="delete" />}
            />
          )}
          <CustomSelect
            defaultValue={selectedMonth}
            width={120}
            height={150}
            onChange={(value) => setSelectedMonth(value)}
          >
            {months.map((month, index) => (
              <Option key={index} value={index + 1}>
                {month}
              </Option>
            ))}
          </CustomSelect>
          <CustomButton onClick={handleExportAsPDF}>
            <ExportOutlined /> Export as PDF
          </CustomButton>
        </div>
      </FormHeader>
      <NavigationTabs project={project} activeTab={activeTab} />
      {/* </Row> */}
    </Container>
  );
};

export default Index;

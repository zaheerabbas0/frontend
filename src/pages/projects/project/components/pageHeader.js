// import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import FormHeader from '../../../../components/ui/Form/FormHeader';
// import { Button, message, Row, Select } from 'antd';
// import CustomSelect from '../../../../styledComponents/CustomSelect';
// import { CustomButton } from '../../../../styledComponents/CustomButton';
// import { ExportOutlined } from '@ant-design/icons';
// import DeleteIcon from '../../../../assets//DeleteIcon.svg';
// import EditIcon from '../../../../assets/EditIcon.svg';
// import useIsAuthorized from '../../../../hooks/useIsAuthorized';
// import { handleProjectDelete } from '../../../../utils/ProjectUtils';
// import { useDispatch, useSelector } from 'react-redux';
// import Reports from '../../../reports/Reports';
// import { useEffect, useState } from 'react';
// import { useProjectTicket } from '../../../../context/projectTicketContext';

// export const EDIT_PROJECT_BASE_PATH = '/supportx/project/edit-project';
// const { Option } = Select;
// const months = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ];
// const PageHeader = () => {
//   const [generateReport, setGenerateReport] = useState(null);
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const projects = useSelector((state) => state.project.projects);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { projectId } = useParams();
//   const project = projects.find(
//     (project) => project.id === parseInt(projectId)
//   );
//   const isUserAllowed = useIsAuthorized();

//   const handleExportAsPDF = async () => {
//     // console.log("MONTH",selectedMonth);
//     setGenerateReport(true);

//     message.success('Your file will be downloaded shortly.');
//   };
//   const { invalidateData, isDataStale } = useProjectTicket();
//   useEffect(() => {
//     return () => {
//       invalidateData();
//     };
//   }, [invalidateData]);
//   return (
//     <div>
//       {generateReport && (
//         <div style={{ position: 'absolute', left: '-9999px' }}>
//           <Reports
//             projectId={project?.id}
//             setGenerateReport={() => setGenerateReport(!generateReport)}
//             month_number={selectedMonth}
//           />
//         </div>
//       )}
//       <FormHeader withBackButton={false} title={project?.name}>
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '10px',
//             marginLeft: 'auto',
//           }}
//         >
//           {hasPermission('update:project') && (
//             <Button
//               disabled={!isUserAllowed}
//               ghost
//               className="projectActionBtns"
//               onClick={(event) => {
//                 event.stopPropagation();
//                 navigate(`${EDIT_PROJECT_BASE_PATH}/${project.id}`);
//               }}
//               icon={<img src={EditIcon} alt="edit" />}
//             />
//           )}
//           {hasPermission('delete:project') && (
//             <Button
//               disabled={!isUserAllowed}
//               ghost
//               className="projectActionBtns"
//               onClick={(event) => {
//                 event.stopPropagation();
//                 handleProjectDelete(
//                   project.id,
//                   dispatch,
//                   null,
//                   navigate,
//                   projects
//                 );
//               }}
//               icon={<img src={DeleteIcon} alt="delete" />}
//             />
//           )}
//           <CustomSelect
//             defaultValue={selectedMonth}
//             style={{ width: 120, heigth: '100%' }}
//             onChange={(value) => setSelectedMonth(value)}
//           >
//             {months.map((month, index) => (
//               <Option key={index} value={index + 1}>
//                 {month}
//               </Option>
//             ))}
//           </CustomSelect>
//           <CustomButton onClick={handleExportAsPDF}>
//             <ExportOutlined /> Export as PDF
//           </CustomButton>
//         </div>
//       </FormHeader>
//     </div>
//   );
// };

// export default PageHeader;

import { message } from 'antd';
import Swal from 'sweetalert2';
import {
  deleteProject,
  createProject,
  updateProject,
  fetchProjectDetails,
} from '../reduxToolkit/features/ProjectSlice';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import {
  Project_Route_Name,
  Project_Entity_Name,
} from '../constants/project/TitleRoutesConstants';

export const handleProjectCreate = (navigate) => {
  navigate(`create-${Project_Route_Name}`);
};

export const projectRowClicked = (navigate, dispatch) => (record) => {
  return {
    onClick: (event) => {
      if (
        event.target.tagName === 'INPUT' ||
        event.target.closest('.ant-table-selection-column')
      ) {
        return;
      }
      navigate(`project-${Project_Route_Name}/${record.id}`);

      dispatch(fetchProjectDetails(record.id));
    },
    style: { cursor: 'pointer' },
  };
};

export const handleProjectForm = async (formData, id, dispatch, navigate) => {
  try {
    let response;
    if (id) {
      response = await dispatch(
        updateProject({ id, updatedProject: formData })
      ).unwrap();
      Swal.fire({
        title: `${Project_Entity_Name} Updated Successfully`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      response = await dispatch(createProject(formData)).unwrap();
      Swal.fire({
        title: `${Project_Entity_Name} Created Successfully`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const handleProjectDelete = async (
  projectId,
  dispatch,
  setSelectedRowKeys = null,
  navigate,
  projects = []
) => {
  try {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete this ${Project_Entity_Name}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    });

    if (confirmation.isConfirmed) {
      await dispatch(deleteProject(projectId)).unwrap();
      Swal.fire({
        title: 'Deleted!',
        text: `${Project_Entity_Name} has been deleted.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      if (projects.length > 0) {
        const projectToNavigate = projects[0];
        console.log('REDIRECTNG TO', projectToNavigate);
        navigate(`/supportx/${Project_Route_Name}/${projectToNavigate.id}`, {
          state: { project: projectToNavigate },
        });
      } else {
        navigate('/supportx/dashboard');
      }
    }
  } catch (error) {
    console.log('ERROR DELETING PROJECT', error);
  }
};

export const disabledDate = (current) => {
  return current && current < dayjs().startOf('day');
};
export const handleOpenChange = (open) => {
  if (open) {
    setTimeout(() => {
      const calendar = document.querySelector('.ant-picker-dropdown');
      if (calendar) {
        const prevMonthButton = calendar.querySelector(
          '.ant-picker-header-prev-btn'
        );
        const prevYearButton = calendar.querySelector(
          '.ant-picker-header-super-prev-btn'
        );
        if (prevMonthButton) {
          prevMonthButton.style.display = 'none';
        }
        if (prevYearButton) {
          prevYearButton.style.display = 'none';
        }
      }
    }, 0);
  }
};

export const exportSelectedProjects = (selectedRowKeys, projectData) => {
  let projectsToExport = [];

  if (selectedRowKeys.length === 0) {
    projectsToExport = projectData;
  } else {
    projectsToExport = projectData.filter((project) =>
      selectedRowKeys.includes(project.id)
    );
  }

  if (projectsToExport.length === 0) {
    message.warning(`No ${Project_Entity_Name} available for export`);
    return;
  }

  const formattedProjects = projectsToExport.map(
    ({ id, created_by, image_url, ...rest }) => rest
  );

  const worksheet = XLSX.utils.json_to_sheet(formattedProjects);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, `${Project_Entity_Name}`);

  XLSX.writeFile(workbook, `${Project_Entity_Name} List.xlsx`);
};

export const handleProjectOk = (projectsFilterForm, setIsDrawerVisible) => {
  projectsFilterForm
    .validateFields()
    .then((values) => {
      setIsDrawerVisible(false);
      projectsFilterForm.resetFields();
    })
    .catch((info) => {});
};

export const handleProjectFilter = (ticketsFilterForm, setIsDrawerVisible) => {
  ticketsFilterForm
    .validateFields()
    .then((values) => {
      setIsDrawerVisible(false);
      ticketsFilterForm.resetFields();
    })
    .catch((info) => {});
};

export const projectsFilterFields = [
  {
    label: 'Project',
    name: 'project',
    type: 'select',
    placeholder: 'Select assignee',
    options: [
      { value: 'open', label: 'Open' },
      { value: 'onHold', label: 'onHold' },
      { value: 'closed', label: 'Closed' },
    ],
  },
  {
    label: 'By Status',
    name: 'status',
    type: 'select',
    placeholder: 'Select status',
    options: [
      { value: 'open', label: 'Open' },
      { value: 'onHold', label: 'OnHold' },
      { value: 'closed', label: 'Closed' },
    ],
  },
  {
    label: 'By priority',
    name: 'priority',
    type: 'select',
    placeholder: 'Select priority',
    options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
    ],
  },
  {
    label: 'By Date',
    name: 'createdDate',
    type: 'select',
    options: [
      { value: 'today', label: 'Today' },
      { value: 'month', label: 'Month' },
      { value: 'Year', label: 'Year' },
    ],
  },
];

export const handleMultiSelectWithAll = (value, array) => {
  if (!Array.isArray(value) || !Array.isArray(array)) {
    console.error('expected array items');
    return;
  }

  return value?.includes('all') ? array.map((i) => i.id) : value;
};

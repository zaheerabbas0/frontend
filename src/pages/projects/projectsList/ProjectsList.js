import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, message, Form } from 'antd';
import {
  DeleteOutlined,
  ExportOutlined,
  FilterOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../../../reduxToolkit/features/ProjectSlice';
import {
  handleProjectDelete,
  exportSelectedProjects,
  handleProjectCreate,
  projectRowClicked,
  handleProjectFilter,
  projectsFilterFields,
} from '../../../utils/ProjectUtils';
import './ProjectsList.css';
import { projectsListColumns } from './ProjectsListColumns';
import CustomSpin from '../../../styledComponents/CustomSpin';
import CustomTable from '../../../styledComponents/CustomTable';
import { CustomButton } from '../../../styledComponents/CustomButton';
import useIsAuthorized from '../../../hooks/useIsAuthorized';
import FilterDrawer from '../../../components/filterDrawer/FilterDrawer';
import { CardTitle } from '../../../components/ui/typography';

const ProjectsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [projectsFilterForm] = Form.useForm();

  const isUserAllowed = useIsAuthorized();

  const projectData = useSelector((state) => state.project.projects);
  const projectStatus = useSelector((state) => state.project.status);

  const handleProjectRowSelect = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        if (projectStatus === 'idle') {
          await dispatch(fetchProjects());
        }
      } catch (error) {
        message.error('Failed to fetch projects');
      }
    };
    fetchProjectData();
  }, [projectStatus, dispatch]);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerVisible(false);
    projectsFilterForm.resetFields();
  };

  return (
    <>
      <div className="project-list">
        <Row className="project-list-header" style={{ background: 'white' }}>
          <Row>
            <CardTitle>Projects</CardTitle>
          </Row>
          <Row gutter={10}>
            <Col>
              {selectedRowKeys.length > 1 && isUserAllowed && (
                <CustomButton
                  width="100px"
                  variant="danger"
                  onClick={() => {
                    setIsDeleting(true);
                    handleProjectDelete(
                      selectedRowKeys,
                      dispatch,
                      setSelectedRowKeys
                    ).finally(() => setIsDeleting(false));
                  }}
                >
                  <DeleteOutlined /> Delete
                </CustomButton>
              )}
            </Col>

            <Col>
              <CustomButton variant="default" onClick={showDrawer}>
                <FilterOutlined />
              </CustomButton>
            </Col>

            <Col>
              <CustomButton
                variant="default"
                onClick={() =>
                  exportSelectedProjects(selectedRowKeys, projectData)
                }
                width="100px"
              >
                <ExportOutlined /> Export
              </CustomButton>
            </Col>
            <Col>
              {isUserAllowed && (
                <CustomButton
                  variant="colored"
                  onClick={() => handleProjectCreate(navigate)}
                  width="100px"
                >
                  <PlusOutlined /> Create
                </CustomButton>
              )}
            </Col>
          </Row>
        </Row>
        <CustomSpin
          spinning={projectStatus === 'loadingProjects' || isDeleting}
        >
          <CustomTable
            rowSelection={{
              selectedRowKeys,
              onChange: handleProjectRowSelect,
            }}
            rowKey="id"
            onRow={projectRowClicked(navigate, dispatch)}
            size={'small'}
            columns={projectsListColumns(navigate, dispatch, isUserAllowed)}
            dataSource={projectData}
            scroll={{ y: 590 }}
          />
          <FilterDrawer
            isVisible={isDrawerVisible}
            onClose={handleDrawerClose}
            onOk={() =>
              handleProjectFilter(projectsFilterForm, setIsDrawerVisible)
            }
            projectsFilterForm={projectsFilterForm}
            filterFields={projectsFilterFields}
            title="Users Filter"
          />
        </CustomSpin>
      </div>
    </>
  );
};

export default ProjectsList;

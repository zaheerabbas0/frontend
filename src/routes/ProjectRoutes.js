import React from 'react';
import CreateProject, {
  CREATE_CONTRACT,
  CREATE_CUSTOMER,
  EDIT_CONTRACT,
  EDIT_CUSTOMER,
  EDIT_PROJECT,
} from '../pages/projects/createProject/CreateProject';
import { Outlet } from 'react-router-dom';
import Index from '../pages/projects/project/mainPage/main-page';
import { ProjectTicketProvider } from '../context/projectTicketContext';
import { Project_Route_Name } from '../constants/project/TitleRoutesConstants';
import { Customer_Route_Name } from '../constants/customer/TitleRoutesConstants';

const routeConfig = {
  path: `${Project_Route_Name}`,
  element: (
    <>
      <Outlet />
    </>
  ),
  protected: true,
  children: [
    {
      path: ':projectId',
      element: (
        <ProjectTicketProvider>
          <Index />
        </ProjectTicketProvider>
      ),
    },
    {
      path: `create-${Project_Route_Name}`,
      element: <CreateProject />,
      protected: true,
      isAuthorizedTo: 'create:project',
    },
    {
      path: `edit-${Project_Route_Name}/:id`,
      element: <CreateProject mode={EDIT_PROJECT} />,
      isAuthorizedTo: 'update:project',
    },
    {
      path: `edit-${Customer_Route_Name}/:id`,
      element: <CreateProject mode={EDIT_CUSTOMER} />,
      isAuthorizedTo: 'update:customer',
    },
    {
      path: `create-${Customer_Route_Name}/`,
      element: <CreateProject mode={CREATE_CUSTOMER} />,
      isAuthorizedTo: 'create:customer',
    },
    {
      path: 'create-contract',
      element: <CreateProject mode={CREATE_CONTRACT} />,
      isAuthorizedTo: 'create:contract',
    },
    {
      path: 'edit-contract/:id',
      element: <CreateProject mode={EDIT_CONTRACT} />,
      isAuthorizedTo: 'update:contract',
    },
  ],
};

export default routeConfig;

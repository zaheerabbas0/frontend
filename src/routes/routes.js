import UserRoutes from './UserRoutes';
import chatRoutes from './ChatRoutes';
import ticketRoutes from './TicketRoutes';
import memberRoutes from './MembersRoutes';
import reportRoutes from './ReportsRoutes';
import projectRoutes from './ProjectRoutes';
import settingRoutes from './SettingRoutes';
import contactRoutes from './ContractRoutes';
import customerRoutes from './CustomerRoutes';
import MainPageRoutes from './MainPageRoutes';
import incidentRoutes from './IncidentRoutes';
import dashboardRoutes from './DashboardRoutes';
import ProtectedRoutes from './ProtectedRoutes';
import { createBrowserRouter } from 'react-router-dom';
import NotAuthorized from '../components/notAuthorized/notAuthorized';
import App from '../App';

const generateRoute = ({
  element,
  protected: isProtected,
  isAuthorizedTo,
  children,
  ...rest
}) => {
  let newElement = element;

  if (isAuthorizedTo) {
    newElement = (
      <NotAuthorized isAuthorizedTo={isAuthorizedTo}>
        {newElement}
      </NotAuthorized>
    );
  }

  if (isProtected) {
    newElement = <ProtectedRoutes>{newElement}</ProtectedRoutes>;
  }

  const newChildren = children?.map(generateRoute);

  return { ...rest, element: newElement, children: newChildren };
};

const RenderRoutes = () => {
  const routes = [
    {
      path: '/',
      element: <App />,
      children: [generateRoute(MainPageRoutes)],
    },
    {
      path: '/supportx',
      element: <App />,
      children: [
        generateRoute(UserRoutes),
        generateRoute(dashboardRoutes),
        generateRoute(ticketRoutes),
        generateRoute(projectRoutes),
        generateRoute(contactRoutes),
        generateRoute(customerRoutes),
        generateRoute(reportRoutes),
        generateRoute(chatRoutes),
        generateRoute(settingRoutes),
        generateRoute(incidentRoutes),
        generateRoute(memberRoutes),
      ],
    },
  ];
  const browserRouter = createBrowserRouter(routes);

  return browserRouter;
};

export default RenderRoutes;

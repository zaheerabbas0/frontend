import { hasPermission } from '../../constants/UsersRole';

const NotAuthorized = ({ children, isAuthorizedTo }) => {
  const hasAuth = hasPermission(isAuthorizedTo);
  return hasAuth ? (
    children
  ) : (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>You are not authorized to access this page.</h1>
    </div>
  );
};
export default NotAuthorized;

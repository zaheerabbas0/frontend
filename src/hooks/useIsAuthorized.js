import { ADMIN, ROLES } from '../constants/UsersRole';

const useIsAuthorized = () => {
  const userInfo = JSON.parse(localStorage.getItem('user_info'));
  return userInfo?.role_id === ROLES[ADMIN];
};

export default useIsAuthorized;

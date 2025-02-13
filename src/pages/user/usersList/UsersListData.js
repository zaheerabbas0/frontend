import React from 'react';
import { useSelector } from 'react-redux';
import useCheckStateStatus, {
  USER_STATE,
} from '../../../hooks/useCheckStateStatus';
import UserTable from '../../../components/tables/userTable/UserTable';
import { User_Entity_Name } from '../../../constants/user/TitleRoutesConstants';
import { hasPermission } from '../../../constants/UsersRole';

const UsersListData = () => {
  const { users: userData } = useCheckStateStatus([USER_STATE]);
  const userStatus = useSelector((state) => state.user.status);

  return (
    <UserTable
      spin={userStatus === 'loadingUsers'}
      title={`${User_Entity_Name}s`}
      dataSource={userData}
      showCreate={hasPermission('create:users')}
      showDelete={hasPermission('delete:users')}
      showFilters={true}
      showExport={true}
      showSwap={false}
      // showImport={true}
    />
  );
};

export default UsersListData;

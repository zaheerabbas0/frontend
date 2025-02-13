import React from 'react';
import { useSelector } from 'react-redux';
import UserTable from '../../../../components/tables/userTable/UserTable';

const AdminUsers = () => {
  const userStatus = useSelector((state) => state.admin.status);
  const adminUsers = useSelector((state) => state.admin.adminUsers);

  return (
    <UserTable
      spin={userStatus === 'loadAdminUsers'}
      title="Users"
      dataSource={adminUsers}
      showFilters={false}
      showDelete={false}
      showCreate={false}
      showExport={false}
      showSwap={false}
      // showImport={true}
    />
  );
};

export default AdminUsers;

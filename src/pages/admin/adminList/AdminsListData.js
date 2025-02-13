import React from 'react';
import { useSelector } from 'react-redux';
import useCheckStateStatus, {
  ADMIN_STATE,
} from '../../../hooks/useCheckStateStatus';
import AdminTable from '../../../components/tables/adminTable/AdminTable';

const AdminsListData = () => {
  const { admins: adminsData } = useCheckStateStatus([ADMIN_STATE]);
  const userStatus = useSelector((state) => state.admin.status);

  return (
    <AdminTable
      spin={userStatus === 'loadingAdmins'}
      title="Admins"
      dataSource={adminsData}
      showFilters={true}
      showDelete={true}
      showCreate={true}
      showExport={true}
      showSwap={false}
      // showImport={true}
    />
  );
};

export default AdminsListData;

import React from 'react';
import { useSelector } from 'react-redux';
import useCheckStateStatus, {
  CUSTOMERS_STATE,
} from '../../../hooks/useCheckStateStatus';
import CustomerTable from '../../../components/tables/cusomerTable/CustomerTable';
import { Customer_Module_Name } from '../../../constants/customer/TitleRoutesConstants';
import { hasPermission } from '../../../constants/UsersRole';

const CustomersListData = () => {
  const { customers: userData } = useCheckStateStatus([CUSTOMERS_STATE]);
  const userStatus = useSelector((state) => state.customer.status);

  return (
    <CustomerTable
      spin={userStatus === 'loadingCustomers'}
      title={`${Customer_Module_Name}`}
      dataSource={userData}
      showCreate={hasPermission('create:customer')}
      showDelete={hasPermission('delete:customer')}
      showFilters={true}
      showExport={true}
      showSwap={false}
      // showImport={true}
    />
  );
};

export default CustomersListData;

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useCheckStateStatus, {
  CUSTOMERS_STATE,
} from '../../../../hooks/useCheckStateStatus';
import DetailsInfo from '../../../../components/tableDataDetail/DetailsInfo';
import {
  fetchCustomerDetails,
  fetchCustomers,
} from '../../../../reduxToolkit/features/CustomerSlice';
import { Customer_Entity_Name } from '../../../../constants/customer/TitleRoutesConstants';

const CustomerInfo = () => {
  const { id: customerId } = useParams();
  const dispatch = useDispatch();
  const { customers } = useCheckStateStatus([CUSTOMERS_STATE]);

  const customerDetail = customers.find(
    (customer) => customer.id === parseInt(customerId)
  );

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchCustomerDetails(customerId));
  }, [dispatch, customerId]);

  return (
    <DetailsInfo
      title={`${Customer_Entity_Name} Details`}
      user={customerDetail}
      userType="customer"
      entityName="Project"
    />
  );
};

export default CustomerInfo;

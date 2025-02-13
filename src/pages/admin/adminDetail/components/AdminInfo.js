import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import {
//   fetchUserDetails,
//   fetchUsers,
// } from '../../../../reduxToolkit/features/UserSlice';
import useCheckStateStatus, {
  ADMIN_STATE,
  USER_STATE,
} from '../../../../hooks/useCheckStateStatus';
import DetailsInfo from '../../../../components/tableDataDetail/DetailsInfo';
import { Project_Entity_Name } from '../../../../constants/project/TitleRoutesConstants';

const AdminInfo = () => {
  const { id } = useParams();
  // const dispatch = useDispatch();
  const { admins } = useCheckStateStatus([ADMIN_STATE]);

  const detailAdmin = admins.find((admin) => admin.id === parseInt(id));

  // useEffect(() => {
  //   dispatch(fetchUsers());
  //   dispatch(fetchUserDetails(id));
  // }, [dispatch, id]);

  return (
    <DetailsInfo
      title="Admin Details"
      user={detailAdmin}
      entityName={Project_Entity_Name}
      userType="admin"
    />
  );
};

export default AdminInfo;

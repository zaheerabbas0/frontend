import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  fetchUserDetails,
  fetchUsers,
} from '../../../../reduxToolkit/features/UserSlice';
import useCheckStateStatus, {
  USER_STATE,
} from '../../../../hooks/useCheckStateStatus';
import DetailsInfo from '../../../../components/tableDataDetail/DetailsInfo';
import { User_Entity_Name } from '../../../../constants/user/TitleRoutesConstants';
import { Project_Entity_Name } from '../../../../constants/project/TitleRoutesConstants';

const UserInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { users } = useCheckStateStatus([USER_STATE]);

  const detailUser = users.find((user) => user.id === parseInt(id));

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchUserDetails(id));
  }, [dispatch, id]);

  return (
    <DetailsInfo
      title={`${User_Entity_Name} Details`}
      user={detailUser}
      entityName={Project_Entity_Name}
      userType="user"
    />
  );
};

export default UserInfo;

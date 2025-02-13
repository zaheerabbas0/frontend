import React, { useEffect, useState } from 'react';
import SettingsPageWrapper from '../../component/settingsPageWrapper';
import CustomTag from '../../../../components/ui/tags/tag';
import useCheckStateStatus, {
  GROUPS_STATE,
} from '../../../../hooks/useCheckStateStatus';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import CustomSpin from '../../../../styledComponents/CustomSpin';
import {
  deleteGroup,
  fetchGroup,
} from '../../../../reduxToolkit/features/GroupSlice';
import AddGroupModal from '../../../../modals/userModals/AddGroupModal';
import Swal from 'sweetalert2';

const GroupsPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const { groups } = useCheckStateStatus([GROUPS_STATE]);
  const status = useSelector((state) => state.groups.status);

  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to delete this Group?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    });

    if (confirmation.isConfirmed) {
      dispatch(deleteGroup(id))
        .unwrap()
        .then((response) => {
          message.success(response.message);
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
  };

  useEffect(() => {
    dispatch(fetchGroup());
  }, [dispatch]);

  return (
    <>
      <CustomSpin spinning={status === 'loadingGroup'}>
        <SettingsPageWrapper
          buttonText="Add New Group"
          buttonAction={() => setOpenModal(true)}
          showEdtButton={true}
          pageTitle="Groups"
        >
          <div className="tags-content">
            {status === 'loadingGroup' ? null : groups.length > 0 ? (
              groups.map((group) => (
                <CustomTag
                  withCheckBox={false}
                  color="black"
                  key={group.id}
                  name={group.name}
                  removeAction={() => handleDelete(group.id)}
                />
              ))
            ) : (
              <p>No Groups available</p>
            )}
          </div>
          <AddGroupModal open={openModal} close={() => setOpenModal(false)} />
        </SettingsPageWrapper>
      </CustomSpin>
    </>
  );
};

export default GroupsPage;

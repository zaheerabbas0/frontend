import React, { useEffect, useState } from 'react';
import SettingsPageWrapper from '../../component/settingsPageWrapper';
import CustomTag from '../../../../components/ui/tags/tag';
import './styles.css';
import useCheckStateStatus, {
  PRIORITY_STATE,
} from '../../../../hooks/useCheckStateStatus';
import AddPriorityModal from '../../../../modals/tickets/AddPriorityModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  deletePriority,
  fetchPriority,
} from '../../../../reduxToolkit/features/PrioritySlice';
import { message } from 'antd';
import CustomSpin from '../../../../styledComponents/CustomSpin';
import Swal from 'sweetalert2';

const PriorityPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const { priorities } = useCheckStateStatus([PRIORITY_STATE]);
  const status = useSelector((state) => state.priorities.status);

  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to delete this Priority?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    });

    if (confirmation.isConfirmed) {
      dispatch(deletePriority(id))
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
    dispatch(fetchPriority());
  }, [dispatch]);

  return (
    <>
      <CustomSpin spinning={status === 'loadingPriority'}>
        <SettingsPageWrapper
          buttonText="Add New Priority"
          buttonAction={() => setOpenModal(true)}
          showEdtButton={true}
          pageTitle="Priorities"
        >
          <div className="tags-content">
            {status === 'loadingPriorities' ? null : priorities.length > 0 ? (
              priorities.map((p) => (
                <CustomTag
                  sla={p.duration}
                  color={p.hex_code}
                  tagName={p?.name}
                  removeAction={() => handleDelete(p.id)}
                />
              ))
            ) : (
              <p>No Priorities available</p>
            )}
          </div>
          <AddPriorityModal
            open={openModal}
            close={() => setOpenModal(false)}
          />
        </SettingsPageWrapper>
      </CustomSpin>
    </>
  );
};

export default PriorityPage;

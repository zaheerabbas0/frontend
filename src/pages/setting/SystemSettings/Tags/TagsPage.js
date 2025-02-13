import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SettingsPageWrapper from '../../component/settingsPageWrapper';
import CustomTag from '../../../../components/ui/tags/tag';
import AddTagModal from '../../../../modals/tickets/AddTagModal';
import {
  deleteTag,
  fetchTags,
} from '../../../../reduxToolkit/features/TagSlice';
import useCheckStateStatus, {
  TAGS_STATE,
} from '../../../../hooks/useCheckStateStatus';
import './styles.css';
import { message } from 'antd';
import CustomSpin from '../../../../styledComponents/CustomSpin';
import Swal from 'sweetalert2';

const TagsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { tags } = useCheckStateStatus([TAGS_STATE]);
  const status = useSelector((state) => state.tags.status);

  const handleTagDelete = async (id) => {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to delete this Tag?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    });
    if (confirmation.isConfirmed) {
      dispatch(deleteTag(id))
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
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <>
      <CustomSpin spinning={status === 'loadingTags'}>
        <SettingsPageWrapper
          buttonText="Add New Tag"
          buttonAction={() => setIsModalOpen(true)}
          showEdtButton={true}
          pageTitle="Tags"
        >
          <div className="tags-content">
            {status === 'loadingTags' ? null : tags.length > 0 ? (
              tags.map((tag) => (
                <CustomTag
                  key={tag.id}
                  withCheckBox={true}
                  color={tag.hex_code}
                  tagName={tag.name}
                  removeAction={() => handleTagDelete(tag.id)}
                />
              ))
            ) : (
              <p>No tags available</p>
            )}
          </div>
          <AddTagModal open={isModalOpen} close={() => setIsModalOpen(false)} />
        </SettingsPageWrapper>
      </CustomSpin>
    </>
  );
};

export default TagsPage;

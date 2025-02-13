import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SettingsPageWrapper from '../../component/settingsPageWrapper';
import CustomTag from '../../../../components/ui/tags/tag';
import {
  deleteSkill,
  fetchSkill,
} from '../../../../reduxToolkit/features/SkillSlice';
import useCheckStateStatus, {
  SKILL_STATE,
} from '../../../../hooks/useCheckStateStatus';
import './styles.css';
import { message } from 'antd';
import CustomSpin from '../../../../styledComponents/CustomSpin';
import AddSkillModal from '../../../../modals/userModals/AddSkillModal';
import Swal from 'sweetalert2';

const SkillsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { skills } = useCheckStateStatus([SKILL_STATE]);
  const status = useSelector((state) => state.skills.status);

  const handleSkillDelete = async (id) => {
    const confirmation = await Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to delete this Skill?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    });

    if (confirmation.isConfirmed) {
      dispatch(deleteSkill(id))
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
    dispatch(fetchSkill());
  }, [dispatch]);

  return (
    <>
      <CustomSpin spinning={status === 'loadingSkills'}>
        <SettingsPageWrapper
          buttonText="Add New Skill"
          buttonAction={() => setIsModalOpen(true)}
          showEdtButton={true}
          pageTitle="Skills"
        >
          <div className="tags-content">
            {status === 'loadingSkills' ? null : skills.length > 0 ? (
              skills.map((skill) => (
                <CustomTag
                  key={skill.id}
                  withCheckBox={false}
                  name={skill.name}
                  removeAction={() => handleSkillDelete(skill.id)}
                />
              ))
            ) : (
              <p>No skills available</p>
            )}
          </div>
          <AddSkillModal
            open={isModalOpen}
            close={() => setIsModalOpen(false)}
          />
        </SettingsPageWrapper>
      </CustomSpin>
    </>
  );
};

export default SkillsPage;

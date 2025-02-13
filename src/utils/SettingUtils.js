import Swal from 'sweetalert2';
import { updateUserProfile } from '../reduxToolkit/features/SettingSlice';
import { message } from 'antd';

export const handleSettingForm = async (values, id, dispatch, navigate) => {
  try {
    if (id) {
      let user_info = JSON.parse(localStorage.getItem('user_info'));

      const response = await dispatch(
        updateUserProfile({ id, updatedUserProfile: values })
      ).unwrap();
      const imageURL = response?.updatedUserProfile?.image_url;
      user_info = {
        ...user_info,
        image_url: imageURL,
      };
      localStorage.setItem('user_info', JSON.stringify(user_info));
      window.dispatchEvent(new Event('localStorageUpdate'));

      Swal.fire({
        title: 'Profile Updated Successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
    }
    navigate('/supportx/setting');
  } catch (error) {
    message.error('An error occurred. Please try again.');
  }
};

import React, { useState } from 'react';
import { Upload } from 'antd';
import { PlusOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './UploadPicture.module.css';

const UploadPicture = ({
  fileList = [],
  setFileList,
  setBase64Image,
  showUserIcon = true,
}) => {
  const [previewImage, setPreviewImage] = useState('');
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList?.length > 0) {
      const file = newFileList[0].originFileObj;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        setBase64Image(base64String);
      };
    } else {
      setBase64Image(null);
    }
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    setPreviewImage(src);
    setIsPreviewVisible(true);
  };

  const handleClosePreview = () => {
    setIsPreviewVisible(false);
    setPreviewImage('');
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.preview_overlay)) {
      handleClosePreview();
    }
  };

  const handleOnRemove = () => setFileList([]);

  return (
    <>
      <Upload
        listType="picture-circle"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        accept=".jpg,.jpeg,.png"
        beforeUpload={() => false}
        onRemove={handleOnRemove}
      >
        {fileList?.length < 1 && (
          <>
            {showUserIcon && <UserOutlined className={styles.user_outline} />}
            <PlusOutlined
              className={`${styles.plus_icon} ${
                showUserIcon ? styles.user_icon : styles.no_user_icon
              }`}
            />
          </>
        )}
      </Upload>

      {isPreviewVisible && (
        <div className={styles.preview_overlay} onClick={handleOverlayClick}>
          <button className={styles.close_btn} onClick={handleClosePreview}>
            <CloseOutlined />
          </button>
          <div className={styles.preview_container}>
            <img alt="" className={styles.preview_image} src={previewImage} />
          </div>
        </div>
      )}
    </>
  );
};

export default UploadPicture;

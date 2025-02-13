import React from 'react';
import styled from 'styled-components';
import { message, Upload } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import DraggerIcon from './../assets/DraggerIcon.svg';
import { DarkColor } from './CustomColors';

const Dragger = styled(Upload.Dragger)`
  .ant-upload-drag {
    border: 1px solid #d8d8d8;
    height: ${(props) => props.height || 'auto'};
  }
  .ant-upload-drag:hover {
    border: 1px solid ${DarkColor};
  }
`;

const DraggerText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  img {
    margin-right: 8px;
  }
`;

const BrowseLink = styled.b`
  color: ${DarkColor};
`;

const CustomDragger = ({
  height,
  onFileChange,
  multiple,
  mode = 'single',
  accept,
  checkPDFType = false,
  ...rest
}) => {
  const handleChange = ({ file, fileList: newFileList }) => {
    if (checkPDFType && file.type !== 'application/pdf') {
      message.error(`${file.name} is not a pdf file`);
      // Remove the file from the fileList if it's not a PDF
      return;
    }
    if (mode === 'single') {
      if (newFileList.length > 0) {
        const file = newFileList[0].originFileObj;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64String = reader.result.split(',')[1];
          onFileChange(base64String);
        };
      } else {
        onFileChange(null);
      }
    } else if (mode === 'multiple') {
      const filePromises = newFileList.map((fileWrapper) => {
        return new Promise((resolve) => {
          const file = fileWrapper.originFileObj;
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            resolve({ file_name: file.name, file_url: base64String });
          };
        });
      });

      Promise.all(filePromises).then((fileListBase64) => {
        onFileChange(fileListBase64);
      });
    }
  };

  const handlePreview = async (file) => {
    const fileURL = file.url || URL.createObjectURL(file.originFileObj);
    window.open(fileURL, '_blank');
  };

  const renderItem = (originNode, file, fileList, actions) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          width: '100%',
        }}
        onMouseEnter={(e) => e.preventDefault()}
        onMouseLeave={(e) => e.preventDefault()}
      >
        <div style={{ flexGrow: 1 }}>{originNode}</div>
        <div
          style={{
            border: '1px solid #ff4d4f',
            height: '66px',
            padding: '0px 15px',
            marginTop: '6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: '8px',
            gap: '15px',
          }}
        >
          <EyeOutlined
            style={{ cursor: 'pointer', color: '#379b47' }}
            onClick={() => handlePreview(file)}
          />
          <DeleteOutlined
            style={{ cursor: 'pointer', color: 'red' }}
            onClick={() => actions.remove()}
          />
        </div>
      </div>
    );
  };
  const beforeUpload = (file) => {
    const isPdf = file.type === 'application/pdf';
    if (!isPdf) {
      message.error(`${file.name} is not a pdf file`);
    }
    // Return false to stop the upload if it's not a PDF
    return isPdf ? true : Upload.LIST_IGNORE;
  };

  return (
    <Dragger
      height={height}
      onChange={handleChange}
      multiple={multiple}
      accept={accept}
      beforeUpload={checkPDFType && beforeUpload}
      // itemRender={renderItem}
      showUploadList={{ showRemoveIcon: false }}
      listType="picture"
      itemRender={(originNode, file) => (
        <div style={{ pointerEvents: 'none' }}>{originNode}</div>
      )}
      {...rest}
    >
      <DraggerText>
        <img src={DraggerIcon} alt="Upload icon" />
        <span>
          Drop file to attach or <BrowseLink>Browse</BrowseLink>
        </span>
      </DraggerText>
    </Dragger>
  );
};

export default CustomDragger;

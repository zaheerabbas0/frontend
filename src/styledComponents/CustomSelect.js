import React from 'react';
import styled from 'styled-components';
import { Select } from 'antd';
import { DarkColor } from './CustomColors';

const StyledSelect = styled(Select)`
  && {
    .ant-select-selector {
      border-color: ${(props) => props.selectedColor} !important;
      width: ${(props) => props.width || 'auto'} !important;
      text-align: ${(props) => props.textAlign || 'left'} !important;
      background: #fafafa;
      border-width: 1.5px;
      border-color: #dfdfdf;
      padding: 3px 11px !important;
      border-radius: 4px !important;
      height: ${(props) => props.height || '42px'} !important;
    }
    .ant-select-selection-item {
      color: ${(props) => props.selectedColor} !important;
    }
    &:hover .ant-select-selector,
    &.ant-select-focused .ant-select-selector {
      box-shadow: none !important;
      outline: none !important;
      border-color: ${(props) => props.selectedColor || DarkColor};
    }

    .ant-select-arrow {
      color: ${(props) => props.selectedColor || DarkColor};
      top: ${(props) => props.arrowtop || '22px'} !important;
    }

    .ant-upload.ant-upload-select {
      border: none !important;
    }
  }
`;

const CustomSelect = ({
  children,
  selectedColor,
  width,
  height,
  textAlign,
  arrowtop,
  popupClassName = '',
  ...rest
}) => {
  return (
    <StyledSelect
      selectedColor={selectedColor}
      width={width}
      height={height}
      top={arrowtop}
      textAlign={textAlign}
      popupClassName={popupClassName}
      {...rest}
    >
      {children}
    </StyledSelect>
  );
};

export default CustomSelect;

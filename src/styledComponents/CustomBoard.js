import React from 'react';
import styled from 'styled-components';

const StyledBoard = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: auto;
  white-space: nowrap;
  width: 100%;
  gap: 15px;

  &::-webkit-scrollbar {
    height: 8px;
    /* height: 0px; */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

const CustomBoard = ({ children, ...props }) => {
  return <StyledBoard {...props}>{children}</StyledBoard>;
};

export default CustomBoard;

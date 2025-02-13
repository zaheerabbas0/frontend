import React from 'react';
import styled from 'styled-components';
import { FormTitle } from '../typography';
import { Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import BackIcon from '../../../assets/BackIcon.svg';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 5px;
  width: 100%;
`;

const DateIDContainer = styled.div`
  display: flex;
  gap: 15px;
  font-size: 14px;
  color: #6b7280;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  background-color: #f3f4f6;
  border-radius: 6px;
  border: 1px solid #e8e8e8;
  gap: 10px;
  margin-left: 12px;
`;

const CalendarIcon = styled.span`
  display: flex;
  align-items: center;
  margin-right: 2px;
  margin-bottom: 2px;
`;
const StyledTag = styled(Tag)`
  padding: 0 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16.59px;
  color: #0d062d;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  display: flex;
  align-items: center;
`;

const FormHeader = ({
  title,
  children,
  showDate = true,
  id = null,
  renderChildrenOnLeft = false,
  style = {},
  withBackButton = true,
}) => {
  const navigate = useNavigate();
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <HeaderContainer style={style}>
      {withBackButton && (
        <img
          style={{ cursor: 'pointer', marginRight: '8px' }}
          alt=""
          src={BackIcon}
          onClick={() => navigate(-1)}
        />
      )}
      <FormTitle>{title}</FormTitle>
      {renderChildrenOnLeft && children}
      <DateIDContainer>
        {showDate && (
          <DateContainer>
            <CalendarIcon>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.1665 1.91699V4.04199"
                  stroke="#6C6C6C"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.8335 1.91699V4.04199"
                  stroke="#6C6C6C"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.979 6.93848H15.0207"
                  stroke="#6C6C6C"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.375 6.52116V12.542C15.375 14.667 14.3125 16.0837 11.8333 16.0837H6.16667C3.6875 16.0837 2.625 14.667 2.625 12.542V6.52116C2.625 4.39616 3.6875 2.97949 6.16667 2.97949H11.8333C14.3125 2.97949 15.375 4.39616 15.375 6.52116Z"
                  stroke="#6C6C6C"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.99676 10.2038H9.00312"
                  stroke="#6C6C6C"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.37518 10.2038H6.38154"
                  stroke="#6C6C6C"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.37518 12.3288H6.38154"
                  stroke="#6C6C6C"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </CalendarIcon>
            <span>{formattedDate}</span>
          </DateContainer>
        )}
        {id && <StyledTag>ID # {id}</StyledTag>}
      </DateIDContainer>
      {!renderChildrenOnLeft && children}
    </HeaderContainer>
  );
};

export default FormHeader;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BackIcon from '../../assets/BackIcon.svg';

const BackButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const BackIconImage = styled.img`
  cursor: pointer;
`;

const BackClick = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BackButton = ({ showText = true }) => {
  const navigate = useNavigate();

  return (
    <BackButtonWrapper>
      <BackIconImage
        src={BackIcon}
        alt="Back Icon"
        onClick={() => navigate(-1)}
      />
      {showText && (
        <BackClick onClick={() => navigate(-1)}>
          <span>Back</span>
        </BackClick>
      )}
    </BackButtonWrapper>
  );
};

export default BackButton;

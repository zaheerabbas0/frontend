import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from 'antd';
import { Black, DarkColor, Red, White } from './CustomColors';
const defaultMargin = '0px';
const StyledButton = styled(Button)`
  border-radius: 6px;
  border: none;
  overflow: hidden;
  font-size: 13px;
  cursor: pointer;
  color: ${White};
  background-color: ${DarkColor};
  border: 1px solid ${DarkColor};
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.4;
  }
  &:hover {
    background-color: ${DarkColor};
    color: ${White};
  }

  ${({ variant, color }) =>
    variant === 'default' &&
    css`
      color: ${color || Black};
      background-color: ${White};
      border: 1px solid ${color || Black};
      &:hover {
        background-color: ${White};
        color: ${DarkColor};
        border: 1px solid ${DarkColor};
      }
    `}

  ${({ variant }) =>
    variant === 'danger' &&
    css`
      color: ${White};
      background-color: ${Red};
      border: 1px solid ${Red};
      &:hover {
        border: 1px solid ${Red};
        background-color: ${White};
        color: ${Red};
      }
    `}

  ${({ variant }) =>
    variant === 'inputTag' &&
    css`
      color: ${DarkColor};
      background-color: ${White};
      border: none !important;
      box-shadow: none !important;

      &:hover {
        background-color: transparent !important;
        color: ${DarkColor};
        border: none;
      }
    `}

  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `}

  ${({ marginLeft }) =>
    marginLeft &&
    css`
      margin-left: ${marginLeft};
    `}

  ${({ marginRight }) =>
    marginRight &&
    css`
      margin-right: ${marginRight};
    `}

  ${({ marginTop }) =>
    marginTop &&
    css`
      margin-top: ${marginTop};
    `}

  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `}
`;

// const CenteredButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
const CenteredButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ margin }) => margin || defaultMargin};
`;

const CustomButton = ({ variant = 'colored', className, ...rest }) => (
  <StyledButton className={className} variant={variant} {...rest} />
);

export { CustomButton, CenteredButtonContainer };

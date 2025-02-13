import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';

const CardCol = styled(Card)`
  /* border: 2px solid #dadada; */
  /* box-shadow: ${({ boxShadow = true }) =>
    boxShadow
      ? 'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px'
      : 'none'}; */
  border-radius: 15px;
  transition: all 0.3s ease;
  background-color: ${(props) => props.theme.colors.background};
  cursor: pointer;

  /* &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  } */

  .ant-card-body {
    display: flex;
    align-items: center;
    padding: ${({ padding }) => padding || '28px 12px'};
    gap: ${({ gap }) => gap || '0'};
    height: ${({ height }) => height ?? ''};
  }

  width: 100%;
  box-sizing: border-box;
`;

const IconWrapper = styled.div`
  margin: ${({ margin }) => margin || '0 30px 0 15px'};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardContent = styled.div`
  display: flex;
  gap: ${({ gap }) => gap || '8px 0'};
  flex-direction: column;
  justify-content: center;
  flex-grow: ${({ flexGrow }) => flexGrow || '0'};
  color: ${(props) => props.theme.colors.text};
`;

const Title = styled.div`
  font-family: 'Rubik', sans-serif;
  font-weight: ${({ fontWeight }) => fontWeight || '400'};
  font-size: ${({ fontSize }) => fontSize || '16px'};
  line-height: ${({ lineHeight }) => lineHeight || '18px'};
`;

const Count = styled.div`
  font-family: 'Rubik', sans-serif;
  font-weight: ${({ fontWeight }) => fontWeight || '600'};
  font-size: ${({ fontSize }) => fontSize || '22px'};
  line-height: ${({ lineHeight }) => lineHeight || '36px'};
`;

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 16px;
  background: ${(props) => props.theme.colors.containerBackground};
`;

const CustomCard = ({ title, count, icon, onClick, style, styles = {} }) => {
  return (
    <CardCol onClick={onClick} style={style} {...styles?.card}>
      <IconWrapper {...styles?.iconWrapper}>
        <img src={icon} alt={title} style={styles?.iconWrapper?.icon} />
      </IconWrapper>
      <CardContent {...styles?.content}>
        <Title {...styles?.title}>{title}</Title>
        <Count {...styles?.count}>{count}</Count>
      </CardContent>
    </CardCol>
  );
};

export default CustomCard;

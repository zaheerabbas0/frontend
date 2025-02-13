import React from 'react';
import { Col, Card } from 'antd';
import styled from 'styled-components';

const CustomStyledCard = styled(Card)`
  border-radius: 12px;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

const StyledCard = ({ children, responsive, styles }) => (
  <Col {...responsive}>
    <CustomStyledCard style={styles}>{children}</CustomStyledCard>
  </Col>
);

export default StyledCard;

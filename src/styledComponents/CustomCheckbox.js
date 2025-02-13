import { DarkColor } from './CustomColors';
import styled from 'styled-components';
import { Checkbox } from 'antd';

const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${DarkColor};
    border-color: ${DarkColor};
  }
  .ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):hover
    .ant-checkbox-inner,
  :where(.css-dev-only-do-not-override-d2lrxs).ant-checkbox:not(
      .ant-checkbox-disabled
    ):hover
    .ant-checkbox-inner {
    border-color: ${DarkColor};
    outline: ${DarkColor};
  }
  ..ant-checkbox .ant-checkbox-input:hover {
    border-color: ${DarkColor};
    outline: ${DarkColor};
  }
`;

const CustomCheckbox = ({ className, ...rest }) => {
  return <StyledCheckbox className={className} {...rest} />;
};

export default CustomCheckbox;

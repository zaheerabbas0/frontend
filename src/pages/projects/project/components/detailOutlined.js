import { Row, Col } from 'antd';
import styled from 'styled-components';

const Label = styled.div`
  display: inline-block;
  width: 46px;
  height: 17px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: ${({ fontSize }) => fontSize || '14px'};
  line-height: 16.59px;
  color: #919191;
  border-radius: 4px;
  margin-bottom: ${({ marginBottom }) => marginBottom || '12px'};

  & + div {
    font-family: 'Rubik', sans-serif;
    font-weight: 500;
    font-size: ${({ valueFontSize }) => valueFontSize || '15px'};
    line-height: 16.59px;
    color: #474747;
  }
`;

const StyledCol = styled(Col)`
  border: 1px solid #e8e8e8;
  padding: ${({ padding }) => padding || '20px 35px'} !important;

  ${({ minimumPerRow, index, entriesLength }) => {
    if (minimumPerRow === 3) {
      if (index === 0) {
        return 'border-top-left-radius: 16px;';
      } else if (
        index === 2 ||
        (index === entriesLength - 1 && index % 3 === 2)
      ) {
        return 'border-top-right-radius: 16px;';
      } else if (index === entriesLength - 1 || index === entriesLength - 2) {
        return 'border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;';
      }
    } else {
      if (index === 0) {
        return 'border-top-left-radius: 16px;';
      } else if (index === 1) {
        return 'border-top-right-radius: 16px;';
      } else if (index === entriesLength - 1) {
        return 'border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;';
      }
    }
  }}
`;

const DetailRow = ({ details, rowStyles, minimumPerRow = 2, styles = {} }) => {
  const colSpan = 24 / minimumPerRow;
  const entries = Object.entries(details);
  const lastItemIndex = entries.length - 1;

  return (
    <Row gutter={16} style={rowStyles}>
      {entries.map(([key, value], index) => (
        <StyledCol
          span={index === lastItemIndex ? 24 : colSpan}
          key={key}
          minimumPerRow={minimumPerRow}
          index={index}
          entriesLength={entries.length}
          {...styles?.cell}
        >
          <Label {...styles.label}>{key}:</Label>
          <div
            style={{
              ...styles.value,
              fontSize: styles.value?.fontSize,
              padding: styles.value?.padding,
            }}
          >
            {value && typeof value === 'function' ? value() : value}
          </div>
        </StyledCol>
      ))}
    </Row>
  );
};

export default DetailRow;

import styled from 'styled-components';

export const CardTitle = styled.h3`
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
`;

export const FormTitle = styled.h2`
  font-weight: 500;
  font-size: 20px;
  line-height: 23.7px;
  // color: #0d062d;
  color: ${(props) => props.theme.colors.text};
`;

export const Subtitle = styled.h4`
  font-weight: bold;
  font-size: 15px;
  line-height: 17.78px;
  color: #0d062d;
`;

export const GrayHeading = styled.h5`
  font-weight: 400;
  font-size: 13px;
  line-height: 14.22px;
  color: #919191;
  margin-bottom: ${(props) => props.marginbtn || '12px'};
`;

export const Paragraph = styled.pre`
  font-weight: 400;
  font-size: 14px;
  line-height: 118.5%;
  color: #0d062d;
  white-space: pre-wrap;
  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

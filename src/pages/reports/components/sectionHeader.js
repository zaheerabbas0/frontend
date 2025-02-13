import styled from 'styled-components';

const Title = styled.div`
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 118.5%;
  color: #0d062d;
`;

const TitleContainer = styled.div`
  background-color: #f0f0f0;
  padding: 8px 16px;
  border-radius: 4px;
`;

const SectionHeader = ({ title }) => {
  return (
    <TitleContainer>
      <Title>{title}</Title>
    </TitleContainer>
  );
};

export default SectionHeader;

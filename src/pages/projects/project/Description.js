import React from 'react';
import { CardTitle, Paragraph } from '../../../components/ui/typography';
import { Project_Entity_Name } from '../../../constants/project/TitleRoutesConstants';

const Description = ({ description }) => {
  return (
    <>
      <CardTitle style={{ marginBottom: '25px' }}>
        {`${Project_Entity_Name} Description`}
      </CardTitle>
      <Paragraph style={{ marginBottom: '25px' }}>
        {description ? description : 'No Description Provided'}
      </Paragraph>
    </>
  );
};
export default Description;

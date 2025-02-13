import { Card, List } from 'antd';
import SectionHeader from './sectionHeader';
import { Collaborator } from '../../projects/project/components/projectCollaborators';

const Collaborators = ({ collabrators }) => {
  const collaboratorsData = collabrators || [
    {
      id: 1,
      name: 'Nadeem Khan',
      role: 'Product Designer',
      imageUrl: 'path_to_nadeem_image',
    },
    {
      id: 2,
      name: 'Daniyal Waris',
      role: 'Developer',
      imageUrl: 'path_to_daniyal_image',
    },
    {
      id: 3,
      name: 'Mussdiq Ali',
      role: 'Developer',
    },
  ];
  return (
    <div>
      <SectionHeader title="Collaborators" />
      <Card>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={collaboratorsData}
          renderItem={(item) => (
            <List.Item>
              <Collaborator {...item} />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Collaborators;

import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';
import CustomAvatar from '../../../../styledComponents/CustomAvatar';
import { CardTitle } from '../../../../components/ui/typography';
import { hasPermission } from '../../../../constants/UsersRole';

const List = styled.ul`
  list-style: none;
  margin: 15px 0 0 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ListItem = styled.li`
  padding: 12px;
  border: 1px solid #dadada;
  border-radius: 14px;
  display: flex;
  align-items: center;
`;

const NameAndRoleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

const Name = styled.span`
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #1c1c1c;
`;

const Role = styled.span`
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  color: #b6b6b6;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  background-color: #f5f5f5;
  cursor: pointer;
  text-align: center;
`;

export const Collaborator = ({ name, role, image_url }) => (
  <ListItem>
    <CustomAvatar name={name} image_url={image_url} size="large" />
    <NameAndRoleContainer>
      <Name>{name}</Name>
      <Role>{role}</Role>
    </NameAndRoleContainer>
  </ListItem>
);

const CollaboratorsList = ({ collabrators, navigatToEdit }) => {
  const collaboratorsData = collabrators || [
    {
      id: 1,
      name: 'Hamza',
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
    <>
      <CardTitle>Collaborators</CardTitle>
      <div style={{ overflowY: 'auto', maxHeight: '360px', height: '360px' }}>
        <List>
          {collaboratorsData.map((item) => (
            <Collaborator key={item.id} {...item} />
          ))}
          {hasPermission('update:project') && (
            <ListItem>
              <Button onClick={navigatToEdit}>
                <PlusOutlined />
                Add Collaborator
              </Button>
            </ListItem>
          )}
        </List>
      </div>
    </>
  );
};

export default CollaboratorsList;

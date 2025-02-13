import React from 'react';
import Setting from '../pages/setting/Setting';
import UpdateInfo from '../pages/setting/UpdateInfo/UpdateInfo';
import Category from '../pages/setting/SystemSettings/Category/Category';
import SettingLayout from '../pages/setting/layout';
import TagsPage from '../pages/setting/SystemSettings/Tags/TagsPage';
import PriorityPage from '../pages/setting/SystemSettings/Prority/Priority';
import GroupsPage from '../pages/setting/SystemSettings/Group/Group';
import SkillsPage from '../pages/setting/SystemSettings/Skills/Skills';

const routeConfig = {
  path: 'setting',
  element: <SettingLayout />,
  protected: true,
  children: [
    { element: <Setting />, index: true },
    {
      path: 'system',

      children: [
        { path: 'category', element: <Category /> },
        { path: 'tags', element: <TagsPage /> },
        { path: 'priority', element: <PriorityPage /> },
        { path: 'skills', element: <SkillsPage /> },
        { path: 'groups', element: <GroupsPage /> },
      ],
    },
    { path: 'edit-info/:id', element: <UpdateInfo /> },
    { path: 'system-settings/category', element: <Category /> },
  ],
};

export default routeConfig;

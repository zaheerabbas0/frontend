import React from 'react';
import TabUI from './tabUi';
import CustomTabs from '../../../styledComponents/CustomTabs';

const HorizontalNav = ({ tabData, ...rest }) => {
  return (
    <>
      <CustomTabs key={`${1}`} {...rest}>
        {tabData
          .filter((tab) => tab.isAuthorized !== false)
          .map((tab) => (
            <CustomTabs.TabPane
              tab={
                <TabUI
                  icon={tab.icon}
                  text={tab.text}
                  altText={tab.altText}
                  iconStyle={tab.iconStyle}
                  tabClassName={tab.tabClassName}
                />
              }
              key={tab.key}
              style={tab.tabPaneStyles}
            >
              {tab.content}
            </CustomTabs.TabPane>
          ))}
      </CustomTabs>
    </>
  );
};

export default HorizontalNav;

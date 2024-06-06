import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

const ThemeTabs = ({ tabs = [] }) => {
  return (
    <div className='dynamic--tabs'>
      <Tabs as="ul">
        {tabs.map((tab, index) => {
          return (
            <Tab as="li" key={index} eventKey={tab.eventKey} title={tab.title}>
              {tab.content}
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
};

export default ThemeTabs;

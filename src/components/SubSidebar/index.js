import React, { Component, useState } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Checkbox,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';

//import './index.css';

const SubSidebar = () => {   
  const [activeItem, setActiveItem] = useState('');

  const handleClick = (item) => () => { 
    setActiveItem(item);
  }
  
  return (
    <div style={{ }}>
      <Menu fluid pointing secondary vertical inverted style={{ padding: '1em 0em 1em 0em', backgroundColor: '#283C50' }}>
        <Menu.Item
              name='account'
              active={activeItem === 'account'}
              onClick={handleClick('account')}
            />
            <Menu.Item
              name='settings'
              active={activeItem === 'settings'}
              onClick={handleClick('settings')}
            />
      </Menu>
    </div>
  );
}

export default SubSidebar
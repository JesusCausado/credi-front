import React, { useState, useEffect } from 'react';
import {
  Accordion,
  Menu,
  Sidebar,
  Label,
  Form
} from 'semantic-ui-react';

import client from "../../client";
//import SubSidebar from "../SubSidebar/index";

const SubSidebar = () => {
  const [activeItem, setActiveItem] = useState('');

  const handleClick = (item) => () => {
    setActiveItem(item);
  }

  return (
    <div style={{}}>
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

const HorizontalSidebar = ({ animation, direction, visible }) => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const getMenu = async () => {
      try {
        const response = await client('post', null, 'menus');
        if (response.status === 200) {
          const data = response.data.menus;
          const dataMenu = [];
          for (let index = 0; index < data.length; index++) {
            const menu = data[index];
            dataMenu.push({
              key: menu._id,
              title: menu.name,
              content: { content: <SubSidebar /> }
            });
          };
          setMenus(dataMenu);
        };
      } catch (error) {
        console.log(error);
      }
    };
    getMenu();
  }, [])

  return (
    <Sidebar
      as={Menu}
      animation={animation}
      direction={direction}
      vertical
      visible={visible}
      width='thin'
      color='blue'
      inverted
      style={{ padding: '2em 0em 2em 0em', backgroundColor: '#283C50' }}
    >
      {<Accordion /*defaultActiveIndex={0}*/ panels={menus} fluid inverted />}
    </Sidebar>
  );
}



export default HorizontalSidebar

import React, { useState, useEffect } from 'react';
import {
  Accordion,
  Menu,
  Sidebar,
  Input,
  Form
} from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
//CSS
import '../../components/HorizontalSidebar/index.css';

import client from "../../client";

const SubSidebar = ( idMenu ) => {
  const [activeItem, setActiveItem] = useState('');
  const [options, setOptions] = useState('');
  const history = useHistory();
  const data = {
    menu: '',
    typeUser: ''
  }
  const handleClick = (item, route) => () => {
    setActiveItem(item);
    history.replace(route);
  }

  useEffect(() => {    
    const getOptions = async () => {
      try {
        if (history) data.menu = idMenu.idMenu; 
        var current = JSON.parse(localStorage.getItem('currentUser'));   
        data.typeUser = current.idTypeUser._id;  
        const response = await client('post', data, 'options');        
        if (response.status === 200) {
          const dat = response.data.option;
          const dataOption = [];
          for (let index = 0; index < dat.length; index++) {
            const menu = dat[index];           
            if (menu.idOption != null) {
              dataOption.push({
                systemName: menu.idOption.systemName,
                route: menu.idOption.route
              });
            }
          };
          setOptions(dataOption);
        }
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 401) {
          localStorage.clear();
          history.replace('/login');   
        }
      }
    };
    getOptions();
  }, [])
  
  return (
    <div>
      <Menu fluid secondary vertical inverted style={{ backgroundColor: '#283C50' }}>  
        {options && options.map((option, i) =>
          <Menu.Item
            key={i}
            name={option.systemName}
            active={activeItem === option.systemName}
            onClick={handleClick(option.systemName, option.route)} />
        )}
      </Menu>
    </div>
  );
}

const HorizontalSidebar = ({ animation, direction, visible }) => {
  const [menus, setMenus] = useState([]);
  const history = useHistory();

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
              //title: menu.name,
              title: {
                content: menu.name,
                icon: 'folder outline',
              },
              content: { content: <SubSidebar idMenu = {menu._id}/> }
            });
          };
          setMenus(dataMenu);
        };
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 401) {
          localStorage.clear();
          history.replace('/login');
        }
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
      inverted
      style={{ backgroundColor: '#283C50' }}
    >
    <Menu.Item>
          <Input icon='search' placeholder='Buscar...' />
        </Menu.Item>
      {<Accordion /*defaultActiveIndex={0}*/ panels={menus} fluid inverted styled style={{ padding: '2em 0em 1em 1em', backgroundColor: '#283C50' }}/>}
    </Sidebar> 
  );
}



export default HorizontalSidebar

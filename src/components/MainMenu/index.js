import React, { useState } from 'react';
import { Button, Container, Header, Menu } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

const MainMenu = () => {
  const [activeItem, setActiveItem] = useState('');
  const history = useHistory();
  const goTo = (item, path) => () => {
    if (item === 'log out') {
      localStorage.clear();
    } 
    history.push(path);
    setActiveItem(item);       
  }

  return (
    <Menu size='small' stackable borderless fluid={true} inverted style={{ height: '4em', padding: '0em 6em 0em 6em', margin: '0em 0em', backgroundColor: '#124678'}}>        
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={goTo('home', '/')}>
          <img src='https://react.semantic-ui.com/logo.png' />
        </Menu.Item>
        <Menu.Item header> Jesus Causado </Menu.Item>        
        <Menu.Menu position='right'> 
          <Menu.Item
            name='log out'
            active={activeItem === 'log out'}
            onClick={goTo('log out', '/login')}
          />         
        </Menu.Menu>      
    </Menu>
  );
}

export default MainMenu
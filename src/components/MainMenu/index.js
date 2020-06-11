import React, { useState } from 'react';
import { Button, Container, Image, Menu } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

// No es el mismo
const MainMenu = () => {
  const [activeItem, setActiveItem] = useState('');
  const history = useHistory();
  const goTo = (item, path) => () => {
    history.push(path);
    setActiveItem(item);    
  }
  return (
    <Menu stackable borderless fluid={true} fixed='top'>
      <Container>
        <Menu.Item>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={goTo('home', '/')}>
            <img src='https://react.semantic-ui.com/logo.png' />
          </Menu.Item>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item
            name='sign-in'
            active={activeItem === 'sign-in'}
            onClick={goTo('sign-in', '/login')}
          />
          <Menu.Item>
            <Button color='blue' onClick={goTo('register', '/register')}> Register </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

export default MainMenu
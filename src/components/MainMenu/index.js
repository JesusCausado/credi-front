import React, { useState, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
//CSS
import './index.css';

const MainMenu = ( {handleClick} ) => {  
  const [activeItem, setActiveItem] = useState('');
  const [currentUser, setCurrentUser] = useState('');    
  const history = useHistory();
  const goTo = (item, path) => () => {
    setActiveItem(item); 
    if (item === 'log out') {
      localStorage.clear();
      if (path) history.replace(path);
    } 
    else if (item === 'home') {      
      handleClick();
    } 
                  
  }

  return (
    <div id="menu" className="container_menu">       
      <Menu size='small' fluid inverted style={{ padding: '0em 7em 0em 89px',  backgroundColor: '#176479', borderRadius: 'unset'}}>        
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={goTo('home', '/')}>
            <img src='https://react.semantic-ui.com/logo.png' />
          </Menu.Item>
          <Menu.Item
            name={currentUser}
            active={activeItem === 'currentUser'}
            onClick={goTo('currentUser', '')}
            />       
          <Menu.Menu position='right'> 
            <Menu.Item
              name='log out'
              active={activeItem === 'log out'}
              onClick={goTo('log out', '/login')}
            />         
          </Menu.Menu>      
      </Menu>
    </div>       
  );
}

export default MainMenu
import React, { useState, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

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

  useEffect(() => {
    var current = JSON.parse(localStorage.getItem('currentUser'));
    if (current) {
      setCurrentUser(current.user);
    } else {
      history.replace("/login");    
    }  
  }, [])

  return (
    <div id="menu">       
      <Menu size='small' stackable borderless fluid={true} inverted style={{ height: '4em', padding: '0em 7em 0em 7em', margin: '0em 0em', backgroundColor: '#124678'}}>        
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
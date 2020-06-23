import React, { useState } from 'react';
import {
  Image,
  Segment,
  Sidebar,
} from 'semantic-ui-react';

//import './index.css';
import HorizontalSidebar from "../../components/HorizontalSidebar/index";
import MainMenu from "../../components/MainMenu/index";


const Home = () => {   
  const [visible, setVisible] = useState(true);
  const handleClick = () => () => {    
    if (visible) {
      setVisible(false);
    }else{
      setVisible(true);
    }   
  }

  return (
    <div>             
      {/*<Button basic color='red' fluid={false} onClick={handleClick()}>
          <Icon name='google plus' /> Google
      </Button>*/}
      <MainMenu/>
      <div style={{height: '55em'}}>                 
        <Sidebar.Pushable as={Segment} style={{ border: '0px', backgroundColor: 'yellow'}}>
          <HorizontalSidebar
            animation='slide along'
            direction='left'
            visible={visible}
          />  
                     
          <Sidebar.Pusher style={{ backgroundColor: 'green'}}>
            <Segment basic style={{padding: '4em 0em 2em 0em', backgroundColor: 'blue'}}>
              <Image src='https://www.ealde.es/wp-content/uploads/2018/04/gestion-de-riesgos-credito-comercial.jpg' size='big' rounded centered />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    </div>
  );
}

export default Home
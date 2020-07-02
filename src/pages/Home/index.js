import React, { useEffect ,useState } from 'react';
import {
  Image,
  Segment,
  Sidebar,
} from 'semantic-ui-react';

import {
  useHistory
} from "react-router-dom";
import  client  from "../../client";
import HorizontalSidebar from "../../components/HorizontalSidebar/index";
import MainMenu from "../../components/MainMenu/index";


const Home = () => {   
  const history = useHistory();
  const [visible, setVisible] = useState(true);  
  const data = {
    username: ''
  }
  const handleClick = () => {   
    if (visible) {
      setVisible(false);
    }else{
      setVisible(true);
    }   
  }

  async function getUser() {
    console.log(history);  
    if (history) data.username = history.location.state.user; 
    try {
      var response = await client('post', data, 'user');      
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));   
      } 
    } catch (error) {
      console.log(error);      
    }    
  }

  useEffect(() => {
    var current = localStorage.getItem('currentUser');
    if (!current) {      
      getUser();
    }    
  }, [])

  return (
    <div id="home">             
      {/*<Button basic color='red' fluid={false} onClick={handleClick()}>
          <Icon name='google plus' /> Google
      </Button>*/}
      <MainMenu handleClick = {handleClick}/>  
      <div id="sidebar" style={{height: '58em'}}>                       
        <Sidebar.Pushable as={Segment} style={{ border: '0px' }}>
          <HorizontalSidebar
            animation='slide along'
            direction='left'
            visible={visible}
          />  
                     
          <Sidebar.Pusher>
            <Segment basic style={{padding: '8em 0em 2em 0em'}}>
              <Image src='https://www.ealde.es/wp-content/uploads/2018/04/gestion-de-riesgos-credito-comercial.jpg' size='big' rounded centered />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    </div>
  );
}

export default Home
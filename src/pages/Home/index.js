import React, { useEffect ,useState } from 'react';
import {
  Image,
  Segment,
  Sidebar,
  Header,
  Icon,
  Button
} from 'semantic-ui-react';

import {
  useHistory
} from "react-router-dom";
import  client  from "../../client";
import HorizontalSidebar from "../../components/HorizontalSidebar/index";
import MainMenu from "../../components/MainMenu/index";
//CSS
import '../../components/HorizontalSidebar/index.css';


const Home = ( user ) => {   
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
  
  const getUser = async () => { 
    try {
      var token = localStorage.getItem('myToken');
      if (history != null) data.username = user.location.state.user;
      //if (history) data.username = 'jcausado1'; 
      var response = await client('post', data, 'user');      
      console.log(response.data.user);
      if (response.status === 200) {
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));   
      } 
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 401) {
        localStorage.clear();
        history.replace('/login');
      }     
    }       
  }

  useEffect(() => {  
    var current = JSON.parse(localStorage.getItem('currentUser'));
    if (!current) {
      getUser();     
    } 
  }, [])

  return (
    <div id="home">   
      <MainMenu handleClick = {handleClick}/>
      <div id="sidebar" className="sidebar">       
        <Sidebar.Pushable as={Segment} style={{border: '0px', borderRadius: 'unset', overflow: 'hidden'}}>
          <HorizontalSidebar
            animation='slide along'
            direction='left'
            visible={visible}
          />   
          <Sidebar.Pusher>
            <Segment basic style={{ padding: '10em 15em 2em 2em'}}>
              <Image src='https://www.ealde.es/wp-content/uploads/2018/04/gestion-de-riesgos-credito-comercial.jpg' size='big' rounded centered />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    </div>
  );
}

export default Home
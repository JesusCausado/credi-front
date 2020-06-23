import React, { useState, useEffect } from 'react';
import { Header, Segment, Grid, Form, Button, Message } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
import { validateEmail } from '../../utils';
import './index.css';
import MainMenu from "../../components/MainMenu/index";
import Footer from "../../components/Footer/index";
import  client  from "../../client";

const errors = {
  email: {
    content: 'Please enter a valid email address',
    pointing: 'below',
  },
  pass: {
    content: 'Lo que se te de la hpta gana de colocar aqui',
    pointing: 'below',
  }
};

const Login = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  //const [email, setEmail] = useState('');
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const data = {
    user: '',
    password: ''
  }
  const history = useHistory();

  const disabled = () => {
    //if (!validateEmail(email)) return true;
    if (user === null ||  user === '') {
      return true;      
    } else if (pass === null ||  pass === '') {
      return true;      
    } else {
      return false;
    }    
  };

  const handleClick = () => () => {  
      setLoading(true);
      setTimeout(() => {
        getUser(); 
      }, 3000); 
  }

  const handleChangeUser = (e, { value }) => setUser(value);

  const handleChangePass = (e, { value }) => setPass(value);

  //const handleChangeEmail = (e, { value }) => setEmail(value);

  async function getUser() {  
    data.user = user;
    data.password = pass;  
    try {
      var response = await client('post', data, 'login');      
      if (response.status == 200) {
        setErr(false);
        localStorage.setItem('myToken', response.data.token);
        history.push('/');         
      } 
    } catch (error) {
      console.log(error);
      setErr(true);
    }
    
  }

  useEffect(() => {
    setLoading(false);
  }, [])

  return (
    <div >
      <Segment style={{ backgroundColor: '#FFFFFF', margin: '6em 35em 6em 35em', padding: '2em 0em 2em 0em', height: '30em', widh: '100em' }} vertical raised>
        <Grid container stackable verticalAlign='middle' columns={3}>
          <Grid.Row centered style={{ padding: '2em 2em' }}>
            <Header as='h2'> Log in to your account </Header>
          </Grid.Row>
          <Grid.Row centered >
            <Grid.Column width={8}>
              <Form loading={loading}>
                {/*<Form.Input
                  name='email'
                  label='Email'
                  type='email'
                  onChange={handleChangeEmail}
                  placeholder='example@corre.com'
                  error={email.length && !validateEmail(email) ? errors.email : null} />*/}
                <Form.Input name='user' 
                  label='User' 
                  placeholder='User' 
                  type='text' 
                  onChange={handleChangeUser} />  
                <Form.Input name='password' 
                  label='Password' 
                  placeholder='Password' 
                  type='password' 
                  onChange={handleChangePass} />
                <Button disabled={disabled()} type='submit' color='blue' fluid onClick={handleClick()}>Login</Button>
                {err &&
                  <Message negative>
                    <Message.Header>Usuario o contraseña invalida</Message.Header>
                    <p>Error al realizar el proceso</p>
                  </Message>
                }
              </Form>              
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
}

export default Login
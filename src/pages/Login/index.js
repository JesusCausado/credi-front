import React, { useState } from 'react';
import { Header, Segment, Grid, Form, Button, Divider, Icon } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

import MainMenu from "../../components/MainMenu/index";
import Footer from "../../components/Footer/index";

const Login = () => { 

    return (
        <div>
            <MainMenu/> 
            <Segment style={{ padding: '10em 0em', height: '600px'}} vertical secondary>
                <Grid container stackable verticalAlign='middle' columns={3}>
                    <Grid.Row centered style={{ padding: '2em 2em' }}>
                        <Header as='h2'> Log in to your account </Header>
                    </Grid.Row>                
                    <Grid.Row centered >
                        <Grid.Column width={8}>                            
                            <Form> 
                                <Form.Input label='Email' placeholder='joe@schmoe.com' />
                                <Form.Input label='Password' placeholder='Password' type='password'/> 
                                <Button type='submit' color='blue' fluid >Login</Button>
                            </Form>
                        </Grid.Column>                 
                    </Grid.Row>                    
                </Grid>
            </Segment>
            <Footer/>  
        </div>
    );
}

export default Login
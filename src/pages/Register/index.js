import React, { useState } from 'react';
import { Header, Segment, Grid, Form, Button, Divider, Icon } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

import MainMenu from "../../components/MainMenu/index";
import Footer from "../../components/Footer/index";

const Register = () => { 

    return (
        <div>
            <MainMenu/> 
            <Segment style={{ padding: '8em 0em' }} vertical secondary>
                <Grid container stackable verticalAlign='middle' columns={3}>
                    <Grid.Row centered style={{ padding: '2em 2em' }}>
                        <Header as='h2'> Registration </Header>
                    </Grid.Row>                
                    <Grid.Row centered >
                        <Grid.Column width={8}>                            
                            <Form> 
                                <Form.Input label='Email' placeholder='joe@schmoe.com' />
                                <Form.Input label='Password' placeholder='Password' type='password'/>
                                <Form.Input label='Confirm Password' placeholder='Confirm Password' type='password'/>
                                <Form.Checkbox label='I agree to the Terms and Conditions' />
                                <Button type='submit' color='teal' fluid >Register</Button>
                            </Form>
                        </Grid.Column>                 
                    </Grid.Row>
                    <Divider
                        as='h4'
                        className='header'
                        horizontal
                        style={{ padding: '0em 0em', textTransform: 'uppercase' }}
                    >
                    <a > o </a>
                    </Divider>
                    <Grid.Row centered >
                        <Grid.Column width={8}>                            
                            <Button basic color='blue' fluid={true} style={{ margin: '0em 0em 1em' }}>
                                <Icon name='facebook' /> Facebook
                            </Button>
                            <Button basic color='red' fluid={true}>
                                <Icon name='google plus' /> Google
                            </Button>
                        </Grid.Column>                 
                    </Grid.Row>
                </Grid>
            </Segment>
            <Footer/>  
        </div>
    );
}

export default Register
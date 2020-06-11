import React, { useState } from 'react';
import { 
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Dropdown,
    Segment,
    Sidebar,
    Visibility, } from 'semantic-ui-react';

//import './index.css';
import MainMenu from "../../components/MainMenu/index";
import Footer from "../../components/Footer/index";
    

const Home = ( history ) => {   
    return (  
        <div> 
            <MainMenu/>          
            <Segment style={{ padding: '8em 0em' }} vertical secondary>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header as='h3' style={{ fontSize: '2em', color: '#CF5050'}}>
                                Languaje Roulette
                            </Header>
                            <p style={{ fontSize: '1.5em' }}>
                                Es un portal web donde se puede puede charlar con personas de su lengua nativa o cualquiera que quiera aprender.
                            </p>
                        </Grid.Column>
                        <Grid.Column floated='right' width={6}>
                            <Image bordered rounded size='large' src='https://files.merca20.com/uploads/2018/12/videollamada-de-negocios.jpg' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <Segment style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    
                </Grid>
            </Segment>

            <Segment style={{ padding: '5em 5em' }} vertical secondary>
                <Container text>                    
                    <Header as='h3' style={{ fontSize: '2em', color: '#CF5050'}}> 
                        Breaking The Grid, Grabs Your Attention
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                    Instead of focusing on content creation and hard work, we have learned how to master the
                    art of doing nothing by providing massive amounts of whitespace and generic content that
                    can seem massive, monolithic and worth your attention.
                    </p>
                    <Button as='a' size='large'>
                        Read More
                    </Button>

                    <Divider
                        as='h4'
                        className='header'
                        horizontal
                        style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                    >
                        <a href='#'>Case Studies</a>
                    </Divider>

                    <Header as='h3' style={{ fontSize: '2em', color: '#CF5050' }}>
                    Did We Tell You About Our Bananas?
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                    Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
                    it's really true. It took years of gene splicing and combinatory DNA research, but our
                    bananas can really dance.
                    </p>
                    <Button as='a' size='large'>
                    I'm Still Quite Interested
                    </Button>
                </Container>
            </Segment>

            <Segment style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    
                </Grid>
            </Segment>

            <Footer/>            
        </div>
    );
}

export default Home
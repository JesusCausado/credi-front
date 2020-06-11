import React, { useState } from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import '../../assets/css/index.css'

const PageError = () => {

    return (
        <Grid style={{ padding: '5em 5em' }}>
            <Grid.Row>
                <Grid.Column width={3}>
                    <Image src='https://i.pinimg.com/originals/1c/15/38/1c1538c925d6865603a120e06053cb3f.jpg' />
                </Grid.Column>
                <Grid.Column width={13}>
                    <Header as='h1'> Oops!, Error 404</Header>
                    <Header as='h5' color='grey'> Page not found </Header>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default PageError
import React from 'react';
import { Header, Segment, Grid, Sidebar, Button, Image, Icon, Menu, Checkbox } from 'semantic-ui-react';

import MainMenu from "../../components/MainMenu/index";
import Footer from "../../components/Footer/index";

const Register = () => (
    <Segment placeholder>
      <Header icon>
        <Icon name='pdf file outline' />
        No documents are listed for this customer.
      </Header>
      <Button primary>Add Document</Button>
    </Segment>
  )

export default Register
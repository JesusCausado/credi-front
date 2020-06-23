import React, { useState } from 'react';
import { 
  Accordion,
  Menu,
  Sidebar, 
  Label,
  Form } from 'semantic-ui-react';

import SubSidebar from "../SubSidebar/index";

const HorizontalSidebar = ({ animation, direction, visible }) => {  
  return (
    <Sidebar
      as={Menu}
      animation={animation}
      direction={direction}
      vertical
      visible={visible}
      width='thin'
      color='blue' 
      inverted
      style={{ padding: '2em 0em 2em 0em', backgroundColor: '#283C50' }}
    >
      <Accordion /*defaultActiveIndex={0}*/ panels={rootPanels} fluid inverted/>
    </Sidebar>
  );
}

const rootPanels = [
  { key: 'panel-1', title: 'SISTEMA', content: { content: <SubSidebar/> } },
  { key: 'panel-2', title: 'USUARIOS', content: { content: <SubSidebar/> } },
]

export default HorizontalSidebar

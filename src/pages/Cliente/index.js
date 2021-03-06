import React, { useEffect , useState } from 'react';
import {
  Image,
  Segment,
  Sidebar,
  Button,
  Form,
  Table,
  Tab,
  Modal
} from 'semantic-ui-react';

import {
  useHistory
} from "react-router-dom";
import  client  from "../../client";
import HorizontalSidebar from "../../components/HorizontalSidebar/index";
import MainMenu from "../../components/MainMenu/index";
import swal from 'sweetalert';
//CSS
import '../../components/HorizontalSidebar/index.css';

const TabCliente = () => {
  const [visible, setVisible] = useState(true); 
  const history = useHistory();
  const panes = [
    {
      menuItem: 'Crear  Cliente',
      render: () => <Tab.Pane attached={false}> <CrearCliente/> </Tab.Pane>,
    },
    {
      menuItem: 'Listado de Clientes',
      render: () => <Tab.Pane attached={false}> <ListarCliente /*getClients = {getClients()} clients = {clients} *//> </Tab.Pane>,
    },
  ]
  const handleClick = () => {   
    if (visible) {
      setVisible(false);
    }else{
      setVisible(true);
    }   
  }  

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
          <Segment basic style={{ padding: '2em 15em 2em 2em'}}>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  </div>
  );
}

const CrearCliente = () => {  
  const [lastName, setLastName] = useState('');  
  const [name, setName] = useState('');   
  const [tipoDoc, setTipoDoc] = useState('');   
  const [nroDoc, setNroDoc] = useState('');   
  const [lugarExp, setLugarExp] = useState('');   
  const [fechaExp, setFechaExp] = useState('');   
  const [sexo, setSexo] = useState('');   
  const [lugarNac, setLugarNac] = useState('');   
  const [fechaNac, setFechaNac] = useState('');   
  const [estadoCivil, setEstadoCivil] = useState('');   
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const data = {
    lastName: '',
    name: '',
    tipoDoc: '',
    nroDoc: '',
    lugarExp: '',
    fechaExp: '',
    sexo: '',
    lugarNac: '',
    fechaNac: '',
    estadoCivil: '',
  }

  const dbOptions = [
    {
      key: 'C.C.',
      text: 'C.C.',
      value: 'cc',
    },
    {
      key: 'Nit',
      text: 'Nit',
      value: 'nit',
    },
  ]

  const dbSexo = [
    {
      key: 'Hombre',
      text: 'Hombre',
      value: 'hombre',
    },
    {
      key: 'Mujer',
      text: 'Mujer',
      value: 'mujer',
    },
    {
      key: 'Otro',
      text: 'Otro',
      value: 'otro',
    },
  ]

  const dbEstCivil = [
    {
      key: 'Soltero',
      text: 'Soltero',
      value: 'soltero',
    },
    {
      key: 'Casado',
      text: 'Casado',
      value: 'soltero',
    },
    {
      key: 'Union Libre',
      text: 'Union Libre',
      value: 'unionLibre',
    },
    {
      key: 'Viudo',
      text: 'Viudo',
      value: 'viudo',
    },
    {
      key: 'Separado',
      text: 'Separado',
      value: 'separado',
    },
    {
      key: 'Unión Civil',
      text: 'Unión Civil',
      value: 'unionCivil',
    },
  ]

  async function setCliente() {    
    try {
      data.lastName = lastName;
      data.name = name;
      data.tipoDoc = tipoDoc;
      data.nroDoc = nroDoc;
      data.lugarExp = lugarExp;
      data.fechaExp = fechaExp;
      data.sexo = sexo;
      data.lugarNac = lugarNac;
      data.fechaNac = fechaNac;
      data.estadoCivil = estadoCivil;
      var response = await client('post', data, 'save-client');  
      if (response.status === 200) {
        swal("Cliente Creado!", "", "success");
        cleanFields();
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 401) {
        localStorage.clear();
        history.replace('/login');   
      }
      swal("Error!", "al crear el cliente!", "error");
      setLoading(false);  
    }    
  }

  const disabled = () => {
    //if (!validateEmail(email)) return true;
    if (lastName === null ||  lastName === '') {
      return true;      
    } else if (name === null ||  name === '') {
      return true;      
    } else {
      return false;
    }    
  };

  const hCLastName = (e, { value }) => setLastName(value);
  const hClName = (e, { value }) => setName(value);  
  const hCTipoDoc = (e, { value }) => setTipoDoc(value); 
  const hCNroDoc = (e, { value }) => setNroDoc(value); 
  const hCLugarExp = (e, { value }) => setLugarExp(value); 
  const hCFechaExp = (e, { value }) => setFechaExp(value); 
  const hCSexo = (e, { value }) => setSexo(value); 
  const hCLugarNac = (e, { value }) => setLugarNac(value); 
  const hCFechaNac = (e, { value }) => setFechaNac(value); 
  const hCEstadoCivil = (e, { value }) => setEstadoCivil(value); 

  const cleanFields = () => {
      document.getElementById("create-client-form").reset();
  }

  const handleSubmit = () => {
    setLoading(true);
      setTimeout(() => {
        setCliente();
      }, 2000);            
  }

  return (
    <div id="cliente">       
      <Segment basic >
        <Form unstackable onSubmit={handleSubmit} loading={loading} id="create-client-form">
          <Form.Group>
            <Form.Input 
              name='lastName'
              label='Apellidos' 
              width={8} 
              type='text' 
              onChange={hCLastName} />  
            <Form.Input 
              name='name'
              label='Nombres' 
              width={8} 
              type='text' 
              onChange={hClName} />
          </Form.Group>
          <Form.Group>
            <Form.Dropdown 
              name='tipoDoc'
              label='Tipo de Documento' 
              type='text' 
              placeholder='C.C.'
              fluid
              selection
              search
              width={4} 
              onChange={hCTipoDoc}
              options={dbOptions} />
            <Form.Input 
              name='nroDoc'
              label='Nro Documento' 
              width={4} 
              type='text' 
              onChange={hCNroDoc} />
            <Form.Input 
              name='lugarExp'
              label='Lugar Expedición' 
              width={4} 
              type='text' 
              onChange={hCLugarExp} />
            <Form.Input 
              name='fechaExp'
              label='Fecha Expedición' 
              width={4} 
              type='date' 
              onChange={hCFechaExp} />
          </Form.Group>
          <Form.Group>
            <Form.Dropdown 
              name='sexo'
              label='Sexo' 
              type='text' 
              placeholder='Hombre'
              fluid
              selection
              search
              width={4} 
              onChange={hCSexo}
              options={dbSexo} />
            <Form.Input 
              name='lugarNac'
              label='Lugar de Nacimiento' 
              width={4} 
              type='text' 
              onChange={hCLugarNac} />
            <Form.Input 
              name='fechaNac'
              label='Fecha Nacimiento' 
              width={4} 
              type='date' 
              onChange={hCFechaNac} />     
            <Form.Dropdown 
              name='estadoCivil'
              label='Estado Civil' 
              type='text' 
              placeholder='Soltero'
              fluid
              selection
              search
              width={4} 
              onChange={hCEstadoCivil}
              options={dbEstCivil} />              
          </Form.Group> 
          <Button disabled={disabled()} type='submit'>Guardar</Button>
        </Form>
      </Segment>         
    </div>
  );
}

const EditarCliente = () => {
  const [open, setOpen] = useState(false); 
  const history = useHistory();
  const [lastName, setLastName] = useState('');  
  const [name, setName] = useState('');   
  const [tipoDoc, setTipoDoc] = useState('');   
  const [nroDoc, setNroDoc] = useState('');   
  const [lugarExp, setLugarExp] = useState('');   
  const [fechaExp, setFechaExp] = useState('');   
  const [sexo, setSexo] = useState('');   
  const [lugarNac, setLugarNac] = useState('');   
  const [fechaNac, setFechaNac] = useState('');   
  const [estadoCivil, setEstadoCivil] = useState('');   
  const [loading, setLoading] = useState(false);
  /*const data = {
    lastName: '',
    name: '',
    tipoDoc: '',
    nroDoc: '',
    lugarExp: '',
    fechaExp: '',
    sexo: '',
    lugarNac: '',
    fechaNac: '',
    estadoCivil: '',
  }*/

  const dbOptions = [
    {
      key: 'C.C.',
      text: 'C.C.',
      value: 'cc',
    },
    {
      key: 'Nit',
      text: 'Nit',
      value: 'nit',
    },
  ]

  const dbSexo = [
    {
      key: 'Hombre',
      text: 'Hombre',
      value: 'hombre',
    },
    {
      key: 'Mujer',
      text: 'Mujer',
      value: 'mujer',
    },
    {
      key: 'Otro',
      text: 'Otro',
      value: 'otro',
    },
  ]

  const dbEstCivil = [
    {
      key: 'Soltero',
      text: 'Soltero',
      value: 'soltero',
    },
    {
      key: 'Casado',
      text: 'Casado',
      value: 'soltero',
    },
    {
      key: 'Union Libre',
      text: 'Union Libre',
      value: 'unionLibre',
    },
    {
      key: 'Viudo',
      text: 'Viudo',
      value: 'viudo',
    },
    {
      key: 'Separado',
      text: 'Separado',
      value: 'separado',
    },
    {
      key: 'Unión Civil',
      text: 'Unión Civil',
      value: 'unionCivil',
    },
  ]

  const disabled = () => {
    //if (!validateEmail(email)) return true;
    if (lastName === null ||  lastName === '') {
      return true;      
    } else if (name === null ||  name === '') {
      return true;      
    } else {
      return false;
    }    
  };

  const hCLastName = (e, { value }) => setLastName(value);
  const hClName = (e, { value }) => setName(value);  
  const hCTipoDoc = (e, { value }) => setTipoDoc(value); 
  const hCNroDoc = (e, { value }) => setNroDoc(value); 
  const hCLugarExp = (e, { value }) => setLugarExp(value); 
  const hCFechaExp = (e, { value }) => setFechaExp(value); 
  const hCSexo = (e, { value }) => setSexo(value); 
  const hCLugarNac = (e, { value }) => setLugarNac(value); 
  const hCFechaNac = (e, { value }) => setFechaNac(value); 
  const hCEstadoCivil = (e, { value }) => setEstadoCivil(value); 

  const handleClickEdit = () => () => {
    console.log('handleClickEdit');  
    setOpen(false);     
  };

  const handleSubmit = () => {
    setLoading(true);
      setTimeout(() => {
        //setClients();
      }, 2000);            
  }

  return (
    <Modal
      dimmer='blurring'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='large'
      trigger={<Button type='submit' onClick={() => setOpen(true)} icon='edit' color='teal'></Button>}
    >
      <Modal.Header>Modificar Cliente</Modal.Header>
      <Modal.Content>
        <Form unstackable onSubmit={handleSubmit} loading={loading} id="create-client-form">
          <Form.Group>
            <Form.Input 
              name='lastName'
              label='Apellidos' 
              width={8} 
              type='text' 
              onChange={hCLastName} />  
            <Form.Input 
              name='name'
              label='Nombres' 
              width={8} 
              type='text' 
              onChange={hClName} />
          </Form.Group>
          <Form.Group>
            <Form.Dropdown 
              name='tipoDoc'
              label='Tipo de Documento' 
              type='text' 
              placeholder='C.C.'
              fluid
              selection
              search
              width={4} 
              onChange={hCTipoDoc}
              options={dbOptions} />
            <Form.Input 
              name='nroDoc'
              label='Nro Documento' 
              width={4} 
              type='text' 
              onChange={hCNroDoc} />
            <Form.Input 
              name='lugarExp'
              label='Lugar Expedición' 
              width={4} 
              type='text' 
              onChange={hCLugarExp} />
            <Form.Input 
              name='fechaExp'
              label='Fecha Expedición' 
              width={4} 
              type='date' 
              onChange={hCFechaExp} />
          </Form.Group>
          <Form.Group>
            <Form.Dropdown 
              name='sexo'
              label='Sexo' 
              type='text' 
              placeholder='Hombre'
              fluid
              selection
              search
              width={4} 
              onChange={hCSexo}
              options={dbSexo} />
            <Form.Input 
              name='lugarNac'
              label='Lugar de Nacimiento' 
              width={4} 
              type='text' 
              onChange={hCLugarNac} />
            <Form.Input 
              name='fechaNac'
              label='Fecha Nacimiento' 
              width={4} 
              type='date' 
              onChange={hCFechaNac} />     
            <Form.Dropdown 
              name='estadoCivil'
              label='Estado Civil' 
              type='text' 
              placeholder='Soltero'
              fluid
              selection
              search
              width={4} 
              onChange={hCEstadoCivil}
              options={dbEstCivil} />              
          </Form.Group> 
          {/*<Button disabled={disabled()} type='submit'>Guardar</Button>*/}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} negative>Cancel</Button>
        <Button disabled={disabled()} type='submit'/*onClick={handleClickEdit()}*/ positive>
          Ok
        </Button>
      </Modal.Actions>
    </Modal>   
  );
}

const ListarCliente = ( /*{getClients, {clients}*/ ) => {
  const [clients, setClients] = useState([]); 
  const [open, setOpen] = useState(false); 
  const history = useHistory();
  const data = {
    nroDoc: '',
  }

  const getClients = async () => {
    try {
      var response = await client('post', '', 'clients');   
      if (response.status === 200) {
        setClients(response.data.client);
      } 
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 401) {
        localStorage.clear();
        history.replace('/login');   
      }      
    }    
  }; 

  useEffect(() => {      
    getClients();   
  }, [])  
 
  async function deleteClient(clt) {    
    try {
      data.nroDoc = clt.nroDoc;
      var response = await client('delete', data, 'client');  
      if (response.status === 200) {
        swal("Cliente eliminado correctamente!", "", "success");
        getClients();
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 401) {
        localStorage.clear();
        history.replace('/login');   
      }  
      swal("Error!", "Al eliminar el cliente!", "error");  
    }    
  }

  const handleClickDelete = (clt) =>  async () => {
    deleteClient(clt);
  };

  return (
    <div id="cliente"> 
      <Segment basic style={{padding: '4em 4em 4em 4em', height: '40em'}}>
        <Table celled attached='top' basic>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={6}>Cedula</Table.HeaderCell>
              <Table.HeaderCell width={6}>Nombres</Table.HeaderCell>
              <Table.HeaderCell width={6}>Apellidos</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body as = "tbody">
            {clients.map((client, i) =>
              <Table.Row key={i}>
                <Table.Cell>{client.nroDoc}</Table.Cell>
                <Table.Cell>{client.name}</Table.Cell>
                <Table.Cell>{client.lastName}</Table.Cell>                  
                <Table.Cell>                     
                  <EditarCliente/>
                </Table.Cell>
                <Table.Cell><Button type='submit' onClick={handleClickDelete(client)} icon='delete' color='red'></Button></Table.Cell>
              </Table.Row>            
            )}
          </Table.Body>             
        </Table>
      </Segment>            
    </div>
  );
}

export default TabCliente
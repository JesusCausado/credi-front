import React, { useEffect, useState } from 'react';
import {
  Image,
  Segment,
  Sidebar,
  Button,
  Form,
  Table,
  Tab,
  Icon
} from 'semantic-ui-react';

import {
  useHistory
} from "react-router-dom";
import client from "../../client";
import HorizontalSidebar from "../../components/HorizontalSidebar/index";
import MainMenu from "../../components/MainMenu/index";
import swal from 'sweetalert';


const panes = [
  {
    menuItem: 'Crear  Prestamo',
    render: () => <Tab.Pane attached={false}> <CrearPrestamo /> </Tab.Pane>,
  },
  {
    menuItem: 'Listado de Prestamos',
    render: () => <Tab.Pane attached={false}> <ListarCliente /> </Tab.Pane>,
  },
]

const TabPrestamo = () => {
  const [visible, setVisible] = useState(true);
  const handleClick = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }
  return (
    <div id="home">
      <MainMenu handleClick={handleClick} />
      <div id="sidebar" style={{ height: '58em' }}>
        <Sidebar.Pushable as={Segment} style={{ border: '0px' }}>
          <HorizontalSidebar
            animation='slide along'
            direction='left'
            visible={visible}
          />

          <Sidebar.Pusher style={{ padding: '2em 15em 2em 2em' }}>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    </div>
  )
}

const CrearPrestamo = () => {
  const [clients, setClients] = useState([]);
  const [idClient, setIdClient] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [valorSol, setValorSol] = useState('');
  const [valorApr, setValorApr] = useState('');
  const [termino, setTermino] = useState('');
  const [interes, setInteres] = useState('');
  const [diaPago, setDiaPago] = useState('');
  const [tipoPrestamo, setTipoPrestamo] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const data = {
    idClient: '',
    ciudad: '',
    valorSol: '',
    valorApr: '',
    termino: '',
    interes: '',
    diaPago: '',
  }

  const dbTipoPrest = [
    {
      key: '1',
      text: 'Tipos de Prestamos',
      value: '1',
    },
    {
      key: '2',
      text: 'Cuota Fija',
      value: '2',
    },
    {
      key: '3',
      text: 'Interes bajo saldo',
      value: '3',
    },
    {
      key: '4',
      text: 'Avance',
      value: '4',
    }
  ]

  useEffect(() => {
    getClients();
  }, [])

  async function getClients() {
    try {
      var response = await client('post', '', 'clients');
      console.log(response);
      if (response.status === 200) {
        const data = response.data.client;
        const dataClients = [];
        for (let index = 0; index < data.length; index++) {
          const client = data[index];
          dataClients.push({
            key: client.nroDoc,
            text: client.nroDoc,
            value: client._id,           
          });
        };
        setClients(dataClients);
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 401) {
        localStorage.clear();
        history.replace('/login');   
      }
    }
  }

  async function setPrestamo() {
    try {
      data.idClient = idClient;
      data.ciudad = ciudad;
      data.valorSol = valorSol;
      data.valorApr = valorApr;
      data.termino = termino;
      data.interes = interes;
      data.diaPago = diaPago;
      var response = await client('post', data, 'save-prestamo');
      if (response.status === 200) {
        swal("Prestamo Creado!", "", "success");
        cleanFields();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      swal("Error!", "al crear el prestamo!", "error");
      setLoading(false);
    }
  }

  const disabled = () => {
    /*if (lastName === null || lastName === '') {
      return true;
    } else if (name === null || name === '') {
      return true;
    } else {
      return false;
    }*/
    return false
  };

  const hCClient = (e, { value }) => setIdClient(value);
  const hCCiudad = (e, { value }) => setCiudad(value);
  const hCValorSol = (e, { value }) => setValorSol(value);
  const hCValorApr = (e, { value }) => setValorApr(value);
  const hCTermino = (e, { value }) => setTermino(value);
  const hCInteres = (e, { value }) => setInteres(value);
  const hCDiaPago = (e, { value }) => setDiaPago(value);
  const hCTipoPrestamo = (e, { value }) => setTipoPrestamo(value);

  const cleanFields = () => {
    document.getElementById("create-client-form").reset();
  }

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setPrestamo();
    }, 2000);
  }

  return (
    <div id="prestamo">
      <Segment basic >
        <Form unstackable onSubmit={handleSubmit} loading={loading} id="create-client-form">
          <Form.Group>
            <Form.Dropdown
              name='clientes'
              label='Clientes'
              type='text'
              placeholder='101010'
              fluid
              selection
              search
              width={6}
              onChange={hCClient}
              options={clients} />
            <Form.Input
              name='lastName'
              label='Apellidos'
              readOnly
              width={6}
              type='text'  />
            <Form.Input
              name='name'
              label='Nombres'
              readOnly
              width={6}
              type='text'  />
          </Form.Group>
          <Form.Group>            
            <Form.Input
              name='ciudad'
              label='Ciudad'
              width={6}
              type='text' 
              onChange={hCCiudad} />
            <Form.Input
              name='valorSol'
              label='Valor Solicitado'
              width={6}
              type='text' 
              onChange={hCValorSol} />
            <Form.Input
              name='valorApr'
              label='Valor Aprobado'
              width={6}
              type='text' 
              onChange={hCValorApr} />
          </Form.Group>
          <Form.Group>            
            <Form.Input
              name='termino'
              label='Termino'
              width={6}
              type='text' 
              onChange={hCTermino} />
            <Form.Input
              name='interes'
              label='Interes'
              width={6}
              type='text' 
              onChange={hCInteres} />
            <Form.Input
              name='diaPago'
              label='Dia Pago'
              width={6}
              type='text' 
              onChange={hCDiaPago} />
          </Form.Group>   
          <Form.Group>            
            <Form.Dropdown
              name='tipoPrestamo'
              label='Tipo Prestamo'
              type='text'
              placeholder='TIPO'
              fluid
              selection
              search
              width={4}
              onChange={hCTipoPrestamo}
              options={dbTipoPrest} />
          </Form.Group>        
          <Button disabled={disabled()} type='submit'>Guardar</Button>
        </Form>
      </Segment>
    </div>
  );
}

const ListarCliente = () => {
  const [prestamos, setPrestamos] = useState([]);
  const history = useHistory();
  const data = {
    id: '',
  }
  async function getPrestamos() {
    try {
      var response = await client('post', '', 'prestamos');
      console.log(response);
      if (response.status === 200) {
        setPrestamos(response.data.prestamo);
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 401) {
        localStorage.clear();
        history.replace('/login');   
      }
    }
  }

  async function deletePretsamo(prt) {
    try {
      data.id = prt["_id"]
      var response = await client('delete', data, 'prestamo');
      if (response.status === 200) {
        swal("Cliente eliminado correctamente!", "", "success");
        getPrestamos();
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

  useEffect(() => {
    getPrestamos();
  }, [])

  const handleClickEdit = () => () => {
    console.log('handleClickEdit');
  };

  const handleClickDelete = (prt) => () => {
    deletePretsamo(prt);
  };

  return (
    <div id="cliente">
      <Segment basic style={{ padding: '4em 4em 4em 4em', height: '40em' }}>
        <Table celled attached='top' basic>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1}>Prestamo</Table.HeaderCell>
              <Table.HeaderCell width={1}>Interes</Table.HeaderCell>
              <Table.HeaderCell width={4}>Valor Solicitado</Table.HeaderCell>
              <Table.HeaderCell width={4}>Valor Aprobado</Table.HeaderCell>
              <Table.HeaderCell width={4}>Valor Entregado</Table.HeaderCell>
              <Table.HeaderCell width={2}>Termino</Table.HeaderCell>
              <Table.HeaderCell width={2}>Fecha Grabación</Table.HeaderCell>
              <Table.HeaderCell width={1}></Table.HeaderCell>
              <Table.HeaderCell width={1}></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {prestamos.map((prestamo, i) =>
              <Table.Row key={i}>
                <Table.Cell>{prestamo.nroPrestamo}</Table.Cell>
                <Table.Cell>{prestamo.interes} % </Table.Cell>
                <Table.Cell>{prestamo.vlrSol}</Table.Cell>
                <Table.Cell>{prestamo.vlrApr}</Table.Cell>
                <Table.Cell>{prestamo.vlrEnt}</Table.Cell>
                <Table.Cell>{prestamo.termino}</Table.Cell>
                <Table.Cell>{prestamo.fechaGrab}</Table.Cell>
                <Table.Cell><Button type='submit' onClick={handleClickEdit} icon='edit' color='teal'></Button></Table.Cell>
                <Table.Cell><Button type='submit' onClick={handleClickDelete(prestamo)} icon='delete' color='red'></Button></Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Segment>
    </div>
  );
}

export default TabPrestamo
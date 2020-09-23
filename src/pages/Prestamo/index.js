import React, { useEffect, useState, useRef } from 'react';
import {
  Icon,
  Segment,
  Sidebar,
  Button,
  Form,
  Table,
  Tab,
  Divider,
  Header,
  Modal,
  Grid,
  Image
} from 'semantic-ui-react';

import { useReactToPrint } from 'react-to-print';

import {
  useHistory
} from "react-router-dom";
import client from "../../client";
import HorizontalSidebar from "../../components/HorizontalSidebar/index";
import MainMenu from "../../components/MainMenu/index";
import swal from 'sweetalert';
import styles from './prestamo.css'

const panes = [
  {
    menuItem: 'Crear  Prestamo',
    render: () => <Tab.Pane attached={false}> <CrearPrestamo /> </Tab.Pane>,
  },
  {
    menuItem: 'Listado de Prestamos',
    render: () => <Tab.Pane attached={false}> <ListarPrestamos /> </Tab.Pane>,
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
      <div id="sidebar" className="test">
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
    idUsuario: '',
    tipoPrestamo: '',
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
      text: 'Cuota Fija',
      value: '1',
    },
    {
      key: '2',
      text: 'Interes bajo saldo',
      value: '2',
    },
    {
      key: '3',
      text: 'Avance',
      value: '3',
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
      var current = JSON.parse(localStorage.getItem('currentUser'));
      data.idClient = idClient;
      data.idUsuario = current._id;
      data.ciudad = ciudad;
      data.tipoPrestamo = tipoPrestamo;
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
    document.getElementById("create-prestamo-form").reset();
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
        <Form unstackable onSubmit={handleSubmit} loading={loading} id="create-prestamo-form">
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
              type='text' />
            <Form.Input
              name='name'
              label='Nombres'
              readOnly
              width={6}
              type='text' />
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
              placeholder='Tipo'
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
class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      prestamo: {},
      prestamoDet: [],
      data: {
        id: null
      }
    };
  }

  async getPrestamos() {
    try {
      var response = await client('post', this.state.data, 'prestamo');
      if (response.status === 200) {
        this.setState((state, props) => ({
          prestamo: response.data.prestamo,
          prestamoDet: response.data.prestamoDet
        }));
        console.log(this.state)
      }
    } catch (error) {
      console.log(error.response);
      /*if (error.response.status === 401) {
        localStorage.clear();
        history.replace('/login');   
      }*/
    }
  }

  async getPrestamosDet() {
    try { 
      console.log(this.state.data);     
      var response = await client('post', this.state.data, 'prestamos-det');
      console.log(response);
      if (response.status === 200) {
        this.setState((state, props) => ({
          prestamoDet: response.data.prestamoDet
        }));
        console.log(this.state.prestamoDet)
      }
    } catch (error) {
      console.log(error.response);
      /*if (error.response.status === 401) {
        localStorage.clear();
        history.replace('/login');
      }*/
    }
  }

  componentDidMount() {
    this.state.data.id =  this.props.idPrestamo;
    this.getPrestamos();
    //this.getPrestamosDet();
  }

  render() {
    return (
      <Segment style={{ padding: '1em 1em 1em 1em' }} vertical>
        <Grid container stackable verticalAlign='middle' columns={2}>
          <Grid.Row>
            <Grid.Column width={12}>
              <Header as='h2'> Cliente </Header>
              <Header as='h5'> LUIS ANTONIO TURRIAGO CABRALES </Header>
              <Header as='h5'> C.C 3.901.679 MOMPOS, BOLIVAR </Header>
              <Divider />
              <br />
              <p><b>Prestamo:</b> {this.state.prestamo.nroPrestamo} </p>
            </Grid.Column>
            <Grid.Column width={4}>
              <Image src='https://react.semantic-ui.com/images/wireframe/white-image.png' size='medium' bordered />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={4}>
            <Grid.Column width={4}>
              <p><b>Tipo Prestamo:</b> {this.state.prestamo.tipoPrestamo} </p>
            </Grid.Column>
            <Grid.Column width={4}>
              <p><b>Interes:</b> {this.state.prestamo.interes} </p>
            </Grid.Column>
            <Grid.Column width={4}>
              <p><b>Valor:</b> {this.state.prestamo.vlrApr} </p>
            </Grid.Column>
            <Grid.Column width={4}>
              <p><b>Termino:</b> {this.state.prestamo.termino} </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <p><b>Fecha Grabación:</b> {this.state.prestamo.fechaGrab} </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as='h4' block> TERMINOS Y CONDICIONES DEL CREDITO APROBADO POR {this.state.prestamo.vlrApr} </Header>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={2}>Cuota</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Estado</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Aporte a capital</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Aporte a interes</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Valor cuota</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Valor pagado</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Retiro cajero</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Entregado a cliente</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Saldo</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.state.prestamoDet && this.state.prestamoDet.map((prestamoDet, i) =>
                    <Table.Row key={i}>
                    <Table.Cell>{prestamoDet.nroCuota}</Table.Cell>
                    <Table.Cell>{prestamoDet.estado}</Table.Cell>
                    <Table.Cell>{prestamoDet.aptCapital}</Table.Cell>
                    <Table.Cell>{prestamoDet.aptInteres}</Table.Cell>
                    <Table.Cell>{prestamoDet.vlrCuota}</Table.Cell>
                    <Table.Cell>{prestamoDet.vlrPagado}</Table.Cell>
                    <Table.Cell>{prestamoDet.retiroCajero}</Table.Cell>
                    <Table.Cell>{prestamoDet.entregadoCliente}</Table.Cell>
                    <Table.Cell>{prestamoDet.saldo}</Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

const ImprimirPrestamo = (idPrestamo) => {
  const [open, setOpen] = useState(false);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Modal
      dimmer='blurring'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button type='submit' onClick={() => setOpen(true)} icon='print' color='teal'></Button>}
    >
      <Modal.Header>Imprimir Prestamo</Modal.Header>
      <Modal.Content scrolling>
        <ComponentToPrint ref={componentRef} idPrestamo={idPrestamo.idPrestamo} />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} negative>Cancel</Button>
        <Button type='submit' onClick={handlePrint} positive>
          Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

const AbonarCuota = ( {prestamoDet} ) => {
  const [open, setOpen] = useState(false);
  const [vlrPagado, setVlrPagado] = useState(0);
  const [retiroCajero, setRetiroCajero] = useState(0);
  const [entCliente, setEntCliente] = useState(0);
  const [loading, setLoading] = useState(false);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const hCVlrPagado = (e, { value }) => {
    setVlrPagado(value);
    setEntCliente(retiroCajero - value);
  }
  const hCRetiro = (e, { value }) => { 
    setRetiroCajero(value);
    setEntCliente(value - vlrPagado);
  }
  const hCEntregado = (e, { value }) => setEntCliente(value);

  const cleanFields = () => {
    document.getElementById("update-prestamo-form").reset();
  }

  async function updatePrestamo() {
    try {
      prestamoDet.vlrPagado = vlrPagado;
      prestamoDet.retiroCajero = retiroCajero;
      prestamoDet.entregadoCliente = entCliente;
      prestamoDet.estado = 'L';
      var response = await client('post', prestamoDet, 'update-prestamo');
      if (response.status === 200) {
        swal("Abono Realizado Correctamente!", "", "success");
        cleanFields();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      swal("Error!", "al crear el prestamo!", "error");
      setLoading(false);
    }
  }

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      updatePrestamo();
    }, 2000);
  }

  useEffect(() => {
    setVlrPagado(prestamoDet.aptCapital);
  }, [])

  return (
    <Modal
      dimmer='blurring'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button type='submit' onClick={() => setOpen(true)} icon='dollar sign' color='teal'></Button>}
    >
      <Modal.Header>Abonar Cuota</Modal.Header>
      <Modal.Content scrolling>
        <Form unstackable onSubmit={handleSubmit} loading={loading} id="update-prestamo-form">          
          <Form.Group>
            <Form.Input
              name='vlrPagado'
              label='Valor a pagar'
              width={6}
              type='text'
              value={vlrPagado}
              onChange={hCVlrPagado} />
            <Form.Input
              name='retiroCajero'
              label='Retiro de cajero'
              width={6}
              type='text'
              value={retiroCajero}
              onChange={hCRetiro} />
            <Form.Input
              name='entregadoCliente'
              label='Entregado a cliente'
              width={6}
              type='text'
              value={entCliente}
              onChange={hCEntregado} />
          </Form.Group>
          <Button /*disabled={disabled()}*/ type='submit'>Guardar</Button>
        </Form>      
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} negative>Cancel</Button>
        <Button type='submit' /*onClick={handlePrint}*/ positive>
          Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

const ListarPrestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [prestamosDet, setPrestamosDet] = useState([]);
  const history = useHistory();
  const data = {
    id: '',
  }
  async function getPrestamos() {
    try {
      var response = await client('post', '', 'prestamos');
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

  async function getPrestamosDet(prt) {
    try {
      data.id = prt["_id"];
      var response = await client('post', data, 'prestamos-det');
      console.log(response);
      if (response.status === 200) {
        setPrestamosDet(response.data.prestamoDet);
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
      data.id = prt["_id"];
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
  }, []);

  const handleClickEdit = () => () => {
    console.log('handleClickEdit');
  };

  const handleClickDelete = (prt) => () => {
    deletePretsamo(prt);
  };

  const handleClickDetail = (prt) => () => {
    getPrestamosDet(prt);
  };

  return (
    <div id="prestamo">
      <Segment basic style={{ padding: '2em 4em 4em 4em', minHeight: '48em' }}>
        <div id="encabezado">
          <Header as='h4'>Encabezado</Header>
          <Table celled selectable striped color="blue">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1}>Prestamo</Table.HeaderCell>
                <Table.HeaderCell width={1}>Tipo Prestamo</Table.HeaderCell>
                <Table.HeaderCell width={1}>Interes</Table.HeaderCell>
                <Table.HeaderCell width={4}>Valor Solicitado</Table.HeaderCell>
                <Table.HeaderCell width={4}>Valor Aprobado</Table.HeaderCell>
                <Table.HeaderCell width={4}>Valor Entregado</Table.HeaderCell>
                <Table.HeaderCell width={4}>Saldo</Table.HeaderCell>
                <Table.HeaderCell width={2}>Termino</Table.HeaderCell>
                <Table.HeaderCell width={2}>Fecha Grabación</Table.HeaderCell>
                <Table.HeaderCell width={2}>Usuario</Table.HeaderCell>
                <Table.HeaderCell width={1}></Table.HeaderCell>
                <Table.HeaderCell width={1}></Table.HeaderCell>
                <Table.HeaderCell width={1}></Table.HeaderCell>
                <Table.HeaderCell width={1}></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {prestamos.map((prestamo, i) =>
                <Table.Row key={i}>
                  <Table.Cell>{prestamo.nroPrestamo}</Table.Cell>
                  <Table.Cell>{prestamo.tipoPrestamo}</Table.Cell>
                  <Table.Cell>{prestamo.interes} % </Table.Cell>
                  <Table.Cell>{prestamo.vlrSol}</Table.Cell>
                  <Table.Cell>{prestamo.vlrApr}</Table.Cell>
                  <Table.Cell>{prestamo.vlrEnt}</Table.Cell>
                  <Table.Cell>{prestamo.saldo}</Table.Cell>
                  <Table.Cell>{prestamo.termino}</Table.Cell>
                  <Table.Cell>{prestamo.fechaGrab}</Table.Cell>
                  <Table.Cell>{prestamo.idUsuario}</Table.Cell>
                  <Table.Cell><Button type='submit' onClick={handleClickEdit} icon='edit' color='teal'></Button></Table.Cell>
                  <Table.Cell><Button type='submit' onClick={handleClickDelete(prestamo)} icon='delete' color='red'></Button></Table.Cell>
                  <Table.Cell><Button type='submit' onClick={handleClickDetail(prestamo)} icon='plus' color='green'></Button></Table.Cell>
                  <Table.Cell>
                    <ImprimirPrestamo idPrestamo={prestamo._id} />
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
        <Divider />
        <div id="detalle" className={styles.test}>
          <Header as='h4'>Detalle</Header>
          <Table celled selectable striped color="blue" collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1}>Cuota</Table.HeaderCell>
                <Table.HeaderCell width={1}>Estado</Table.HeaderCell>
                <Table.HeaderCell width={4}>Fecha de pago</Table.HeaderCell>
                <Table.HeaderCell width={4}>Aporte a capital</Table.HeaderCell>
                <Table.HeaderCell width={4}>Aporte a interes</Table.HeaderCell>
                <Table.HeaderCell width={2}>Valor cuota</Table.HeaderCell>
                <Table.HeaderCell width={1}></Table.HeaderCell>
                <Table.HeaderCell width={1}></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {prestamosDet && prestamosDet.map((prestamoDet, i) =>
                <Table.Row key={i}>
                  <Table.Cell>{prestamoDet.nroCuota}</Table.Cell>
                  <Table.Cell>{prestamoDet.estado}</Table.Cell>
                  <Table.Cell>{prestamoDet.fechaPago}</Table.Cell>
                  <Table.Cell>{prestamoDet.aptCapital}</Table.Cell>
                  <Table.Cell>{prestamoDet.aptInteres}</Table.Cell>
                  <Table.Cell>{prestamoDet.vlrCuota}</Table.Cell>
                  <Table.Cell>
                    <AbonarCuota prestamoDet={prestamoDet}/>
                  </Table.Cell>
                  <Table.Cell>
                    <ImprimirPrestamo idPrestamo={prestamoDet.idPrestamo} />
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </Segment>
    </div>
  );
}

export default TabPrestamo
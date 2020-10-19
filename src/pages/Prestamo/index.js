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
  Image,
  Input
} from 'semantic-ui-react';
import { useReactToPrint } from 'react-to-print';
import {
  useHistory
} from "react-router-dom";
import swal from 'sweetalert';
import moment from 'moment';
//COMPONENTS
import client from "../../client";
import HorizontalSidebar from "../../components/HorizontalSidebar/index";
import MainMenu from "../../components/MainMenu/index";
//CSS
import '../../components/HorizontalSidebar/index.css';
import './prestamo.css'

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
  const [tipoPrimas, setTipoPrimas] = useState('');
  const [valorPrimas, setValorPrimas] = useState('');
  const [valorMensual, setValorMensual] = useState('');
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
    tipoPrimas: '',
    valorPrimas: '',
    valorMensual: ''
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

  const dbTipoPrimas = [
    {
      key: '1',
      text: 'Junio y Diciembre',
      value: '1',
    },
    {
      key: '2',
      text: 'Junio',
      value: '2',
    },
    {
      key: '3',
      text: 'Diciembre',
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
            text: client.nroDoc + ' - ' + client.name,
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
      data.tipoPrimas = tipoPrimas;
      data.valorPrimas = valorPrimas;
      data.valorMensual = valorMensual;
      var response = await client('post', data, 'save-prestamo');
      if (response.status === 200) {
        swal("Prestamo Creado!", "", "success");
        cleanFields();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      swal("Error!", "al crear el prestamo!" + error, "error");
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
  const hCTipoPrimas = (e, { value }) => setTipoPrimas(value);
  const hCValorPrimas = (e, { value }) => setValorPrimas(value);
  const hCValorMensual = (e, { value }) => setValorMensual(value);

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
              width={6}
              onChange={hCTipoPrestamo}
              options={dbTipoPrest} />
            <Form.Dropdown
              name='tipoPrimas'
              label='Primas'
              type='text'
              placeholder='Primas'
              fluid
              selection
              search
              width={6}
              onChange={hCTipoPrimas}
              options={dbTipoPrimas} />
            <Form.Input
              name='valorPrimas'
              label='Valor Primas'
              width={6}
              type='number'
              onChange={hCValorPrimas} />
            <Form.Input
              name='valorMensual'
              label='Valor Mensual'
              width={6}
              type='number'
              onChange={hCValorMensual} />
          </Form.Group>
          <Button disabled={disabled()} type='submit'>Guardar</Button>
        </Form>
      </Segment>
    </div>
  );
}

const AbonarCuota = ({prestamoDet}) => {
  const [open, setOpen] = useState(false);
  const [vlrPagado, setVlrPagado] = useState(0);
  const [retiroCajero, setRetiroCajero] = useState(0);
  const [entCliente, setEntCliente] = useState(0);
  const [observacion, setObservacion] = useState('');
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
  const hCObservacion = (e, { value }) => setObservacion(value);

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
        cleanFields();
        setOpen(false);
        setLoading(false);
        swal("Abono Realizado Correctamente!", "", "success");
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
      trigger={<Button type='submit' onClick={() => setOpen(true)} disabled={prestamoDet.estado == 'L'? true : false} icon='dollar sign' color='teal'></Button>}
    >
      <Modal.Header>Abonar Cuota</Modal.Header>
      <Modal.Content scrolling>
        <Form unstackable /*onSubmit={handleSubmit}*/ loading={loading} id="update-prestamo-form">          
          <Form.Group>
            <Form.Input
              name='vlrPagado'
              label='Valor a pagar'
              width={6}
              type='number'
              value={vlrPagado}
              onChange={hCVlrPagado} />
            <Form.Input
              name='retiroCajero'
              label='Retiro de cajero'
              width={6}
              type='number'
              value={retiroCajero}
              onChange={hCRetiro} />
            <Form.Input
              name='entregadoCliente'
              label='Entregado a cliente'
              width={6}
              type='number'
              value={entCliente}
              onChange={hCEntregado} />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              name='observacion'
              label='Observación'
              width={16}
              type='text'
              value={observacion}
              onChange={hCObservacion} />
          </Form.Group>
         {/*<Button type='submit'>Guardar</Button>*/}
        </Form>      
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} negative>Cancel</Button>
        <Button type='submit' onClick={handleSubmit} positive>
          Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

const ListarPrestamos = () => {
  const [clients, setClients] = useState([]);
  const [idClient, setIdClient] = useState('');
  const [prestamos, setPrestamos] = useState([]);
  const [prestamosDet, setPrestamosDet] = useState([]);
  const history = useHistory();
  const data = {
    id: '',
  }

  async function getClients() {
    try {
      var response = await client('post', '', 'clients');
      console.log(response);
      if (response.status === 200) {
        const data = response.data.client;
        const dataClients = [];
        dataClients.push({
          key: "",
          text: "",
          value: "",
        });
        for (let index = 0; index < data.length; index++) {
          const client = data[index];
          dataClients.push({
            key: client.nroDoc,
            text: client.nroDoc + ' - ' + client.name,
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

  async function getPrestamosClient() {
    try {
      console.log(idClient);
      data.id = idClient;
      var response = await client('post', data, 'prestamos-client');
      if (response.status === 200) {
        setPrestamos(response.data.prestamo);
      }
    } catch (error) {
      console.log(error);
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

  async function deletePrestamo(prt) {
    try {
      data.id = prt["_id"];
      var response = await client('delete', data, 'prestamo');
      if (response.status === 200) {
        swal("Cliente eliminado correctamente!", "", "success");
        getPrestamos();
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        history.replace('/login');
        swal("Error!", "Su sesión ha expirado", "error");
      }
      swal("Error!", error.response.data.message, "error");
    }
  }

  const hCClient = (e, { value }) => setIdClient(value);

  useEffect(() => {
    getPrestamos();
    getClients();
  }, []);

  const handleClickEdit = () => () => {
    console.log('handleClickEdit');
  };

  const handleClickDelete = (prt) => () => {
    swal({
      title: "Desea eliminar el registro?",
      text: "Eliminará el prestamo!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        deletePrestamo(prt);
      } else {
        swal("Solicitud cancelada!");
      }
    });
  };

  const handleClickDetail = (prt) => () => {
    getPrestamosDet(prt);
  };

  const handleSubmitSearch = () => {
    getPrestamosClient();
  }

  return (
    <div id="prestamo">
      <Segment basic style={{ padding: '2em 4em 4em 4em' }}>
        <Form unstackable onSubmit={handleSubmitSearch} id="create-prestamo-form">
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
          </Form.Group>
          <Button type='submit'>Buscar</Button>
        </Form>
        <Header as='h4'>Encabezado</Header>        
        <div id="encabezado" className="container_table">
          <Table celled selectable striped sortable color="blue">
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
                  <Table.Cell>{moment(prestamo.fechaGrab).format('l')}</Table.Cell>
                  <Table.Cell>{prestamo.idUsuario}</Table.Cell>
                  <Table.Cell><Button type='submit' onClick={handleClickEdit} icon='edit' color='teal'></Button></Table.Cell>
                  <Table.Cell><Button type='submit' onClick={handleClickDelete(prestamo)} icon='delete' color='red'></Button></Table.Cell>
                  <Table.Cell><Button type='submit' onClick={handleClickDetail(prestamo)} icon='plus' color='green'></Button></Table.Cell>
                  <Table.Cell>
                    <PrintPrestamoTotal idPrestamo={prestamo._id} />
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
        <Divider />
        <Header as='h4'>Detalle</Header>
        <div id="detalle" className="container_tableDet">          
          <Table celled selectable striped sortable color="blue">
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
                <Table.Row key={i} positive={prestamoDet.estado == 'L' ? true : false}>
                  <Table.Cell>{prestamoDet.nroCuota}</Table.Cell>
                  <Table.Cell>{prestamoDet.estado}</Table.Cell>
                  <Table.Cell>{moment(prestamoDet.fechaPago).format('l')}</Table.Cell>
                  <Table.Cell>{prestamoDet.aptCapital}</Table.Cell>
                  <Table.Cell>{prestamoDet.aptInteres}</Table.Cell>
                  <Table.Cell>{prestamoDet.vlrCuota}</Table.Cell>
                  <Table.Cell>
                    <AbonarCuota prestamoDet={prestamoDet}/>
                  </Table.Cell>
                  <Table.Cell>
                    <PrintPrestamosCuotas PrestamoDet={prestamoDet}/>
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
//IMPRESIONES
class ReportPrestamoTotal extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      prestamo: {},
      prestamoDet: [],
      cliente: {},
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
          prestamoDet: response.data.prestamoDet,
          cliente: response.data.cliente
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

  componentDidMount() {
    this.state.data.id =  this.props.idPrestamo;
    this.getPrestamos();
  }

  render() {
    return (
      <Segment style={{ padding: '1em 1em 1em 1em' }} vertical>
        <Grid container stackable verticalAlign='middle' columns={2}>
          <Grid.Row>
            <Grid.Column width={12}>
              <Header as='h2'> Cliente </Header>
              <Header as='h4'> {this.state.cliente == null ? "" : this.state.cliente.name + " " + this.state.cliente.lastName} </Header>
              <Header as='h4'> {this.state.cliente == null ? "" : this.state.cliente.tipoDoc + " " + this.state.cliente.nroDoc + ", " + 
                                this.state.cliente.lugarNac} </Header>                      
            </Grid.Column>
            <Grid.Column width={4}>
              <Image src='https://react.semantic-ui.com/images/wireframe/white-image.png' size='medium' bordered />
            </Grid.Column>
          </Grid.Row>
          <Divider />   
          <Grid.Row columns={1}>
            <Grid.Column width={4}>
              <Header as='h3'> {this.state.prestamo == null ? "" : "# " + this.state.prestamo.nroPrestamo}  </Header>
            </Grid.Column> 
          </Grid.Row>            
          <Grid.Row columns={4}>          
            <Grid.Column width={4}>
              <p><b>Tipo Prestamo:</b> {this.state.prestamo == null ? "" : this.state.prestamo.tipoPrestamo} </p>
            </Grid.Column>
            <Grid.Column width={4}>
              <p><b>Interes:</b> {this.state.prestamo == null ? "" : this.state.prestamo.interes} </p>
            </Grid.Column>
            <Grid.Column width={4}>
              <p><b>Valor:</b> {this.state.prestamo == null ? "" : this.state.prestamo.vlrApr} </p>
            </Grid.Column>
            <Grid.Column width={4}>
              <p><b>Termino:</b> {this.state.prestamo == null ? "" : this.state.prestamo.termino} </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <p><b>Fecha Grabación:</b> {this.state.prestamo == null ? "" : moment(this.state.prestamo.fechaGrab).format('l')} </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as='h4' block> TERMINOS Y CONDICIONES DEL CREDITO APROBADO POR {this.state.prestamo.vlrApr} </Header>
              <Table style={{pageBreakInside: 'avoid', pageBreakAfter: 'auto'}}>
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

const PrintPrestamoTotal = ({idPrestamo}) => {
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
      <Modal.Header>Reporte Consolidado</Modal.Header>
      <Modal.Content scrolling>
        <ReportPrestamoTotal ref={componentRef} idPrestamo={idPrestamo} />
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

class ReportPrestamoCuotas extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      prestamo: {},
      prestamoDet: [],
      data: {
        id: null,
        cuota: 0,
      }
    };
  }

  async getPrestamos() {
    try {
      console.log(this.state.data);
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

  componentDidMount() {
    this.state.data.id =  this.props.PrestamoDet.idPrestamo;
    this.state.data.cuota =  this.props.PrestamoDet.nroCuota;
    this.getPrestamos();
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
              <p><b>Prestamo:</b> {this.state.prestamo == null ? "" : this.state.prestamo.nroPrestamo} </p>
            </Grid.Column>
            <Grid.Column width={4}>
              <Image src='https://react.semantic-ui.com/images/wireframe/white-image.png' size='medium' bordered />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={4}>
            <Grid.Column width={4}>
              <p><b>Tipo Prestamo:</b> {this.state.prestamo == null ? "" : this.state.prestamo.tipoPrestamo} </p>
            </Grid.Column>
            <Grid.Column width={4}>
              <p><b>Interes:</b> {this.state.prestamo == null ? "" : this.state.prestamo.interes} </p>
            </Grid.Column>
            <Grid.Column width={4}>
              <p><b>Valor:</b> {this.state.prestamo == null ? "" : this.state.prestamo.vlrApr} </p>
            </Grid.Column>
            <Grid.Column width={4}>
              <p><b>Termino:</b> {this.state.prestamo == null ? "" : this.state.prestamo.termino} </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <p><b>Fecha Grabación:</b> {this.state.prestamo == null ? "" : this.state.prestamo.fechaGrab} </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as='h4' block> TERMINOS Y CONDICIONES DEL CREDITO APROBADO POR {this.state.prestamo == null ? "" : this.state.prestamo.vlrApr} </Header>
              <Table style={{pageBreakInside: 'avoid', pageBreakAfter: 'auto'}}>
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

const PrintPrestamosCuotas = ({PrestamoDet}) => {
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
        <ReportPrestamoCuotas ref={componentRef} PrestamoDet={PrestamoDet} />
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

export default TabPrestamo
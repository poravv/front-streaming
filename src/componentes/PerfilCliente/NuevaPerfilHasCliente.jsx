import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Divider, DatePicker } from 'antd';
import { Row, Col, message } from 'antd';
import { IoTrashOutline } from 'react-icons/io5';
import Table from 'react-bootstrap/Table';
import { createPerfilHasCliente } from '../../services/PerfilHasCliente';
import { Titulos } from '../Utils/Titulos';
import { getVwCuenta } from '../../services/Cuenta';
import { getLikeCliente } from '../../services/Cliente';
import Buscador from '../Utils/Buscador/Buscador';
import moment from 'moment';

function NuevaPerfilHasCliente({ token }) {
    const [form] = Form.useForm();
    const [fecha_pago, setFechaPago] = useState('');
    const [costo_total, setCostoTotal] = useState('');
    const [perfil, setPerfil] = useState('');
    const [lstPerfil, setLstPerfil] = useState('');
    const [idperfil, setIdperfil] = useState('');
    const [tbl_phc_tmp, setTblPhcTmp] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [documento, setDocumento] = useState(null);
    const [sdocumento, setSDocumento] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [idcliente, setIdcliente] = useState(null);
    const [telefono, setTelefono] = useState('');
    const [btn, setBtn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getLstPerfiles();
        // eslint-disable-next-line
    }, []);

    const btnClear = async (e) => {
        e.preventDefault();
        setBtn(false)
        setSDocumento(null)
        setClientes([])
        //console.log('Elemento:', element);
        setNombre('');
        setApellido('');
        setDocumento(null);
        setTelefono(null);
        setIdcliente(0);
        form.setFieldValue('buscadoc', '');
        form.setFieldValue('nombre', '');
        form.setFieldValue('apellido', '');
        form.setFieldValue('tel', '');
        form.setFieldValue('documento', '');
        form.setFieldValue('idcliente', '');
    }

    const getLstClientes = async (valor) => {
        const res = await getLikeCliente({ token: token, param: valor });
        setClientes(res.body);
    }

    const btnBuscador = async (e) => {
        e.preventDefault();
        if (sdocumento === null) return;
        setBtn(true)
        await getLstClientes(sdocumento);
    }

    const getLstPerfiles = async () => {
        const res = await getVwCuenta({ token: token, param: 'get' });
        setLstPerfil(res.body);
    }


    const guardaProducto = async (valores) => {
        return await createPerfilHasCliente({ token: token, json: valores });
    }

    //procedimiento para guardar
    const gestionGuardado = async () => {
        //e.preventDefault();
        //Validaciones
        if (tbl_phc_tmp.length <= 0) { message.error('Cargue detalles'); return; }

        const json = {
            idcliente,
            fecha_pago,
            estado: 'AC',
            costo_total,
            detalle: tbl_phc_tmp
        }

        guardaProducto(json).then((cabecera) => {
            //Guardado de receta
            //console.log('cabecera', cabecera)
            if (cabecera.estado !== 'error') {
                message.success(cabecera?.mensaje);
                navigate('/detcliente');
            } else {
                message.error(cabecera?.mensaje);
            }
        });

    }

    const agregarLista = async (e) => {
        e.preventDefault();
        //Validaciones
        //console.log(idperfil)
        /*Tabla temporal*/
        const upphc = {
            idperfil,
            perfil: perfil.cuenta_perfil,
            estado: 'AC',
            fecha_pago,
        };
        /*Se va sumando los valores que se van cargando*/
        setTblPhcTmp([...tbl_phc_tmp, upphc])
        message.success('Agregado');
        form.setFieldValue('perfil', '');
        form.setFieldValue('idperfil', '');
        setPerfil('');
        setIdperfil(null);
    }

    const btnCancelar = (e) => {
        e.preventDefault();
        navigate('/detcliente');
    }


    const extraerRegistro = async (e, id) => {
        e.preventDefault();
        const updtblPerfilHasCliente = tbl_phc_tmp.filter((inv, index) => index !== id);
        setTblPhcTmp(updtblPerfilHasCliente);
    };

    const onchangePerfil = (value) => {
        form.setFieldValue('idperfil', value);
        setIdperfil(value)
        lstPerfil.map((prof) => {
            if (prof.idperfil === value) {
                setPerfil(prof)
            }
            return true;
        })

    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    const changeDate = (fnac) => {
        if (typeof fnac == 'object') {
            setFechaPago(moment(fnac.$d).format('YYYY-MM-DD'));
            form.setFieldValue('pago', moment(fnac.$d).format('YYYY-MM-DD'));
        } else {
            setFechaPago(moment(fnac).format('YYYY-MM-DD'));
            form.setFieldValue('pago', moment(fnac).format('YYYY-MM-DD'));
        }
    }

    const onChangeCliente = (value) => {
        clientes.map((element) => {
            if (element.idcliente === value) {
                setNombre(element.nombre);
                setApellido(element.apellido);
                setDocumento(element.documento);
                setTelefono(element.telefono);
                setIdcliente(element.idcliente);

                form.setFieldValue('nombre', element.nombre);
                form.setFieldValue('apellido', element.apellido);
                form.setFieldValue('documento', element.documento);
                form.setFieldValue('tel', element.telefono);
                form.setFieldValue('idcliente', element.idcliente);
            }
            return true;
        });
    };


    return (
        <div>
            <div style={{ marginBottom: `20px` }}>
                <Titulos text={`NUEVA CUENTA`} level={3}></Titulos>
            </div>
            <Form
                initialValues={{ remember: true, }}
                onFinish={gestionGuardado}
                autoComplete="off"
                name="basic"
                layout="vertical"
                style={{ textAlign: `center`, margin: `15px` }}
                form={form} >
                <Divider orientation="left" type="horizontal" style={{ color: `#7CC1FE` }}>Busqueda por documento</Divider>
                <Row style={{ marginBottom: `20px` }}>
                    {btn === false ?
                        <Col style={{ width: `100%` }}>
                            <Row>
                                <Form.Item id='buscadoc' style={{ width: `100%` }}>
                                    <Input placeholder='Ruc o documento' value={sdocumento} onChange={(e) => setSDocumento(e.target.value)} />
                                </Form.Item>
                                <Button type="primary" htmlType="submit" onClick={btnBuscador}  >
                                    Buscar
                                </Button>
                            </Row>
                        </Col>
                        : <Col style={{ width: `100%` }}>
                            <Row>
                                <Form.Item id='busdoc1' style={{ width: `100%` }}
                                >
                                    <Input hidden disabled id='busdoc1' value={idcliente} />
                                    <Buscador label={'documento'} title={'Ruc o documento'} selected={idcliente} value={'idcliente'} data={clientes} onChange={onChangeCliente} onSearch={onSearch} />
                                </Form.Item>
                                <Button type="primary" htmlType="submit" onClick={btnClear} style={{ backgroundColor: `green` }} >
                                    Limpiar
                                </Button>
                            </Row>
                        </Col>
                    }
                </Row>
                <Row style={{ width: `100%`, flexWrap: `wrap`, display: `flex` }}>
                    <Col style={{ minWidth: `30%` }}>
                        <Form.Item label='Ruc o documento' id='documento' name="documento" >
                            <Input placeholder='Ruc o Documento' disabled value={documento} onChange={(e) => setDocumento(e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col style={{ minWidth: `30%` }}>
                        <Form.Item id='nombre' label='Nombre' >
                            <Input name='nombre' placeholder='nombre' disabled value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col style={{ minWidth: `30%` }}>
                        <Form.Item label='Apellido' >
                            <Input placeholder='Apellido' value={apellido} disabled onChange={(e) => setApellido(e.target.value)} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ minWidth: `30%` }}>
                        <Form.Item label='Telefono' id='tel' name="tel" disabled >
                            <Input placeholder='Telefono' value={telefono} disabled onChange={(e) => setTelefono(e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col style={{ minWidth: `30%` }}>
                        <Form.Item label='Costo total' name="costo" rules={[{ required: true, message: 'Cargue costo total', },]}>
                            <Input placeholder='Costo total' value={costo_total} onChange={(e) => setCostoTotal(e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col style={{ minWidth: `30%` }}>
                        <Form.Item label='Fecha de pago' id='pago' rules={[{ required: true, message: 'Cargue fecha de pago', },]} >
                            {fecha_pago ?
                                <Input id='pago' name="pago" disabled value={fecha_pago} />
                                : null}
                            <DatePicker
                                format="YYYY-MM-DD"
                                onChange={date => changeDate(date)}
                                style={{ width: '100%' }} placeholder={'Fecha de pago'} />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider orientation="center" type="horizontal" style={{ color: `#747E87`, marginLeft: `0px`, marginTop: `0px` }}>Detalle perfiles</Divider>
                <Row style={{ justifyContent: `center` }} >
                    <Col style={{ minWidth: `25rem` }}>
                        <Form.Item
                            label='Perfil'
                            rules={[{ required: true, message: 'Seleccione perfil', },]}>
                            {idperfil ?
                                <Input id='idperfil' name='idperfil' disabled value={idperfil} />
                                : null}
                            <Buscador label={'cuenta_perfil'} title={'Perfil'} selected={idperfil} value={'idperfil'} data={lstPerfil} onChange={onchangePerfil} onSearch={onSearch} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ justifyContent: `center` }}>
                    <Col style={{ marginBottom: `10px` }}>
                        <Button type="primary" htmlType="submit" onClick={(e) => agregarLista(e)} >
                            Agregar
                        </Button>
                    </Col>
                </Row>
                <Row style={{ alignItems: `center`, justifyContent: `center`, margin: `0px`, display: `flex` }}>
                    <Table style={{ backgroundColor: `white` }}>
                        <thead style={{ backgroundColor: `#03457F`, color: `white` }}>
                            <tr >
                                <th>perfil</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tbl_phc_tmp.length !== 0 ? tbl_phc_tmp.map((inv, index) => (
                                <tr key={index}>
                                    <td> {inv?.perfil} </td>
                                    <td>
                                        <button onClick={(e) => extraerRegistro(e, index)} className='btn btn-danger'><IoTrashOutline /></button>
                                    </td>
                                </tr>
                            )) : null
                            }
                        </tbody>
                    </Table>
                    <Col >
                        <Button type="primary" htmlType="submit" style={{ margin: `10px` }} >
                            Guardar
                        </Button>
                        <Button type="primary" htmlType="submit" onClick={btnCancelar}  >
                            Cancelar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default NuevaPerfilHasCliente;
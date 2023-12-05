import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Divider } from 'antd';
import { Row, Col, message } from 'antd';
import { IoTrashOutline } from 'react-icons/io5';
import Table from 'react-bootstrap/Table';
import { createCuenta } from '../../services/Cuenta';
import { Titulos } from '../Utils/Titulos';
import { getTipoCuenta } from '../../services/TipoCuenta';
import Buscador from '../Utils/Buscador/Buscador';

function NuevaCuenta({ token }) {
    const [form] = Form.useForm();
    const [descripcion, setDescripcion] = useState('');
    const [perfil, setPerfil] = useState('');
    const [idtipo_cuenta, setIdTipoCuenta] = useState();
    const [lstTipoCuenta, setLstTipoCuenta] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCuenta, setPasswordCuenta] = useState('');
    const [tbl_perfiles_tmp, setTblPerfilTmp] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getLstTipoCuenta();
        // eslint-disable-next-line
    }, []);


    const getLstTipoCuenta = async () => {
        const res = await getTipoCuenta({ token: token, param: 'get' });
        setLstTipoCuenta(res.body);
    }


    const guardaProducto = async (valores) => {
        return await createCuenta({ token: token, json: valores });
    }

    //procedimiento para guardar
    const gestionGuardado = async () => {
        //e.preventDefault();
        //Validaciones
        if (tbl_perfiles_tmp.length <= 0) { message.error('Cargue detalles'); return; }

        const json = {
            estado: 'AC',
            descripcion,
            idtipo_cuenta,
            password: passwordCuenta,
            perfil: tbl_perfiles_tmp
        };

        guardaProducto(json).then((cabecera) => {
            //Guardado de receta
            //console.log('cabecera', cabecera)
            if (cabecera.estado !== 'error') {
                message.success(cabecera?.mensaje);
                navigate('/cuenta');
            } else {
                message.error(cabecera?.mensaje);
            }
        });

    }

    const agregarLista = async (e) => {
        e.preventDefault();
        //Validaciones
        //console.log(password)
        /*Tabla temporal*/
        const upttblperfil = {
            password: password,
            estado: 'AC',
            descripcion: perfil
        };
        /*Se va sumando los valores que se van cargando*/
        setTblPerfilTmp([...tbl_perfiles_tmp, upttblperfil])
        message.success('Agregado');
        form.setFieldValue('perfil', '');
        form.setFieldValue('password', '');
        setPassword('')
        setPerfil('')
    }

    const btnCancelar = (e) => {
        e.preventDefault();
        navigate('/cuenta');
    }


    const extraerRegistro = async (e, id) => {
        e.preventDefault();
        const updtblCuenta = tbl_perfiles_tmp.filter((inv, index) => index !== id);
        setTblPerfilTmp(updtblCuenta);
    };

    const onChangeTipoCuenta = (value) => {
        form.setFieldValue('idtipo_cuenta', value);
        setIdTipoCuenta(value)
    };

    const onSearch = (value) => {
        console.log('search:', value);
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
                <Divider orientation="center" type="horizontal" style={{ color: `#747E87` }}>Datos cuenta</Divider>
                <Row style={{ justifyContent: `center` }} >
                    <Col style={{ minWidth: `25rem` }}>
                        <Form.Item label="Descrpcion cuenta" rules={[{ required: true, message: 'Cargue descripcion de cuenta', },]}>
                            <Input placeholder='Descripcion cuenta' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col style={{ minWidth: `25rem` }}>
                        <Form.Item label="Contraseña cuenta" rules={[{ required: true, message: 'Cargue contraseña de cuenta', },]}>
                            <Input placeholder='Cargue contrasseña de cuenta' value={passwordCuenta} onChange={(e) => setPasswordCuenta(e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col style={{ minWidth: `25rem` }}>
                        <Form.Item
                            label='Tipo de cuenta'
                            rules={[{ required: true, message: 'Seleccione tipo de cuenta', },]}>
                            {idtipo_cuenta ?
                                <Input id='idtipo_cuenta' name='idtipo_cuenta' disabled value={idtipo_cuenta} />
                                : null}
                            <Buscador label={'descripcion'} title={'Tipo de cuenta'} selected={idtipo_cuenta} value={'idtipo_cuenta'} data={lstTipoCuenta} onChange={onChangeTipoCuenta} onSearch={onSearch} />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider orientation="center" type="horizontal" style={{ color: `#747E87`, marginLeft: `0px`, marginTop: `0px` }}>Detalle perfiles</Divider>
                <Row style={{ justifyContent: `center` }} >
                    <Col style={{ minWidth: `25rem` }}>
                        <Form.Item label="Perfil" name="perfil" id="perfil">
                            <Input placeholder='Perfil' value={perfil} onChange={(e) => setPerfil(e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col style={{ minWidth: `25rem` }}>
                        <Form.Item label="Contraseña" name="password" id="password">
                            <Input placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
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
                                <th>Perfil</th>
                                <th>Contraseña</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tbl_perfiles_tmp.length !== 0 ? tbl_perfiles_tmp.map((inv, index) => (
                                <tr key={index}>
                                    <td> {inv?.descripcion} </td>
                                    <td> {inv.password} </td>
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

export default NuevaCuenta;


import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Button, Form, Input, Row, Divider, Col, message } from 'antd';
import Buscador from '../Utils/Buscador/Buscador';
import { getLikeCliente, createCliente, updateCliente } from '../../services/Cliente';
import { Titulos } from '../Utils/Titulos';


function NuevoCliente({ token }) {
    const [form] = Form.useForm();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [documento, setDocumento] = useState(null);
    const [contDocumento, setContDocumento] = useState(false);
    const [direccion, setDireccion] = useState(null);
    const [sdocumento, setSDocumento] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [idcliente, setIdcliente] = useState(null);
    const [telefono, setTelefono] = useState('');
    const [btn, setBtn] = useState(false);
    const navigate = useNavigate();

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
        setContDocumento(false);
        setDireccion('');
        setIdcliente(0);
        form.setFieldValue('buscadoc', '');
        form.setFieldValue('nombre', '');
        form.setFieldValue('apellido', '');
        form.setFieldValue('documento', '');
        form.setFieldValue('direccion', '');
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

    const create = async (e) => {
        let saveCliente = {
            nombre: nombre,
            apellido: apellido,
            documento: documento,
            estado: 'AC',
            direccion: direccion,
            telefono
        };

        await getLikeCliente({ token: token, param: documento }).then(async (rsper) => {
            if (rsper.body.length !== 0) {
                rsper.body.map(async (per) => {
                    if (per.documento === documento) {
                        saveCliente.idcliente = per.idcliente;
                        await updateCliente({ token: token, param: saveCliente.idcliente, json: saveCliente }).then((rsper) => {
                            console.log(rsper);
                        }).then(async (_) => {
                            navigate(`/cliente`);
                            message.success('Registro almacenado');
                        });
                    }
                })
            } else {
                await createCliente({ token: token, json: saveCliente }).then(async (cliente) => {
                    if (cliente.error === 'error catch') {
                        message.error('Error de registro de cliente');
                        return;
                    }
                    navigate(`/cliente`);
                    message.success('Registro almacenado');
                });
            }
        })
    }

    const btnCancelar = (e) => {
        e.preventDefault();
        navigate('/cliente');
    }

    const onChangeCliente = (value) => {
        clientes.map((element) => {
            if (element.idcliente === value) {
                setNombre(element.nombre);
                setApellido(element.apellido);
                setDocumento(element.documento);
                setTelefono(element.telefono);
                setContDocumento(true);
                setDireccion(element.direccion);
                setIdcliente(element.idcliente);

                form.setFieldValue('nombre', element.nombre);
                form.setFieldValue('apellido', element.apellido);
                form.setFieldValue('documento', element.documento);
                form.setFieldValue('direccion', element.direccion);
                form.setFieldValue('idcliente', element.idcliente);
            }
            return true;
        });
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    return (
        <div >
            <div style={{ marginBottom: `20px` }}>
                <Titulos text={`FORMULARIO DE CLIENTE`} level={3}></Titulos>
            </div>
            <Form
                name="basic"
                layout="vertical"
                style={{ textAlign: `center`, marginLeft: `10px` }}
                labelCol={{ span: 8, }}
                wrapperCol={{ span: 16, }}
                initialValues={{ remember: true, }}
                onFinish={create}
                autoComplete="off"
                form={form} >
                <Divider orientation="left" type="horizontal" style={{ color: `#7CC1FE` }}>Busqueda por ruc o documento</Divider>
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
                                //style={{ display: `block`,margin:1 }}
                                //labelCol={{ span: 0, }}
                                //wrapperCol={{ span: 0, }}
                                //rules={[{ required: true, message: `Por favor seleccione ${title}!`, },]} 
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
                {idcliente !== 0 && idcliente !== null ?
                    <Form.Item
                        label='Idcliente'
                        id='idcliente' >
                        <Input disabled value={idcliente} onChange={(e) => setIdcliente(e.target.value)} />
                    </Form.Item>
                    : null}
                <Form.Item label='Ruc o documento' id='documento' name="documento" rules={[{ required: true, message: 'Cargue numero de documento', },]}>
                    <Input placeholder='Ruc o Documento' disabled={contDocumento} value={documento} onChange={(e) => setDocumento(e.target.value)} />
                </Form.Item>
                <Form.Item id='nombre' label='Nombre' rules={[{ required: true, message: 'Cargue nombre', },]}>
                    <Input name='nombre' placeholder='nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </Form.Item>
                <Form.Item label='Apellido' rules={[{ required: true, message: 'Cargue apellido', },]}>
                    <Input placeholder='Apellido' value={apellido} onChange={(e) => setApellido(e.target.value)} />
                </Form.Item>
                <Form.Item label='Dirección' id='direccion' rules={[{ required: true, message: 'Cargue direccion', },]}>
                    <Input placeholder='Direccion' value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                </Form.Item>
                <Form.Item label='Telefono' id='tel' name="tel" rules={[{ required: true, message: 'Cargue numero de telefono', },]}>
                    <Input placeholder='Telefono' value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                </Form.Item>
                <Form.Item
                    style={{ margin: `20px` }}>
                    <Button type="primary" htmlType="submit" style={{ margin: `20px` }} >
                        Guardar
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={btnCancelar} style={{ margin: `20px` }} >
                        Cancelar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default NuevoCliente;

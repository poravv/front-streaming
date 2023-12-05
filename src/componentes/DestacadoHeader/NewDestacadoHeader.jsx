

import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { createDestacadoHeader } from '../../services/destacado_header';
import { Titulos } from '../Utils/Titulos';
import { Option } from 'antd/es/mentions';

function NewDestacadoHeader({ token }) {
    const [form] = Form.useForm();
    const [title, settitle] = useState()
    const [subtitle, setsubtitle] = useState()
    const [tipo, setTipo] = useState()
    const navigate = useNavigate();

    const create = async (e) => {
        //e.preventDefault();
        await createDestacadoHeader({
            token: token, json: {
                title,
                subtitle,
                tipo,
                state: "AC"
            }
        });
        navigate('/destacadoheader');
    }

    const btnCancelar = (e) => {
        e.preventDefault();
        navigate('/destacadoheader');
    }

    const onchangeSelect = async (value) => {
        console.log(value)
        setTipo(value);
        form.setFieldValue('tipo', value);
    };
    return (
        <div >
            <div style={{ marginBottom: `20px` }}>
                <Titulos text={`NUEVO TITULO DESTACADO`} level={3}></Titulos>
            </div>
            <Form
                name="basic"
                layout="vertical"
                form={form}
                style={{ textAlign: `center`, marginLeft: `10px` }}
                labelCol={{ span: 8, }}
                wrapperCol={{ span: 16, }}
                initialValues={{ remember: true, }}
                onFinish={create}
                autoComplete="off"
            >
                <Form.Item label='Título' name="title" rules={[{ required: true, message: 'Cargue título', },]}><Input placeholder='Título' value={title} onChange={(e) => settitle(e.target.value)} /></Form.Item>
                <Form.Item label='Subtítulo' name="subtitle" rules={[{ required: true, message: 'Cargue subtítulo', },]}><Input placeholder='Subtítulo' value={subtitle} onChange={(e) => setsubtitle(e.target.value)} /></Form.Item>
                <Form.Item label="Tipo" rules={[{ required: true, message: `Por favor complete el tipo`, },]}>
                    <Input id='tipo' name='tipo' hidden disabled value={tipo} />
                    <Select allowClear onChange={onchangeSelect} value={tipo}>
                        <Option value="serv">Servicio</Option>
                        <Option value="prod">Producto</Option>
                    </Select>
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

export default NewDestacadoHeader;

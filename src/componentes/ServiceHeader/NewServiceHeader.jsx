

import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Button, Form, Input } from 'antd';
import { createServiceHeader } from '../../services/service_header';
import { Titulos } from '../Utils/Titulos';

function NewServiceHeader({ token }) {
    const [form] = Form.useForm();
    const [title, settitle] = useState()
    const [subtitle, setsubtitle] = useState()
    const navigate = useNavigate();

    const create = async (e) => {
        //e.preventDefault();
        await createServiceHeader({
            token: token, json: {
                title,
                subtitle,
                state: "AC"
        } });
    navigate(-1);
}

const btnCancelar = (e) => {
    e.preventDefault();
    navigate(-1);
}

return (
    <div >
        <div style={{ marginBottom: `20px` }}>
            <Titulos text={`NUEVO TÍTULO SERVICIO`} level={3}></Titulos>
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

export default NewServiceHeader;

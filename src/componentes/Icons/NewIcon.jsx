

import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Button, Form, Input } from 'antd';
import { createIcon } from '../../services/icon';
import { Titulos } from '../Utils/Titulos';

function NewIcon({ token }) {
    const [form] = Form.useForm();
    const [icon, seticon] = useState()
    const navigate = useNavigate();

    const create = async (e) => {
        //e.preventDefault();
        await createIcon({
            token: token, json: {
                name:icon,
                icon:icon,
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
            <Titulos text={`NUEVO ICONO`} level={3}></Titulos>
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
            <Form.Item label='Icono' name="icon" rules={[{ required: true, message: 'Cargue Icono', },]}><Input placeholder='Icono' value={icon} onChange={(e) => seticon(e.target.value)} /></Form.Item>
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

export default NewIcon;

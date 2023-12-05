

import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Button, Form, Input } from 'antd';
import { createFooterLabel } from '../../services/footer_label';
import { Titulos } from '../Utils/Titulos';

function NewFooterLabel({ token }) {
    const [form] = Form.useForm();
    const [description, setdescription] = useState()
    const [href, sethref] = useState()
    const navigate = useNavigate();

    const create = async (e) => {
        //e.preventDefault();
        await createFooterLabel({
            token: token, json: {
                description,
                href,
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
            <Titulos text={`NUEVO TÍTULO DE PIE`} level={3}></Titulos>
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
            <Form.Item label='Descripción' name="description" rules={[{ required: true, message: 'Cargue Descripción', },]}><Input placeholder='Descripción' value={description} onChange={(e) => setdescription(e.target.value)} /></Form.Item>
            <Form.Item label='Href' name="href" rules={[{ required: true, message: 'Cargue href', },]}><Input placeholder='Subtítulo' value={href} onChange={(e) => sethref(e.target.value)} /></Form.Item>
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

export default NewFooterLabel;

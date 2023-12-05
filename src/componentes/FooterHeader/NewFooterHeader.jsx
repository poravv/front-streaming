

import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Button, Form, Input } from 'antd';
import { createFooterHeader } from '../../services/footer_header';
import { Titulos } from '../Utils/Titulos';

function NewFooterHeader({ token }) {
    const [form] = Form.useForm();
    const [label1, setlabel1] = useState()
    const [label2, setlabel2] = useState()
    const navigate = useNavigate();

    const create = async (e) => {
        //e.preventDefault();
        await createFooterHeader({
            token: token, json: {
                label1,
                label2,
                state: "AC"
        } });
    navigate('/footerheader');
}

const btnCancelar = (e) => {
    e.preventDefault();
    navigate('/footerheader');
}

return (
    <div >
        <div style={{ marginBottom: `20px` }}>
            <Titulos text={`NUEVO TÍTULO PIE`} level={3}></Titulos>
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
            <Form.Item label='Título 1' name="label1" rules={[{ required: true, message: 'Cargue título', },]}><Input placeholder='Título 1' value={label1} onChange={(e) => setlabel1(e.target.value)} /></Form.Item>
            <Form.Item label='Título 1' name="label2" rules={[{ required: true, message: 'Cargue título', },]}><Input placeholder='Título 2' value={label2} onChange={(e) => setlabel2(e.target.value)} /></Form.Item>
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

export default NewFooterHeader;

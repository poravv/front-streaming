

import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Button, Form, Input } from 'antd';
import { createWelcome } from '../../services/welcome';
import { Titulos } from '../Utils/Titulos';
import UploadFile from '../Utils/Upload';

function NewWelcome({ token }) {
    const [form] = Form.useForm();
    const [title, settitle] = useState()
    const [subtitle, setsubtitle] = useState()
    const [description, setdescription] = useState()
    const [button_label, setbutton_label] = useState()
    //const [html_image, sethtml_image] = useState()
    const [button_href, setbutton_href] = useState()
    const [previewImage1, setPreviewImage1] = useState();
    const navigate = useNavigate();

    const create = async (e) => {
        //e.preventDefault();
        await createWelcome({
            token: token, json: {
                title,
                subtitle,
                description,
                html_image:previewImage1,
                button_href,
                button_label,
                state: "AC"
        } });
    navigate('/welcome');
}

const btnCancelar = (e) => {
    e.preventDefault();
    navigate('/welcome');
}

return (
    <div >
        <div style={{ marginBottom: `20px` }}>
            <Titulos text={`NUEVA BIENVENIDA`} level={3}></Titulos>
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
            <Form.Item label='Título' name="title" rules={[{ required: true, message: 'Cargue Título', },]}><Input placeholder='Título' value={title} onChange={(e) => settitle(e.target.value)} /></Form.Item>
            <Form.Item label='Subítulo' name="subtitle" rules={[{ required: true, message: 'Cargue Subítulo', },]}><Input placeholder='Subítulo' value={subtitle} onChange={(e) => setsubtitle(e.target.value)} /></Form.Item>
            <Form.Item label='Descripción' name="description" rules={[{ required: true, message: 'Cargue Descripción', },]}><Input placeholder='Descripción' value={description} onChange={(e) => setdescription(e.target.value)} /></Form.Item>
            <Form.Item label='Texto de botón' name="button_label" rules={[{ required: true, message: 'Cargue texto', },]}><Input placeholder='Texto de botón' value={button_label} onChange={(e) => setbutton_label(e.target.value)} /></Form.Item>
            {/*<Form.Item label='html image' name="html_image" rules={[{ required: true, message: 'Cargue html image', },]}><Input placeholder='html image' value={html_image} onChange={(e) => sethtml_image(e.target.value)} /></Form.Item>*/}
            <Form.Item name="imagen" id='imagen' style={{ margin: `10px` }}  >
                    <UploadFile previewImage={previewImage1} setPreviewImage={setPreviewImage1} />
                </Form.Item>
            <Form.Item label='Vínculo' name="button_href" rules={[{ required: true, message: 'Cargue Vínculo', },]}><Input placeholder='Vínculo' value={button_href} onChange={(e) => setbutton_href(e.target.value)} /></Form.Item>
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

export default NewWelcome;



import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Button, ColorPicker, Form, Input } from 'antd';
import { createAbout } from '../../services/about';
import { Titulos } from '../Utils/Titulos';
import UploadFile from '../Utils/Upload';
const { TextArea } = Input;

function NewAbout({ token }) {
    const [form] = Form.useForm();
    const [title, settitle] = useState()
    const [subtitle, setsubtitle] = useState()
    const [description, setdescription] = useState()
    const [about_background, setabout_background] = useState()
    //const [html_image, sethtml_image] = useState()
    const [previewImage1, setPreviewImage1] = useState();
    const navigate = useNavigate();
    const [formatHex, setFormatHex] = useState('hex');

    const hexString = (color) => {
        if(typeof color === 'string'){
            return color
        }else{
            return color.toHexString()
        }
    }

    const create = async (e) => {
        //e.preventDefault();
       /*
        if(!previewImage1){
            message.warning('Favor cargue una imagen')
            return;
        }*/

        await createAbout({
            token: token, json: {
                title,
                subtitle,
                description,
                html_image:previewImage1??'',
                about_background:hexString(about_background),
                state: "AC"
        } });
    navigate('/about');
}

const btnCancelar = (e) => {
    e.preventDefault();
    navigate('/about');
}

return (
    <div >
        <div style={{ marginBottom: `20px` }}>
            <Titulos text={`NUEVO`} level={3}></Titulos>
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
            <Form.Item label='Descripción' name="description" rules={[{ required: true, message: 'Cargue Descripción', },]}><TextArea placeholder='Descripción' value={description} onChange={(e) => setdescription(e.target.value)} /></Form.Item>
            <Form.Item label='Color de sección' name="about_background" rules={[{ required: true, message: 'Cargue color de sección', },]}><ColorPicker value={about_background} onChange={setabout_background} showText format={formatHex} onFormatChange={setFormatHex} /></Form.Item>
            
            <Form.Item name="imagen" id='imagen' style={{ margin: `10px` }}  >
                    <UploadFile previewImage={previewImage1} setPreviewImage={setPreviewImage1} />
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

export default NewAbout;

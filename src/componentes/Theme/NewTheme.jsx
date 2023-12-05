

import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Button, Form, ColorPicker, message } from 'antd';
import { createTheme } from '../../services/theme';
import { Titulos } from '../Utils/Titulos';

function NewTheme({ token }) {
    const [form] = Form.useForm();
    const [header_color, setheader_color] = useState()
    const [header_color2, setheader_color2] = useState()
    const [header_title_color, setheader_title_color] = useState()
    const [content_background_color, setcontent_background_color] = useState()
    const [footer_background_color1, setfooter_background_color1] = useState()
    const [footer_background_color2, setfooter_background_color2] = useState()
    const [footer_title_color, setfooter_title_color] = useState()
    const [footer_icon_color, setfooter_icon_color] = useState()
    const [content_title_color, setcontent_title_color] = useState()
    const [content_subtitle_color, setcontent_subtitle_color] = useState()
    const [content_description_color, setcontent_description_color] = useState()
    const [content_button_color, setcontent_button_color] = useState()
    const [button_text_color, setbutton_text_color] = useState()
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
        const json = {
            header_color:hexString(header_color),
            header_title_color:hexString(header_title_color),
            content_background_color:hexString(content_background_color),
            footer_background_color1:hexString(footer_background_color1),
            footer_background_color2:hexString(footer_background_color2),
            footer_title_color:hexString(footer_title_color),
            footer_icon_color:hexString(footer_icon_color),
            content_title_color:hexString(content_title_color),
            content_subtitle_color:hexString(content_subtitle_color),
            content_description_color:hexString(content_description_color),
            content_button_color:hexString(content_button_color),
            button_text_color:hexString(button_text_color),
            state: "AC"
        }
        console.log(json)
        await createTheme({
            token: token, json: json
        }).then((res) => {
            if (res?.mensaje === 'error') {
                console.log(res)
            } else {
                message.success('Registro almacenado')
                navigate('/tema');
            }
        });
    }

    const btnCancelar = (e) => {
        e.preventDefault();
        navigate('/tema');
    }

    return (
        <div >
            <div style={{ marginBottom: `20px` }}>
                <Titulos text={`NUEVO TEMA`} level={3}></Titulos>
            </div>
            <Form
                name="basic"
                layout="vertical"
                form={form}
                style={{ marginLeft: `10px` }}
                labelCol={{ span: 8, }}
                wrapperCol={{ span: 16, }}
                initialValues={{ remember: true, }}
                onFinish={create}
                autoComplete="off"
            >
                <Form.Item label='Color de navbar 1' name="header_color" rules={[{ required: true, message: 'Cargue Color de navbar', },]}><ColorPicker value={header_color} onChange={setheader_color} showText format={formatHex} onFormatChange={setFormatHex} /></Form.Item>
                <Form.Item label='Color de navbar 2' name="header_color2" ><ColorPicker value={header_color2} onChange={setheader_color2} showText format={formatHex} onFormatChange={setFormatHex} /></Form.Item>
                <Form.Item label='Color de texto navbar' name="header_title_color" rules={[{ required: true, message: 'Cargue Color de texto navbar', },]}><ColorPicker placeholder='Color de texto navbar' onChange={setheader_title_color} showText format={formatHex} onFormatChange={setFormatHex} /></Form.Item>
                <Form.Item label='Fondo de paginas' name="content_background_color" rules={[{ required: true, message: 'Cargue Fondo de paginas', },]}><ColorPicker placeholder='Fondo de paginas' onChange={setcontent_background_color} showText format={formatHex} onFormatChange={setFormatHex} /></Form.Item>
                <Form.Item label='Fondo de pie de pagina 1' name="footer_background_color1" rules={[{ required: true, message: 'Cargue Fondo de pie de pagina', },]}><ColorPicker placeholder='Fondo de pie de pagina' onChange={setfooter_background_color1} showText format={formatHex} onFormatChange={setFormatHex} /></Form.Item>
                <Form.Item label='Fondo de pie de pagina 2' name="footer_background_color2" ><ColorPicker placeholder='Fondo 2 de pie de pagina' onChange={setfooter_background_color2} showText format={formatHex} onFormatChange={setFormatHex} /></Form.Item>
                <Form.Item label='Color de titulo de pie' name="footer_title_color" rules={[{ required: true, message: 'Cargue Color de titulo de pie', },]}><ColorPicker placeholder='Color de titulo de pie' onChange={setfooter_title_color} showText format={formatHex} onFormatChange={setFormatHex} /></Form.Item>
                <Form.Item label='Color de iconos de pie' name="footer_icon_color" rules={[{ required: true, message: 'Cargue Color de iconos de pie', },]}><ColorPicker placeholder='Color de iconos de pie' onChange={setfooter_icon_color} showText format={formatHex} onFormatChange={setFormatHex} /></Form.Item>
                <Form.Item label='Color de titulo de contenido' name="content_title_color" rules={[{ required: true, message: 'Cargue Color de titulo de contenido', },]}><ColorPicker placeholder='Color de titulo de contenido' onChange={setcontent_title_color} showText format={formatHex} onFormatChange={setFormatHex} /></Form.Item>
                <Form.Item label='Color de subtitulo de contenido' name="content_subtitle_color" rules={[{ required: true, message: 'Cargue Color de subtitulo de contenido', },]}><ColorPicker placeholder='Color de subtitulo de contenido' onChange={setcontent_subtitle_color} showText format={formatHex} onFormatChange={setFormatHex} /></Form.Item>
                <Form.Item label='Color de descripción de contenido' name="content_description_color" rules={[{ required: true, message: 'Cargue Color de descripción de contenido', },]}><ColorPicker placeholder='Color de descripción de contenido' onChange={setcontent_description_color} showText format={formatHex} onFormatChange={setFormatHex} /></Form.Item>
                <Form.Item label='Color de botón de contenido' name="content_button_color" rules={[{ required: true, message: 'Cargue Color de botón de contenido', },]}><ColorPicker placeholder='Color de botón de contenido' value={content_button_color} onChange={setcontent_button_color} showText format={formatHex} onFormatChange={setFormatHex} /></Form.Item>
                <Form.Item label='Color de texto de boton de contenido' name="button_text_color" rules={[{ required: true, message: 'Cargue Color de texto de boton de contenido', },]}><ColorPicker placeholder='Color de texto de boton de contenido' onChange={setbutton_text_color} showText format={formatHex} onFormatChange={setFormatHex} /></Form.Item>
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

export default NewTheme;



import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Button, Form, message } from 'antd';
import { createLogo } from '../../services/logo';
import { Titulos } from '../Utils/Titulos';
import UploadFile from '../Utils/Upload';

function NewLogo({ token }) {
    const [form] = Form.useForm();
    const [previewImage1, setPreviewImage1] = useState();
    const navigate = useNavigate();

    const create = async (e) => {
        //e.preventDefault();
        
        if(!previewImage1){
            message.warning('Favor cargue una imagen')
            return;
        }

        await createLogo({
            token: token, json: {
                html_image:previewImage1,
                state: "AC"
            }
        });
        navigate('/logos');
    }

    const btnCancelar = (e) => {
        e.preventDefault();
        navigate('/logos');
    }

    return (
        <div >
            <div style={{ marginBottom: `20px` }}>
                <Titulos text={`NUEVO LOGO`} level={3}></Titulos>
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
                autoComplete="off">
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

export default NewLogo;



import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Button, Form, Input } from 'antd';
import { createTipoCuenta } from '../../services/TipoCuenta';
import { Titulos } from '../Utils/Titulos';
import { message } from 'antd';

function NuevoTipoCuenta({ token }) {
    //Parte de nuevo registro por modal
    const [form] = Form.useForm();
    const [descripcion, setDescripcion] = useState()
    const navigate = useNavigate();
    //procedimiento para actualizar
    const create = async (e) => {
        //e.preventDefault();
        await createTipoCuenta({ token: token, json: { descripcion: descripcion, estado: "AC" } }).then((res) => {
            if(res?.estado!=='error'){
                message.success(res?.mensaje);
                navigate('/tipo_cuenta');
            }else{
                message.error(res?.mensaje);
            }
        });
    }

    const btnCancelar = (e) => {
        e.preventDefault();
        navigate('/tipo_cuenta');
    }

    return (
        <div >
            <div style={{ marginBottom: `20px` }}>
                <Titulos text={`NUEVO TIPO DE CUENTA`} level={3}></Titulos>
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
                //onFinishFailed={create}
                autoComplete="off"
            >
                <Form.Item label='Descripción' name="descripcion" rules={[{ required: true, message: 'Cargue descripción de tipo_cuenta', },]}>
                    <Input placeholder='Descripción' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
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

export default NuevoTipoCuenta;

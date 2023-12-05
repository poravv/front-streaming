

import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { createFooterIcon } from '../../services/footer_icon';
import { Titulos } from '../Utils/Titulos';
import { getIcon } from '../../services/icon';
const { Option } = Select;

function NewFooterIcon({ token }) {
    const [icons, setIcons] = useState([]);
    const [idicon, setIdIcon] = useState([]);
    const [form] = Form.useForm();
    const [href, sethref] = useState()
    const navigate = useNavigate();


    useEffect(() => {
        getLstIcon();
        // eslint-disable-next-line
    }, []);

    const getLstIcon = async () => {
        try {
            const res = await getIcon({ token: token, param: 'get' });
            setIcons(res.body);
        } catch (e) {
            console.log(e);
        }
    }

    const create = async (e) => {
        //e.preventDefault();
        await createFooterIcon({
            token: token, json: {
                href,
                state: "AC",
                idicon
            }
        });
        navigate(-1);
    }

    const btnCancelar = (e) => {
        e.preventDefault();
        navigate(-1);
    }

    const onchangeBuscador = async (value) => {
        console.log(value)
        setIdIcon(value);
        form.setFieldValue('idicon', value);
    };

    return (
        <div >
            <div style={{ marginBottom: `20px` }}>
                <Titulos text={`NUEVO ICONO DE PIE`} level={3}></Titulos>
            </div>
            <Form
                name="basic"
                layout="vertical"
                form={form}
                style={{ textAlign: `center`, marginLeft: `10px` }}
                idCol={{ span: 8, }}
                wrapperCol={{ span: 16, }}
                initialValues={{ remember: true, }}
                onFinish={create}
                autoComplete="off"
            >
                <Form.Item id='Href' name="href" rules={[{ required: true, message: 'Cargue href', },]}><Input placeholder='Vínculo' value={href} onChange={(e) => sethref(e.target.value)} /></Form.Item>
                <Form.Item
                    label='Iconos'
                    id='idicon'
                    name="idicon"
                    rules={[{ required: true, message: 'Seleccione icono' },]}
                >
                    <Input id='idicon' name='idicon' hidden disabled value={idicon} onChange={(e) => setIdIcon(e.target.value)} />
                    <Select allowClear style={{ minWidth: `100px` }} onChange={onchangeBuscador} value={idicon} >
                        {icons?.map((row) => (
                            <Option key={row.idicon} value={row?.idicon.toString()}><i className={`${row?.icon}`} /></Option>
                        ))}
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

export default NewFooterIcon;

import { useState, useEffect } from 'react'
import { Popconfirm, Typography, Form, Tag, message, Button } from 'antd';
import TableModel from '../Utils/TableModel/TableModel';
import { useNavigate } from "react-router-dom";
import { getIcon, updateIcon } from '../../services/icon';
import { Titulos } from '../Utils/Titulos';
import { BuscadorTabla } from '../Utils/Buscador/BuscadorTabla'
import { Container } from 'react-bootstrap';

const ListIcon = ({ token }) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        getLstIcon();
        // eslint-disable-next-line
    }, []);


    const getLstIcon = async () => {
        try {
            const res = await getIcon({ token: token, param: 'get' });
            setData(res.body);
        } catch (e) {
            console.log(e);
        }
    }

    const handleDelete = async (id) => {
        await updateIcon({ token: token, param: id, json: { state: "IN" } })
        getLstIcon();
    }

    const handleUpdate = async (newData) => {
        await updateIcon({ token: token, param: newData.idicon, json: newData }).then((res) => {
            console.log(res)
            if (res?.mensaje === 'error') {
                message.error(res?.detmensaje)
            } else {
                getLstIcon();
                message.success(res?.detmensaje)
            }
        })
    }

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.name.localeCompare(b.name),
            ...BuscadorTabla('name'),
        },
        {
            title: 'Icono',
            dataIndex: 'icon',
            editable: false,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.icon.localeCompare(b.icon),
            ...BuscadorTabla('icon'),
            render: (_,{icon}) => {
                console.log(icon)
                return (<i className={`${icon}`} ></i>)
            }
        },
        {
            title: 'Estado',
            dataIndex: 'state',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.state.localeCompare(b.state),
            render: (_, { state, idicon }) => {
                let color = 'black';
                if (state.toUpperCase() === 'AC') { color = 'green' }
                else { color = 'volcano'; }
                return (
                    <Tag color={color} key={idicon} >
                        {state.toUpperCase() === 'AC' ? 'Activo' : 'Inactivo'}
                    </Tag>
                );
            },
        },
        {
            title: 'Acción',
            dataIndex: 'operacion',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.idicon)}
                            style={{
                                marginRight: 8,
                            }} >
                            Guardar
                        </Typography.Link>
                        <br />
                        <Popconfirm title="Desea cancelar?" onConfirm={cancel}>
                            <Typography.Link >
                                Cancelar
                            </Typography.Link>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <Popconfirm
                            title="Desea eliminar este registro?"
                            onConfirm={() => confirmDel(record.idicon)}
                            onCancel={cancel}
                            okText="Si"
                            cancelText="No" >
                            <Typography.Link >
                                Borrar
                            </Typography.Link>
                        </Popconfirm>
                    </>
                );
            },
        }
    ]


    const isEditing = (record) => record.idicon === editingKey;

    const cancel = (e) => {
        e.preventDefault()
        setEditingKey('');
    };

    const confirmDel = (idicon) => {
        message.success('Procesando');
        handleDelete(idicon);
    };

    const save = async (idicon) => {

        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => idicon === item.idicon);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                handleUpdate(newData[index]);
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };



    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div style={{ display:`flex` }}>
            <Container>
                <Titulos text={`ICONOS`} level={3}></Titulos>
                <div style={{ marginBottom: `5px`, textAlign: `end` }}>
                    <Button type="primary" onClick={() => navigate('/nuevoicono')} > Nuevo</Button>
                </div>
                <TableModel mergedColumns={mergedColumns} data={data} form={form} keyExtraido={'idicon'} varx={400} />
            </Container>

        </div>
    )
}
export default ListIcon
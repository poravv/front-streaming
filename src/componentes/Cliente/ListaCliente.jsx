import React, { useState, useEffect } from 'react'
import { Popconfirm, Typography, Form, Tag, Button, message } from 'antd';
import TableModel from '../Utils/TableModel/TableModel';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { getCliente, updateCliente } from '../../services/Cliente';
import { Titulos } from '../Utils/Titulos';
import { BuscadorTabla } from '../Utils/Buscador/BuscadorTabla'

function ListaCliente({ token }) {

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getLstCliente();
        // eslint-disable-next-line
    }, []);

    const getLstCliente = async () => {
        if (data.length <= 0) {
            const res = await getCliente({ token: token });
            setData(res.body);
        }
    }

    const handleDelete = async (id) => {
        //await deleteCliente({token:token,param:id})
        await updateCliente({ token: token, param: id, json: { estado: "IN" } }).then((res) => {
            if (res?.estado !== 'error') {
                getLstCliente();
                message.warning('Registro anulado');
            } else {
                message.error(res?.mensaje);
            }
        });
    }

    const handleUpdate = async (newData) => {
        await updateCliente({ token: token, param: newData.idcliente, json: newData }).then((res) => {
            if (res?.estado !== 'error') {
                getLstCliente();
                message.success(res?.mensaje);
            } else {
                message.error(res?.mensaje);
            }
        });
        
    }
    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            //width: '10%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.nombre.localeCompare(b.nombre),
            //fixed: 'left',
            ...BuscadorTabla('nombre'),
        },
        {
            title: 'Apellido',
            dataIndex: 'apellido',
            //fixed: 'left',
            //width: '10%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.apellido.localeCompare(b.apellido),
            ...BuscadorTabla('apellido'),
        },
        {
            title: 'Ruc o documento',
            dataIndex: 'documento',
            //fixed: 'left',
            //width: '10%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.documento.localeCompare(b.documento),
            ...BuscadorTabla('documento'),
        },
  
        {
            title: 'Dirección',
            dataIndex: 'direccion',
            //width: '15%',
            editable: true,
            ...BuscadorTabla('direccion'),
        },
        {
            title: 'Telefono',
            dataIndex: 'telefono',
            //width: '15%',
            editable: true,
            ...BuscadorTabla('telefono'),
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            //width: '7%',
            editable: true,
            render: (_, { estado, idcliente }) => {
                let color = 'black';
                if (estado.toUpperCase() === 'AC') { color = 'green' }
                else { color = 'volcano'; }
                return (
                    <Tag color={color} key={idcliente} >
                        {estado.toUpperCase() === 'AC' ? 'Activo' : 'Inactivo'}
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
                            onClick={() => save(record.idcliente)}
                            style={{
                                marginRight: 8,
                            }} >
                            Guardar
                        </Typography.Link>
                        <br />
                        <Popconfirm title="Desea cancelar?" onConfirm={cancel}>
                            <a href='/'>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <Typography.Link style={{ margin: `5px` }} disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Editar
                        </Typography.Link>

                        <Popconfirm
                            title="Desea anular este registro?"
                            onConfirm={() => confirmDel(record.idcliente)}
                            onCancel={cancel}
                            okText="Si"
                            cancelText="No" >
                            <Typography.Link >
                                Anular
                            </Typography.Link>
                        </Popconfirm>

                    </>
                );
            },
        }
    ]

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.idcliente);
    };


    const isEditing = (record) => record.idcliente === editingKey;

    const cancel = () => {
        setEditingKey('');
    };

    const confirmDel = (idcliente) => {
        handleDelete(idcliente);
    };

    const save = async (idcliente) => {

        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => idcliente === item.idcliente);

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
        <>
            <Titulos text={`LISTA DE CLIENTES`} level={3}></Titulos>
            <div style={{ marginBottom: `5px`, textAlign: `end` }}>
                <Button type="primary" onClick={() => navigate('/crearcliente')} >{<PlusOutlined />} Nuevo</Button>
            </div>
            <TableModel token={token} mergedColumns={mergedColumns} data={data} form={form} keyExtraido={'idcliente'} varx={1000} />
        </>
    )
}

export default React.memo(ListaCliente);

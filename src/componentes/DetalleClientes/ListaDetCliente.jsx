import React, { useState, useEffect } from 'react'
import { Popconfirm, Typography, Form, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { deletePerfilHasCliente, getDetalleClientes, updatePcc } from '../../services/PerfilHasCliente';
import { Titulos } from '../Utils/Titulos';
import { BuscadorTabla } from '../Utils/Buscador/BuscadorTabla';
import TableModelExpand from '../Utils/TableModel/TableModelExpand';

function DetalleCliente({ token }) {

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getLstPerfilHasCliente();
        // eslint-disable-next-line
    }, []);

    const getLstPerfilHasCliente = async () => {
        let array = []; 
        if (data.length <= 0) {
            const res = await getDetalleClientes({ token: token });
            console.log(res?.body)
            res?.body?.map((data) => {
                data.idcliente = data?.cliente?.idcliente;
                data.idperfil_cli_cab = data?.perfil_has_clientes[0]?.idperfil_cli_cab;
                data.nombres = data?.cliente?.nombre+' '+data?.cliente?.apellido;
                data.documento = data?.cliente?.documento;
                array.push(data)
                return true;
            })
            console.log(array);
            setData(array);
        }

    }

    const handleDelete = async (id) => {
        //await deletePerfilHasCliente({token:token,param:id})
        await deletePerfilHasCliente({ token: token, param: id }).then((res) => {
            if (res?.estado !== 'error') {
                getLstPerfilHasCliente();
                message.warning('Registro anulado');
            } else {
                message.error(res?.mensaje);
            }
        });
    }

    const columns = [
        {
            title: 'Cliente',
            dataIndex: 'nombres',
            //width: '10%',
            editable: false,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.nombres.localeCompare(b.nombres),
            //fixed: 'left',
            ...BuscadorTabla('nombres'),
        },
        {
            title: 'Ruc o documento',
            dataIndex: 'documento',
            //fixed: 'left',
            //width: '10%',
            editable: false,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.documento.localeCompare(b.documento),
            ...BuscadorTabla('documento'),
        },
        {
            title: 'Monto',
            dataIndex: 'costo_total',
            //fixed: 'left',
            //width: '10%',
            editable: true,
        },
        {
            title: 'Fecha pago',
            dataIndex: 'fecha_pago',
            //fixed: 'left',
            //width: '10%',
            editable: true,
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            //width: '7%',
            editable: false,
        },
        {
            title: 'Acción',
            dataIndex: 'operacion',
            render: (_, record) => {

                const editable = isEditing(record);

                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.idperfil_cli_cab)}
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
                    </>
                );
            },
        }
    ]

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        //console.log(record.idperfil_cli_cab)
        setEditingKey(record.idperfil_cli_cab);
    };

    const columnDet = [
        {
            title: 'Cuenta',
            dataIndex: 'cuenta',
            editable: false,
            render: (_, record) => {
                //console.log(record.perfil.descripcion)
                return record?.vw_perfil_cuentum?.cuenta;
            }
        },
        {
            title: 'Perfil',
            dataIndex: 'descripcion',
            editable: false,
            render: (_, record) => {
                //console.log(record.perfil.descripcion)
                return record?.vw_perfil_cuentum?.descripcion;
            }
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            editable: false,
            render: (_, {estado} ) => {
                return (
                    estado === 'AC' ? 'Activo' : 'Inactivo'
                );
            },
        },
        {
            title: 'Acción',
            dataIndex: 'operacion',
            render: (_, record) => {
                return  ( 
                <Popconfirm
                    title="Desea eliminar este registro?"
                    onConfirm={() => confirmDel(record.idperfil)}
                    onCancel={cancel}
                    okText="Si"
                    cancelText="No" >
                    <Typography.Link >
                        Eliminar
                    </Typography.Link>
                </Popconfirm>
                );
            },
        }
    ];


    const isEditing = (record) => record.idperfil_cli_cab === editingKey;

    const cancel = () => {
        setEditingKey('');
    };

    const confirmDel = (idperfil) => {
        handleDelete(idperfil);
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
    const save = async (idperfil_cli_cab) => {
        //console.log(idperfil_cli_cab)
        try {
            const row = await form.validateFields();
            const newData = [...data];
            console.log(newData)
            //console.log(idperfil_cli_cab)
            const index = newData.findIndex((item) => idperfil_cli_cab === item.idperfil_cli_cab);

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

    
    const handleUpdate = async (newData) => {
        await updatePcc({ token: token, param: newData.idperfil_cli_cab, json: newData }).then((res) => {
            if (res?.estado !== 'error') {
                getLstPerfilHasCliente();
                message.success(res?.mensaje);
            } else {
                message.error(res?.mensaje);
            }
        });
        
    }

    return (
        <>
            <Titulos text={`LISTA DE CLIENTES / PERFIL`} level={3}></Titulos>
            <div style={{ marginBottom: `5px`, textAlign: `end` }}>
                <Button type="primary" onClick={() => navigate('/crearperfil_has_cliente')} >{<PlusOutlined />} Nuevo</Button>
            </div>
            <TableModelExpand columnDet={columnDet} keyDet={'idperfil'} token={token} mergedColumns={mergedColumns} data={data} form={form} keyExtraido={'idcliente'} />
        </>
    )
}

export default React.memo(DetalleCliente);

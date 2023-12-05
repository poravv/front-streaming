import React, { useState, useEffect } from 'react'
import { Popconfirm, Typography, Form, message } from 'antd';
import TableModel from '../Utils/TableModel/TableModel';
import { getVwPagosPE, updatePagos } from '../../services/Pagos';
import { Titulos } from '../Utils/Titulos';
import { BuscadorTabla } from '../Utils/Buscador/BuscadorTabla'

function ListaPagosPe({ token }) {

    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    let fechaActual = new Date();
    const strFecha = fechaActual.getFullYear() + "-" + (fechaActual.getMonth() + 1) + "-" + fechaActual.getDate();

    useEffect(() => {
        getLstPagos();
        // eslint-disable-next-line
    }, []);

    const getLstPagos = async () => {
        if (data.length <= 0) {
            const res = await getVwPagosPE({ token: token });
            setData(res.body);
        }
    }

    const handleDelete = async (id) => {
        //await deletePagos({token:token,param:id})
        await updatePagos({ token: token, param: id, json: { estado: "AN" } }).then((res) => {
            if (res?.estado !== 'error') {
                getLstPagos();
                message.warning('Registro anulado');
            } else {
                message.error(res?.mensaje);
            }
        });
    }

    const handleUpdate = async (newData) => {
        await updatePagos({ token: token, param: newData.idpagos, json: newData }).then((res) => {
            if (res?.estado !== 'error') {
                getLstPagos();
                message.success(res?.mensaje);
            } else {
                message.error(res?.mensaje);
            }
        });

    }
    const columns = [
        {
            title: 'Fecha vencimiento',
            dataIndex: 'fecha_vencimiento',
            //width: '10%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.fecha_vencimiento.localeCompare(b.fecha_vencimiento),
            //fixed: 'left',
            ...BuscadorTabla('fecha_vencimiento'),
        },
        {
            title: 'Fecha pago',
            dataIndex: 'fecha_pago',
            //fixed: 'left',
            //width: '10%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.fecha_pago.localeCompare(b.fecha_pago),
            ...BuscadorTabla('fecha_pago'),
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            //width: '15%',
            editable: true,
            ...BuscadorTabla('nombre'),
        },
        {
            title: 'Apellido',
            dataIndex: 'apellido',
            //width: '15%',
            editable: true,
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
            title: 'Telefono',
            dataIndex: 'telefono',
            //width: '15%',
            editable: true,
            ...BuscadorTabla('telefono'),
        },
        {
            title: 'Monto',
            dataIndex: 'monto_total',
            //width: '15%',
            editable: true,
            ...BuscadorTabla('telefono'),
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            //width: '7%',
            editable: true,
        },
        {
            title: 'Acción',
            dataIndex: 'operacion',
            render: (_, record) => {

                const editable = isEditing(record);

                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.idpagos)}
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
                        <Popconfirm
                            title="Desea anular este registro?"
                            onConfirm={() => save(record.idpagos)}
                            onCancel={cancel}
                            okText="Si"
                            cancelText="No" >
                            <Typography.Link >
                                Procesar pago
                            </Typography.Link>
                        </Popconfirm>
                        <br />
                        <Popconfirm
                            title="Desea anular este registro?"
                            onConfirm={() => confirmDel(record.idpagos)}
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

    const isEditing = (record) => record.idpagos === editingKey;

    const cancel = () => {
        setEditingKey('');
    };

    const confirmDel = (idpagos) => {
        handleDelete(idpagos);
    };

    const save = async (idpagos) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => idpagos === item.idpagos);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                newData[index].fecha_pago = strFecha;
                newData[index].estado= 'PA';

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
            <Titulos text={`PAGOS`} level={3}></Titulos>
            <TableModel token={token} mergedColumns={mergedColumns} data={data} form={form} keyExtraido={'idpagos'} varx={1000} />
        </>
    )
}

export default React.memo(ListaPagosPe);

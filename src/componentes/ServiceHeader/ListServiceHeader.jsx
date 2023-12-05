import { useState, useEffect } from 'react'
import { Popconfirm, Typography, Form, Tag, message, Button } from 'antd';
import TableModel from '../Utils/TableModel/TableModel';
import { useNavigate } from "react-router-dom";
import { getAllServiceHeader, updateServiceHeader } from '../../services/service_header';
import { Titulos } from '../Utils/Titulos';
import { BuscadorTabla } from '../Utils/Buscador/BuscadorTabla'
import { Container } from 'react-bootstrap';

const ListServiceHeader = ({ token }) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        getLstServiceHeader();
        // eslint-disable-next-line
    }, []);


    const getLstServiceHeader = async () => {
        try {
            const res = await getAllServiceHeader({ token: token, param: 'get' });
            setData(res.body);
        } catch (e) {
            console.log(e);
        }
    }

    const handleDelete = async (id) => {
        await updateServiceHeader({ token: token, param: id, json: { state: "IN" } })
        getLstServiceHeader();
    }

    const handleUpdate = async (newData) => {
        await updateServiceHeader({ token: token, param: newData.idservice_header, json: newData }).then((res) => {
            console.log(res)
            if (res?.mensaje === 'error') {
                message.error(res?.detmensaje)
            } else {
                getLstServiceHeader();
                message.success(res?.detmensaje).then(() => {
                    // eslint-disable-next-line
                    ;window.location.href = window.location.href;;
                })
            }
        })

    }

    const columns = [
        {
            title: 'Título',
            dataIndex: 'title',
            //width: '22%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.title.localeCompare(b.title),
            ...BuscadorTabla('title'),
        },
        {
            title: 'Subtítulo',
            dataIndex: 'subtitle',
            //width: '22%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.subtitle.localeCompare(b.subtitle),
            ...BuscadorTabla('subtitle'),
        },
        {
            title: 'Estado',
            dataIndex: 'state',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.state.localeCompare(b.state),
            render: (_, { state, idservice_header }) => {
                let color = 'black';
                if (state.toUpperCase() === 'AC') { color = 'green' }
                else { color = 'volcano'; }
                return (
                    <Tag color={color} key={idservice_header} >
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
                            onClick={() => save(record.idservice_header)}
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
                        <Typography.Link style={{ margin: `5px` }} disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Editar
                        </Typography.Link>
                        <Popconfirm
                            title="Desea eliminar este registro?"
                            onConfirm={() => confirmDel(record.idservice_header)}
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

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.idservice_header);
    };


    const isEditing = (record) => record.idservice_header === editingKey;

    const cancel = (e) => {
        e.preventDefault()
        setEditingKey('');
    };

    const confirmDel = (idservice_header) => {
        message.success('Procesando');
        handleDelete(idservice_header);
    };

    const save = async (idservice_header) => {

        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => idservice_header === item.idservice_header);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                handleUpdate(newData[index]);
                setData(newData);
                setEditingKey('');
                //message.success('Registro actualizado');
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
        <div style={{ display: `flex` }}>
            <Container>
                <Titulos text={`TÍTULOS SERVICIO`} level={3}></Titulos>
                <div style={{ marginBottom: `5px`, textAlign: `end` }}>
                    <Button type="default" onClick={() => navigate('/nuevoserviceeheader')} > Nuevo</Button>
                    <Button style={{ marginLeft: `10px` }} type="default" onClick={() => navigate('/service')}>Lista de Servicios</Button>
                </div>
                <TableModel mergedColumns={mergedColumns} data={data} form={form} keyExtraido={'idservice_header'} varx={700} />
            </Container>

        </div>
    )
}
export default ListServiceHeader
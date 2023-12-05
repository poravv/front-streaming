import { useState, useEffect } from 'react'
import { Popconfirm, Typography, Form, Tag, message, Button } from 'antd';
import TableModel from '../Utils/TableModel/TableModel';
import { useNavigate } from "react-router-dom";
import { getAllFooterLabel, updateFooterLabel } from '../../services/footer_label';
import { Titulos } from '../Utils/Titulos';
import { BuscadorTabla } from '../Utils/Buscador/BuscadorTabla'
import { Container } from 'react-bootstrap';

const ListFooterLabel = ({ token }) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getLstFooterLabel();
        // eslint-disable-next-line
    }, []);


    const getLstFooterLabel = async () => {
        try {
            const res = await getAllFooterLabel({ token: token, param: 'get' });
            setData(res.body);
        } catch (e) {
            console.log(e);
        }
    }

    const handleDelete = async (id) => {
        await updateFooterLabel({ token: token, param: id, json: { state: "IN" } })
        getLstFooterLabel();
    }

    const handleUpdate = async (newData) => {
        await updateFooterLabel({ token: token, param: newData.idfooter_label, json: newData }).then((res) => {
            console.log(res)
            if (res?.mensaje === 'error') {
                message.error(res?.detmensaje)
            } else {
                getLstFooterLabel();
                message.success(res?.detmensaje).then(() => {
                    // eslint-disable-next-line
                    ;window.location.href = window.location.href;;
                })
            }
        })

    }

    const columns = [
        {
            description: 'Descripción',
            dataIndex: 'description',
            //width: '22%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.description.localeCompare(b.description),
            ...BuscadorTabla('description'),
        },
        {
            description: 'Href',
            dataIndex: 'href',
            //width: '22%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.href.localeCompare(b.href),
            ...BuscadorTabla('href'),
        },
        {
            description: 'Estado',
            dataIndex: 'state',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.state.localeCompare(b.state),
            render: (_, { state, idfooter_label }) => {
                let color = 'black';
                if (state.toUpperCase() === 'AC') { color = 'green' }
                else { color = 'volcano'; }
                return (
                    <Tag color={color} key={idfooter_label} >
                        {state.toUpperCase() === 'AC' ? 'Activo' : 'Inactivo'}
                    </Tag>
                );
            },
        },
        {
            description: 'Acción',
            dataIndex: 'operacion',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.idfooter_label)}
                            style={{
                                marginRight: 8,
                            }} >
                            Guardar
                        </Typography.Link>
                        <br />
                        <Popconfirm description="Desea cancelar?" onConfirm={cancel}>
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
                            description="Desea eliminar este registro?"
                            onConfirm={() => confirmDel(record.idfooter_label)}
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
        setEditingKey(record.idfooter_label);
    };


    const isEditing = (record) => record.idfooter_label === editingKey;

    const cancel = (e) => {
        e.preventDefault()
        setEditingKey('');
    };

    const confirmDel = (idfooter_label) => {
        message.success('Procesando');
        handleDelete(idfooter_label);
    };

    const save = async (idfooter_label) => {

        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => idfooter_label === item.idfooter_label);

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
                description: col.description,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div style={{ display: `flex` }}>
            <Container>
                <Titulos text={`TÍTULO PIE DE PÁGINA`} level={3}></Titulos>
                <div style={{ marginBottom: `5px`, textAlign: `end` }}>
                    <Button type="default" onClick={() => navigate('/nuevofooterlabel')} > Nuevo</Button>
                </div>
                <TableModel mergedColumns={mergedColumns} data={data} form={form} keyExtraido={'idfooter_label'} varx={700} />
            </Container>
        </div>
    )
}
export default ListFooterLabel
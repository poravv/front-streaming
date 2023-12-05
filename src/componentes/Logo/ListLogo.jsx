import { useState, useEffect } from 'react'
import { Popconfirm, Typography, Form, Tag, message, Button, Image } from 'antd';
import TableModel from '../Utils/TableModel/TableModel';
import { useNavigate } from "react-router-dom";
import { getAllLogo, updateLogo } from '../../services/logo';
import { Titulos } from '../Utils/Titulos';
import { Container } from 'react-bootstrap';
import { Buffer } from 'buffer';

const ListLogo = ({ token }) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getLstLogo();
        // eslint-disable-next-line
    }, []);


    const getLstLogo = async () => {
            const res = await getAllLogo({ token: token, param: 'get' });
            //console.log(res.body)
            setData(res.body);
    }

    const handleDelete = async (id) => {
        await updateLogo({ token: token, param: id, json: { state: "IN" } })
        getLstLogo();
    }

    const handleUpdate = async (newData) => {
        await updateLogo({ token: token, param: newData.idlogo, json: newData }).then((res) => {
            //console.log(res)
            if (res?.mensaje === 'error') {
                message.error(res?.detmensaje)
            } else {
                getLstLogo();
                message.success(res?.detmensaje).then(() => {
                    // eslint-disable-next-line
                    ; window.location.href = window.location.href;;
                })
            }
        })

    }

    const columns = [
        {
            title: 'Imagen',
            dataIndex: 'html_image',
            editable: true,
            render: (_, { html_image }) => {
                if (html_image && typeof html_image !== "string") {
                    //console.log(html_image);
                    const asciiTraducido = Buffer.from(html_image?.data).toString('ascii');
                    //const asciiTraducido = Buffer.from(html_image.data).toString();
                    //console.log(asciiTraducido);
                    if (asciiTraducido) {
                        return (
                            <Image
                                style={{ borderRadius: `4px`, width: `60px` }}
                                alt="imagen"
                                //preview={false}
                                //style={{ width: '50%',margin:`0px`,textAlign:`center` }}
                                src={asciiTraducido}
                            />
                        );
                    }
                }
            },
        },
        {
            title: 'Estado',
            dataIndex: 'state',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.state.localeCompare(b.state),
            render: (_, { state, idlogo }) => {
                let color = 'black';
                if (state.toUpperCase() === 'AC') { color = 'green' }
                else { color = 'volcano'; }
                return (
                    <Tag color={color} key={idlogo} >
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
                            onClick={() => save(record.idlogo,record.html_image)}
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
                            onConfirm={() => confirmDel(record.idlogo)}
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
        delete record.html_image;
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.idlogo);
    };


    const isEditing = (record) => record.idlogo === editingKey;

    const cancel = (e) => {
        e.preventDefault()
        setEditingKey('');
    };

    const confirmDel = (idlogo) => {
        message.success('Procesando');
        handleDelete(idlogo);
    };

    const save = async (idlogo,html_image) => {

        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => idlogo === item.idlogo);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                
                if (idlogo === item.idlogo) {
                    //console.log('Entra en asignacion',record.img);
                    newData[index].html_image = html_image;
                }

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
                <Titulos text={`LOGOS`} level={3}></Titulos>
                <div style={{ marginBottom: `5px`, textAlign: `end` }}>
                    <Button type="default" onClick={() => navigate('/nuevologo')} > Nuevo</Button>
                </div>
                <TableModel mergedColumns={mergedColumns} data={data} form={form} keyExtraido={'idlogo'} varx={350} />
            </Container>
        </div>
    )
}
export default ListLogo
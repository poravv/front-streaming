import { useState, useEffect } from 'react'
import { Popconfirm, Typography, Form, Tag, message, Button, Image } from 'antd';
import TableModel from '../Utils/TableModel/TableModel';
import { useNavigate } from "react-router-dom";
import { getAllAbout, updateAbout } from '../../services/about';
import { Titulos } from '../Utils/Titulos';
import { BuscadorTabla } from '../Utils/Buscador/BuscadorTabla'
import { Container } from 'react-bootstrap';
import { Buffer } from 'buffer';

const ListAbout = ({ token }) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        getLstAbout();
        // eslint-disable-next-line
    }, []);


    const getLstAbout = async () => {
        try {
            const res = await getAllAbout({ token: token, param: 'get' });
            setData(res.body);
        } catch (e) {
            console.log(e);
        }
    }

    const handleDelete = async (id) => {
        await updateAbout({ token: token, param: id, json: { state: "IN" } })
        getLstAbout();
    }

    const handleUpdate = async (newData) => {
        await updateAbout({ token: token, param: newData.idabout, json: newData }).then((res) => {
            console.log(res)
            if (res?.mensaje === 'error') {
                message.error(res?.detmensaje)
            } else {
                getLstAbout();
                message.success(res?.detmensaje).then(() => {
                    // eslint-disable-next-line
                    ;window.location.href = window.location.href;;
                })
            }
        })
    }

    const hexString = (color) => {
        if(typeof color === 'string'){
            return color
        }else{
            return color.toHexString()
        }
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
            title: 'Descripción',
            dataIndex: 'description',
            //width: '22%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.description.localeCompare(b.description),
            ...BuscadorTabla('description'),
        },
        {
            title: 'Color de fondo',
            dataIndex: 'about_background',
            //width: '22%',
            editable: true,
            color:true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.description.localeCompare(b.description),
            ...BuscadorTabla('description'),
        },
        {
            title: 'Imagen',
            dataIndex: 'html_image',
            //width: '22%',
            editable: true,
            render: (_, { html_image }) => {
                if (html_image && typeof html_image !== "string") {
                    const asciiTraducido = Buffer.from(html_image?.data).toString('ascii');
                    if (asciiTraducido) {
                        return (
                            <Image
                                style={{ borderRadius: `4px`, width: `70px` }}
                                alt="imagen"
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
            render: (_, { state, idabout }) => {
                let color = 'black';
                if (state.toUpperCase() === 'AC') { color = 'green' }
                else { color = 'volcano'; }
                return (
                    <Tag color={color} key={idabout} >
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
                            onClick={() => save(record.idabout,record.html_image)}
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
                            onConfirm={() => confirmDel(record.idabout)}
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
        setEditingKey(record.idabout);
    };


    const isEditing = (record) => record.idabout === editingKey;

    const cancel = (e) => {
        e.preventDefault()
        setEditingKey('');
    };

    const confirmDel = (idabout) => {
        message.success('Procesando');
        handleDelete(idabout);
    };

    const save = async (idabout,html_image) => {

        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => idabout === item.idabout);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                if (idabout === item.idabout) {
                    //console.log('Entra en asignacion',record.img);
                    newData[index].html_image = html_image;
                    newData[index].about_background=hexString(newData[index].about_background);
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
        if(col.color){
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    inputType: 'ColorPicker',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                }),
            };
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
                <Titulos text={`NOSOTROS`} level={3}></Titulos>
                <div style={{ marginBottom: `5px`, textAlign: `end` }}>
                    <Button type="default" onClick={() => navigate('/nuevoabout')} > Nuevo</Button>
                </div>
                <TableModel mergedColumns={mergedColumns} data={data} form={form} keyExtraido={'idabout'} varx={1000} />
            </Container>
        </div>
    )
}
export default ListAbout
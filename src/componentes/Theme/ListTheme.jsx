import { useState, useEffect } from 'react'
import { Popconfirm, Typography, Form, Tag, message, Button } from 'antd';
import TableModel from '../Utils/TableModel/TableModel';
import { useNavigate } from "react-router-dom";
import { getTheme, updateTheme } from '../../services/theme';
import { Titulos } from '../Utils/Titulos';
import { BuscadorTabla } from '../Utils/Buscador/BuscadorTabla'
import { Container } from 'react-bootstrap';

const ListTheme = ({ token }) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        getLstTheme();
        // eslint-disable-next-line
    }, []);


    const getLstTheme = async () => {
        try {
            const res = await getTheme({ token: token, param: 'get' });
            setData(res.body);
        } catch (e) {
            console.log(e);
        }
    }

    const handleDelete = async (id) => {
        await updateTheme({ token: token, param: id, json: { state: "IN" } })
        getLstTheme();
    }

    const handleUpdate = async (newData) => {
        await updateTheme({ token: token, param: newData.idtheme, json: newData }).then((res) => {
            //console.log(res)
            if (res?.mensaje === 'error') {
                message.error(res?.detmensaje)
            } else {
                getLstTheme();
                message.success(res?.detmensaje).then(() => {
                    // eslint-disable-next-line
                    ;window.location.href = window.location.href;;
                })
            }
        })

    }

    const columns = [
        {
            title: 'Color de navbar',
            dataIndex: 'header_color',
            //width: '22%',
            editable: true,
            color:true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.header_color.localeCompare(b.header_color),
            ...BuscadorTabla('header_color'),
        },
        {
            title: 'Color de navbar 2',
            dataIndex: 'header_color2',
            //width: '22%',
            editable: true,
            color:true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.header_color2.localeCompare(b.header_color2),
            ...BuscadorTabla('header_color2'),
        },
        {
            title: 'Color de texto navbar',
            dataIndex: 'header_title_color',
            //width: '22%',
            editable: true,
            color:true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.header_title_color.localeCompare(b.header_title_color),
            ...BuscadorTabla('header_title_color'),
        },
        {
            title: 'Fondo de paginas',
            dataIndex: 'content_background_color',
            //width: '22%',
            editable: true,
            color:true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.content_background_color.localeCompare(b.content_background_color),
            ...BuscadorTabla('content_background_color'),
        },
        {
            title: 'Fondo de pie de pagina 1',
            dataIndex: 'footer_background_color1',
            //width: '22%',
            editable: true,
            color:true,
        },
        {
            title: 'Fondo de pie de pagina 2',
            dataIndex: 'footer_background_color2',
            //width: '22%',
            editable: true,
            color:true,
        },
        {
            title: 'Color de titulo de pie',
            dataIndex: 'footer_title_color',
            //width: '22%',
            editable: true,
            color:true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.footer_title_color.localeCompare(b.footer_title_color),
            ...BuscadorTabla('footer_title_color'),
        },
        {
            title: 'Color de iconos de pie',
            dataIndex: 'footer_icon_color',
            //width: '22%',
            editable: true,
            color:true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.footer_icon_color.localeCompare(b.footer_icon_color),
            ...BuscadorTabla('footer_icon_color'),
        },
        {
            title: 'Color de titulo de contenido',
            dataIndex: 'content_title_color',
            //width: '22%',
            editable: true,
            color:true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.content_title_color.localeCompare(b.content_title_color),
            ...BuscadorTabla('content_title_color'),
        },
        {
            title: 'Color de subtitulo de contenido',
            dataIndex: 'content_subtitle_color',
            //width: '22%',
            editable: true,
            color:true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.content_subtitle_color.localeCompare(b.content_subtitle_color),
            ...BuscadorTabla('content_subtitle_color'),
        },
        {
            title: 'Color de descripción de contenido',
            dataIndex: 'content_description_color',
            //width: '22%',
            editable: true,
            color:true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.content_description_color.localeCompare(b.content_description_color),
            ...BuscadorTabla('content_description_color'),
        },
        {
            title: 'Color de botón de contenido',
            dataIndex: 'content_button_color',
            //width: '22%',
            editable: true,
            color:true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.content_button_color.localeCompare(b.content_button_color),
            ...BuscadorTabla('content_button_color'),
        },
        {
            title: 'Color de texto de boton de contenido',
            dataIndex: 'button_text_color',
            //width: '22%',
            editable: true,
            color:true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.button_text_color.localeCompare(b.button_text_color),
            ...BuscadorTabla('button_text_color'),
        },
        
        {
            title: 'Estado',
            dataIndex: 'state',
            editable: true,
            color:false,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.state.localeCompare(b.state),
            render: (_, { state, idtheme }) => {
                let color = 'black';
                if (state.toUpperCase() === 'AC') { color = 'green' }
                else { color = 'volcano'; }
                return (
                    <Tag color={color} key={idtheme} >
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
                            onClick={() => save(record.idtheme)}
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
                            onConfirm={() => confirmDel(record.idtheme)}
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
        setEditingKey(record.idtheme);
    };


    const isEditing = (record) => record.idtheme === editingKey;

    const cancel = (e) => {
        e.preventDefault()
        setEditingKey('');
    };

    const confirmDel = (idtheme) => {
        message.success('Procesando');
        handleDelete(idtheme);
    };

    const hexString = (color) => {
        if(typeof color === 'string'){
            return color
        }else{
            return color.toHexString()
        }
    }

    const save = async (idtheme) => {

        try {
            const row = await form.validateFields();

            const newData = [...data];
            const index = newData.findIndex((item) => idtheme === item.idtheme);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });

                newData[index].header_color=hexString(newData[index].header_color);
                newData[index].header_color2=hexString(newData[index].header_color2);
                newData[index].header_title_color=hexString(newData[index].header_title_color);
                newData[index].content_background_color=hexString(newData[index].content_background_color);
                newData[index].footer_background_color1=hexString(newData[index].footer_background_color1);
                newData[index].footer_background_color2=hexString(newData[index].footer_background_color2);
                newData[index].footer_title_color=hexString(newData[index].footer_title_color);
                newData[index].footer_icon_color=hexString(newData[index].footer_icon_color);
                newData[index].content_title_color=hexString(newData[index].content_title_color);
                newData[index].content_subtitle_color=hexString(newData[index].content_subtitle_color);
                newData[index].content_description_color=hexString(newData[index].content_description_color);
                newData[index].content_button_color=hexString(newData[index].content_button_color);
                newData[index].button_text_color=hexString(newData[index].button_text_color);

                //console.log(newData[index])
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
                <Titulos text={`TEMA`} level={3}></Titulos>
                <div style={{ marginBottom: `5px`, textAlign: `end` }}>
                    <Button type="default" onClick={() => navigate('/nuevotema')} > Nuevo</Button>
                    <a rel="noreferrer" href='https://htmlcolorcodes.com/es/' target='_blank' >
                        <Button style={{ marginLeft:`10px` }} type="default"> Codigo color</Button>
                    </a>
                </div>
                <TableModel mergedColumns={mergedColumns} data={data} form={form} keyExtraido={'idtheme'} varx={1500} />
            </Container>

        </div>
    )
}
export default ListTheme
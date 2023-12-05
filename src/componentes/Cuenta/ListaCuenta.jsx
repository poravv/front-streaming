import { useState,useEffect } from 'react'
import { Popconfirm, Typography } from 'antd';
import { Form } from 'antd';
import TableModelExpand from '../Utils/TableModel/TableModelExpand';
import { Tag } from 'antd';
import { message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";
import { getCuenta, updateCuenta } from '../../services/Cuenta';
import {Titulos} from '../Utils/Titulos';
import { RiFileExcel2Line } from "react-icons/ri";
import { handleExport } from '../Utils/ExportXLS'
import {BuscadorTabla}  from '../Utils/Buscador/BuscadorTabla';

const ListaCuenta = ({ token }) => {
    const [form] = Form.useForm();
    const [cuenta, setCuenta] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getLstCuenta();
        // eslint-disable-next-line
    }, []);

    const getLstCuenta = async () => {        
        const res = await getCuenta({token:token,param:'get'});
        console.log(res.body)
        setCuenta(res.body);
    }

    const borrarCuenta = async (id) => {
        await updateCuenta({ token: token, param: id, json: { estado: "IN" } })
        getLstCuenta();
        message.success('Procesando');
    }
    
    const columns = [
        {
            title: 'Descripción',
            dataIndex: 'descripcion',
            //width: '20%',
            editable: true,
            ...BuscadorTabla('descripcion'),
        },
        {
            title: 'Contraseña',
            dataIndex: 'password',
            //width: '20%',
            editable: true,
        },
        {
             title: 'Estado',
             dataIndex: 'estado',
             //width: '7%',
             editable: true,
             render: (_, { estado, idcuenta }) => {
                 let color = 'black';
                 if (estado.toUpperCase() === 'AC') { color = 'green' }
                 else { color = 'volcano'; }
                 return (
                     <Tag color={color} key={idcuenta} >
                         {estado.toUpperCase() === 'AC' ? 'Activo' : 'Inactivo'}
                     </Tag>
                 );
             },
         },
        {
            title: 'Acción',
            dataIndex: 'operacion',
            render: (_, record) => {
                return <>
                <Popconfirm
                    title="Desea eliminar este registro?"
                    onConfirm={() => confirmDel(record.idcuenta)}
                    onCancel={cancel}
                    okText="Si"
                    cancelText="No" >
                    <Typography.Link >
                        Eliminar
                    </Typography.Link>
                </Popconfirm>
            </>;
            },
        }
    ];

    const columnDet = [
        {
            title: 'Perfil',
            dataIndex: 'descripcion',
            
        },
        {
            title: 'Contraseña',
            dataIndex: 'password',
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            editable: true,
            render: (_, {estado} ) => {
                return (
                    estado === 'AC' ? 'Activo' : 'Inactivo'
                );
            },
        },
    ];

    const isEditing = (record) => record.idcuenta === editingKey;

    const cancel = () => {
        setEditingKey('');
    };

    const confirmDel = (idcuenta) => {
        borrarCuenta(idcuenta);
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
            <Titulos text={`CUENTAS`} level={3}></Titulos>
            <div style={{ marginBottom: `5px`, textAlign: `end` }}>
                <Button type="primary" onClick={() => navigate('/crearcuenta')} >{<PlusOutlined />} Nuevo</Button>
                <Button type='primary' style={{ backgroundColor: `#08AF17`, margin: `2px` }}  ><RiFileExcel2Line onClick={() => handleExport({ data: cuenta, title: 'LISTA DE CUENTAS' })} size={20} /></Button>
            </div>
            <TableModelExpand columnDet={columnDet} keyDet={'idperfil'} token={token} mergedColumns={mergedColumns} data={cuenta} form={form} keyExtraido={'idcuenta'} />
        </>
    )
}
export default ListaCuenta;
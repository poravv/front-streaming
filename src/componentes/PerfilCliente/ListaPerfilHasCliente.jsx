import React, { useState, useEffect } from 'react'
import {Form, Button } from 'antd';
import TableModel from '../Utils/TableModel/TableModel';
import { handleExport } from '../Utils/ExportXLS'
import { RiFileExcel2Line } from "react-icons/ri";
import { getVwPerfilHasCliente } from '../../services/PerfilHasCliente';
import { Titulos } from '../Utils/Titulos';
import { BuscadorTabla } from '../Utils/Buscador/BuscadorTabla';
function PerfilHasPerfilHasCliente({ token }) {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    useEffect(() => {
        getLstPerfilHasCliente();
        // eslint-disable-next-line
    }, []);

    const getLstPerfilHasCliente = async () => {
        if (data.length <= 0) {
            const res = await getVwPerfilHasCliente({ token: token });
            setData(res.body);
        }
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
       /*
        {
            title: 'Monto',
            dataIndex: 'costo_total',
            //fixed: 'left',
            //width: '10%',
            editable: true,
        },
        */
        {
            title: 'Cuenta',
            dataIndex: 'cuenta',
            //fixed: 'left',
            //width: '10%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.cuenta.localeCompare(b.cuenta),
            ...BuscadorTabla('cuenta'),
        },
        {
            title: 'Perfil',
            dataIndex: 'perfil',
            //fixed: 'left',
            //width: '10%',
            editable: true,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.perfil.localeCompare(b.perfil),
            ...BuscadorTabla('perfil'),
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
            dataIndex: 'estado_perfil',
            //width: '7%',
            editable: true,
        },
    ]

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
            }),
        };
    });

    return (
        <>
            <Titulos text={`LISTA DE CLIENTES / PERFIL`} level={3}></Titulos>
            <div style={{ marginBottom: `5px`, textAlign: `end` }}>
                <Button type='primary' style={{ backgroundColor: `#08AF17`, margin: `2px` }}  ><RiFileExcel2Line onClick={() => handleExport({ data: data, title: 'PERFIL CLIENTES' })} size={20} /></Button>
            </div>
            <TableModel token={token} mergedColumns={mergedColumns} data={data} form={form} keyExtraido={'idperfil'} varx={1000} />
        </>
    )
}

export default React.memo(PerfilHasPerfilHasCliente);

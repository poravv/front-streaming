import React, { useState, useEffect } from 'react'
import { Button, Form } from 'antd';
import TableModel from '../Utils/TableModel/TableModel';
import { getVwPagos } from '../../services/Pagos';
import { Titulos } from '../Utils/Titulos';
import { BuscadorTabla } from '../Utils/Buscador/BuscadorTabla'
import { handleExport } from '../Utils/ExportXLS'
import { RiFileExcel2Line } from "react-icons/ri";

function ListaPagos({ token }) {

    const [form] = Form.useForm();
    const [data, setData] = useState([]);

    useEffect(() => {
        getLstPagos();
        // eslint-disable-next-line
    }, []);

    const getLstPagos = async () => {
        if (data.length <= 0) {
            const res = await getVwPagos({ token: token });
            setData(res.body);
        }
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
            <Titulos text={`PAGOS`} level={3}></Titulos>
            <div style={{ marginBottom: `5px`, textAlign: `end` }}>
                <Button type='primary' style={{ backgroundColor: `#08AF17`, margin: `2px` }}  ><RiFileExcel2Line onClick={() => handleExport({ data: data, title: 'LISTA DE PAGOS' })} size={20} /></Button>
            </div>
            <TableModel token={token} mergedColumns={mergedColumns} data={data} form={form} keyExtraido={'idpagos'} varx={1000} />
        </>
    )
}

export default React.memo(ListaPagos);

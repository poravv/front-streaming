import { Form, Input, InputNumber, Table, Select, Spin, ColorPicker } from 'antd';
import { getIcon } from '../../../services/icon';
import { useEffect, useState } from 'react';
import UploadFile from '../Upload';
import { Buffer } from 'buffer';

const { Option } = Select;
function TableModel({ token, form, data, mergedColumns, keyExtraido, varx }) {
  const [icons, setIcons] = useState([]);
  const [formatHex, setFormatHex] = useState('hex');
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    getLstIcon();
    // eslint-disable-next-line
  }, []);

  const getLstIcon = async () => {
    try {
      const res = await getIcon({ token: token, param: 'get' });
      setIcons(res.body);
    } catch (e) {
      console.log(e);
    }
  }

  const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {

    const inputNode = inputType === 'number' ? <InputNumber /> : inputType === 'ColorPicker' ? <ColorPicker showText format={formatHex} onFormatChange={setFormatHex} /> : <Input />;
    switch (dataIndex) {
      case 'state':
        return (
          <td {...restProps}>
            {
              editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0, }} rules={[{ required: true, message: `Por favor complete ${title}!`, },]} >
                  <Select allowClear >
                    <Option value="AC">Activo</Option>
                    <Option value="IN">Inactivo</Option>
                  </Select>
                </Form.Item>
              ) : (children)
            }
          </td>);
      case 'tipo':
        return (
          <td {...restProps}>
            {
              editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0, }} rules={[{ required: true, message: `Por favor complete ${title}!`, },]} >
                  <Select allowClear >
                    <Option value="serv">Servicio</Option>
                    <Option value="prod">Producto</Option>
                  </Select>
                </Form.Item>
              ) : (children)
            }
          </td>);
      case 'html_image':
        return (
          <td {...restProps}>
            {
              editing ?
                <Form.Item name={dataIndex} style={{ margin: 0, }}  >
                  <UploadFile previewImage={previewImage} setPreviewImage={setPreviewImage} >
                    { //Aqui la logica de si actualiza o no las imagenes del formulario
                      (previewImage !== '' && previewImage != null) ?
                        record.html_image = previewImage :
                        record.html_image ?
                          record.html_image = Buffer.from(record.html_image).toString('ascii') :
                          null}
                  </UploadFile>
                </Form.Item>
                : (children)
            }
          </td>);
      case 'destacado':
        return (
          <td {...restProps}>
            {
              editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0, }} rules={[{ required: true, message: `Por favor complete ${title}!`, },]} >
                  <Select allowClear > <Option value="Si">Si</Option> <Option value="No">No</Option> </Select>
                </Form.Item>
              ) : (children)
            }
          </td>);
      case 'description':
        return (
          <td {...restProps}>
            {
              editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0, }} rules={[{ required: true, message: `Por favor complete ${title}!`, },]} >
                  <Input.TextArea />
                </Form.Item>
              ) : (children)
            }
          </td>);
      case 'idicon':
        return (
          <td {...restProps}>
            {
              editing ?
                <Form.Item name={dataIndex} style={{ margin: 0, }} rules={[{ required: true, message: `Por favor complete ${title}!`, },]} >
                  <Select allowClear style={{ minWidth: `100px` }}>
                    {icons?.map((row) => (
                      <Option key={row.idicon} value={row?.idicon.toString()}><i className={`${row?.icon}`} /></Option>
                    ))}
                  </Select>
                </Form.Item>
                : (children)
            }
          </td>);
      case 'subtitle':
        return (
          <td {...restProps}>
            {
              editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0, }} rules={[{ required: true, message: `Por favor complete ${title}!`, },]} >
                  <Input.TextArea />
                </Form.Item>
              ) : (children)
            }
          </td>);
      //break;
      default:
        return (
          <td {...restProps}>
            {
              editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0, }} rules={[{ required: true, message: `Por favor complete ${title}!`, },]} >
                  {inputNode}
                </Form.Item>
              ) : (children)
            }
          </td>);
    }
  };

  return (
    <>
      {
        data ? <Form form={form} component={false}
        >

          <Table
            rowKey={keyExtraido}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            scroll={{
              //x: (varx ?? 100),
              x: `calc(${varx ?? 600}px + 60%)`,
              y: 300,
            }}
            //pagination={{onChange: setCantidadRow,pageSize: 50,}}
            showSorterTooltip={{ title: 'Clic para ordenar' }}
          />
        </Form> :
          <section style={{ textAlign: `center`, margin: `10px` }}>
            <Spin />
          </section>
      }
    </>
  );
};
export default TableModel;
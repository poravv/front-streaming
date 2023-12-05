
import { Select } from 'antd';

function Buscador({ data, label, value, dataIndex, title, onChange, onSearch, selected }) {
    //console.log(data)
    return (
        
            <Select
                showSearch
                allowClear
                placeholder={
                    title === 'Documento' ? `Escriba ${title}` : `Seleccione ${title}`
                }
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                    (option?.razon_social ??
                        option?.cuenta_perfil??
                        option?.descripcion ??
                        option.documento ??
                        option.label ??
                        option?.nombres ??
                        option?.datos ??
                        option?.anho.toString() ??
                        option?.nombre ?? '').toLowerCase().includes(input.toLowerCase())
                }
                fieldNames={{
                    label: label, value: value,
                    options: data
                }}
                value={selected}
                options={data}
            />
    );
}

export default Buscador;
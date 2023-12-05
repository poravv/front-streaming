import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from '../componentes/Error';
import NavBar from './NavBar';
import Home from '../componentes/Home';
import Nosotros from '../componentes/Nosotros';
import Servicios from '../componentes/Servicios';
import { useEffect, useState } from 'react';
import { getWelcomeOne } from '../services/welcome';
import { getAbout } from '../services/about';
import { getThemeOne } from '../services/theme';
import { getServiceHeaderOne } from '../services/service_header';
import { getService } from '../services/service';
import { getFooterHeaderOne } from '../services/footer_header';
import { getFooterLabel } from '../services/footer_label';
import { getFooterIcon } from '../services/footer_icon';
import { getLogoOne } from '../services/logo';
import { getDestacadoHeaderServ,getDestacadoHeaderProd } from '../services/destacado_header';
import './Style.css';
import LoginForm from './LoginForm';
import NewTheme from '../componentes/Theme/NewTheme';
import ListTheme from '../componentes/Theme/ListTheme';
import ListIcon from '../componentes/Icons/ListIcons';
import NewIcon from '../componentes/Icons/NewIcon';
import ListFooterHeader from '../componentes/FooterHeader/ListFooterHeader';
import NewFooterHeader from '../componentes/FooterHeader/NewFooterHeader';
import ListServiceHeader from '../componentes/ServiceHeader/ListServiceHeader';
import NewServiceHeader from '../componentes/ServiceHeader/NewServiceHeader';
import ListService from '../componentes/Service/ListService';
import NewService from '../componentes/Service/NewService';
import ListWelcome from '../componentes/Welcome/ListWelcome';
import NewWelcome from '../componentes/Welcome/NewWelcome';
import ListDestacadoHeader from '../componentes/DestacadoHeader/ListDestacadoHeader';
import NewDestacadoHeader from '../componentes/DestacadoHeader/NewDestacadoHeader';
import ListFooterLabel from '../componentes/FooterLabel/ListFooterLabel';
import NewFooterLabel from '../componentes/FooterLabel/NewFooterLabel';
import NewAbout from '../componentes/About/NewAbout';
import ListAbout from '../componentes/About/ListAbout';
import ListFooterIcon from '../componentes/FooterIcon/ListFooterIcon';
import NewFooterIcon from '../componentes/FooterIcon/NewFooterIcon';
import ListProduct from '../componentes/Product/ListProduct';
import NewProduct from '../componentes/Product/NewProduct';
import NewProductHeader from '../componentes/ProductHeader/NewProductHeader';
import ListProductHeader from '../componentes/ProductHeader/ListProductHeader';
import { getProduct } from '../services/product';
import Productos from '../componentes/Productos';
import { getProductHeaderOne } from '../services/product_header';
import NewLogo from '../componentes/Logo/NewLogo';
import ListLogo from '../componentes/Logo/ListLogo';
import ListaCliente from '../componentes/Cliente/ListaCliente';
import NuevoCliente from '../componentes/Cliente/NuevoCliente';
import ListaCuenta from '../componentes/Cuenta/ListaCuenta';
import NuevaCuenta from '../componentes/Cuenta/NuevaCuenta';
import ListaTipoCuenta from '../componentes/TipoCuenta/ListaTipoCuenta';
import NuevoTipoCuenta from '../componentes/TipoCuenta/NuevoTipoCuenta';
import ListaPerfilHasCliente from '../componentes/PerfilCliente/ListaPerfilHasCliente';
import NuevaPerfilHasCliente from '../componentes/PerfilCliente/NuevaPerfilHasCliente';
import ListaDetCliente from '../componentes/DetalleClientes/ListaDetCliente';
import ListaPagos from '../componentes/Pagos/ListaPagos';
import ListaPagosPe from '../componentes/Pagos/ListaPagosPe';

function Navigator() {
    const loggedUser = window.localStorage.getItem('loginAppOnlinetine');
    const userJson = JSON.parse(loggedUser);
    const [welcome, setWelcome] = useState([]);
    const [nosotros, setNosotros] = useState([]);
    const [theme, setTheme] = useState([]);
    const [services, setServices] = useState([]);
    const [products, setProducts] = useState([]);
    const [destacados, setDestacados] = useState([]);
    const [prodDestacados, setProductsDestacados] = useState([]);
    const [serviceHeader, setServiceHeader] = useState([]);
    const [productHeader, setProductHeader] = useState([]);
    const [footerHeader, setFooterHeader] = useState([]);
    const [footerLabel, setFooterLabel] = useState([]);
    const [footerIcon, setFooterIcon] = useState([]);
    const [destacadoHeader, setDestacadoHeader] = useState([]);
    const [logo, setLogo] = useState([]);
    const [prodDestacadosHeader, setProductsDestacadosHeader] = useState([]);

    useEffect(() => {
        getWelcomeOne().then((data) => { setWelcome(data?.body) });
        getLogoOne().then((data) => { setLogo(data?.body) });
        getAbout().then((data) => { setNosotros(data?.body) });
        getThemeOne().then((data) => { setTheme(data?.body) });
        getService().then((data) => {
            let service = [];
            let destacados = []
            data?.body.map((d) => {
                if (d.destacado === 'Si') { destacados.push(d) }
                service.push(d);
                return true;
            });
            setServices(service);
            setDestacados(destacados);
        });
        getProduct().then((data) => {
            let producto = [];
            let destacados = []
            data?.body.map((d) => {
                if (d.destacado === 'Si') { destacados.push(d) }
                producto.push(d);
                return true;
            });
            setProducts(producto);
            setProductsDestacados(destacados);
            //console.log(destacados)
        });
        getServiceHeaderOne().then((data) => { setServiceHeader(data?.body) });
        getProductHeaderOne().then((data) => { setProductHeader(data?.body) });
        getFooterHeaderOne().then((data) => { setFooterHeader(data?.body) });
        getFooterLabel().then((data) => { setFooterLabel(data?.body) });
        getFooterIcon().then((data) => { setFooterIcon(data?.body) });
        getDestacadoHeaderServ().then((data) => { setDestacadoHeader(data?.body) });
        getDestacadoHeaderProd().then((data) => { setProductsDestacadosHeader(data?.body) });
        // eslint-disable-next-line
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<NavBar logo={logo} products={products} nosotros={nosotros} services={services} usuario={userJson?.body??null} theme={theme} footerHeader={footerHeader} footerLabel={footerLabel} footerIcon={footerIcon} />} >
                    <Route index element={<Home welcome={welcome} theme={theme} prodDestacadosHeader={prodDestacadosHeader} prodDestacados={prodDestacados} destacados={destacados} destacadoHeader={destacadoHeader}/>} />
                    <Route path='/inicio' element={<Home welcome={welcome} theme={theme} prodDestacadosHeader={prodDestacadosHeader} prodDestacados={prodDestacados}  destacados={destacados} destacadoHeader={destacadoHeader} />} />
                    <Route path='/nosotros' element={<Nosotros nosotros={nosotros} theme={theme} />} />
                    <Route path='/servicios' element={<Servicios theme={theme} serviceHeader={serviceHeader} services={services} />} />
                    <Route path='/tema' element={<ListTheme token={userJson?.token} />} />
                    <Route path='/nuevotema' element={<NewTheme token={userJson?.token} />} />
                    <Route path='/icono' element={<ListIcon token={userJson?.token} />} />
                    <Route path='/nuevoicono' element={<NewIcon token={userJson?.token} />} />
                    <Route path='/footerheader' element={<ListFooterHeader token={userJson?.token} />} />
                    <Route path='/nuevofooterheader' element={<NewFooterHeader token={userJson?.token} />} />
                    <Route path='/serviceheader' element={<ListServiceHeader token={userJson?.token} />} />
                    <Route path='/nuevoserviceheader' element={<NewServiceHeader token={userJson?.token} />} />
                    <Route path='/destacadoheader' element={<ListDestacadoHeader token={userJson?.token} />} />
                    <Route path='/nuevodestacadoheader' element={<NewDestacadoHeader token={userJson?.token} />} />
                    <Route path='/service' element={<ListService token={userJson?.token} />} />
                    <Route path='/nuevoservice' element={<NewService token={userJson?.token} />} />
                    <Route path='/welcome' element={<ListWelcome token={userJson?.token} />} />
                    <Route path='/nuevowelcome' element={<NewWelcome token={userJson?.token} />} />
                    <Route path='/footerlabel' element={<ListFooterLabel token={userJson?.token} />} />
                    <Route path='/nuevofooterlabel' element={<NewFooterLabel token={userJson?.token} />} />
                    <Route path='/about' element={<ListAbout token={userJson?.token} />} />
                    <Route path='/nuevoabout' element={<NewAbout token={userJson?.token} />} />
                    <Route path='/footericon' element={<ListFooterIcon token={userJson?.token} />} />
                    <Route path='/nuevofootericon' element={<NewFooterIcon token={userJson?.token} />} />
                    <Route path='/productos' element={<Productos theme={theme} productHeader={productHeader} products={products} />} />
                    <Route path='/product' element={<ListProduct token={userJson?.token} />} />
                    <Route path='/nuevoproduct' element={<NewProduct token={userJson?.token} />} />
                    <Route path='/productheader' element={<ListProductHeader token={userJson?.token} />} />
                    <Route path='/nuevoproductheader' element={<NewProductHeader token={userJson?.token} />} />
                    <Route path='/logos' element={<ListLogo token={userJson?.token} />} />
                    <Route path='/nuevologo' element={<NewLogo token={userJson?.token} />} />

                    <Route path='/cliente' element={<ListaCliente token={userJson?.token} />} />
                    <Route path='/crearcliente' element={<NuevoCliente token={userJson?.token} />} />
                    
                    <Route path='/cuenta' element={<ListaCuenta token={userJson?.token} />} />
                    <Route path='/crearcuenta' element={<NuevaCuenta token={userJson?.token} />} />
                    <Route path='/tipo_cuenta' element={<ListaTipoCuenta token={userJson?.token} />} />
                    <Route path='/creartipo_cuenta' element={<NuevoTipoCuenta token={userJson?.token} />} />

                    <Route path='/perfil_has_cliente' element={<ListaPerfilHasCliente token={userJson?.token} />} />
                    <Route path='/crearperfil_has_cliente' element={<NuevaPerfilHasCliente token={userJson?.token} />} />

                    <Route path='/detcliente' element={<ListaDetCliente token={userJson?.token} />} />
                    <Route path='/total_pagos' element={<ListaPagos token={userJson?.token} />} />
                    <Route path='/total_pagos_pe' element={<ListaPagosPe token={userJson?.token} />} />
                </Route>
                <Route path='/login' element={<LoginForm />} />
                <Route path='*' element={<Error replace to='/error' />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Navigator;

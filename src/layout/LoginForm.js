import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Login } from '../services/login'

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function navegacion(direccion) {
        navigate(direccion);
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        await Login({ email: email, password: password }).then((user) => {
            navegacion('/');
            // eslint-disable-next-line
            ;window.location.href = window.location.href;;
            
        }).catch((error) => {
            setEmail('');
            setPassword('');
            console.log(error)
        });
    };


    return (
        <div>
            <div className='login-wrap p-4 p-md-5 d-flex justify-content-center'>
                <form className="col-6" onSubmit={handleLoginSubmit}>
                <div className='d-flex justify-content-center text-primary'>
                    <h2 className="fw-bold mb-5">Login</h2>
                </div>
                    <div className="form-outline mb-4">
                        <input type="email" id="form2Example1" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required  />
                        <label className="form-label" htmlFor="form2Example1">Email</label>
                    </div>
                    <div className="form-outline mb-4">
                        <input type="password" id="form2Example2" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required  />
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">Acceder</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
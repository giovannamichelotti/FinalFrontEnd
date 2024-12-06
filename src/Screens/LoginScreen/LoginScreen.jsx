import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'


export const LoginScreen = () => {
    const [user, setUser] = useState({})
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)
    const [busy, setBusy] = useState(false)
    const navigate = useNavigate()

    const setName = (e) => {
        setUser((u) => ({...u, name: e.target.value}))
    }
    const setPass = (e) => {
        setUser((u) => ({...u, name: e.target.value}))
    }

    const login = (e) => {
        e.preventDefault()

        setMessage('')
        setBusy(true)

        //Llamada a la API
        const statusCode = 200

        if (statusCode === 401) {
            setMessage('Los datos ingresados son incorrectos')
            setError(true)
            setBusy(false)
            return
        }
        if (statusCode === 200) {
            const token = '1234'
            localStorage.setItem('accessToken', token)

            navigate('/contactos')
            return
        }

        setMessage('Hubo un error')
        setError(true)
        setBusy(false)
    }

    return (
        <div className="contenedor">
            <h1 className="sesion">Inicia sesion </h1>
            <fieldset disabled={busy}>
                <form className="form-screen" onSubmit={login}>
                    <div>
                        <label className="forms-label">Ingresa tu email:</label> <br/>
                        <input className="forms-input" placeholder='tuemail@gmail.com' value={user.name} onChange={setName}/>
                    </div>
                    <div>
                        <label className="forms-label">Ingresa tu contraseña:</label> <br/>
                        <input className="forms-input" value={user.pass} onChange={setPass}/>
                    </div>
                    <button className="forms-boton" type='submit'>Iniciar sesion</button> <br/>
                    <div>{message}</div>
                    <Link to='/recuperar-clave' className="forms-link">Olvidé mi contraseña</Link> <br/>
                    <Link to='/register' className="forms-link">No soy usuario</Link> <br/>
                </form>
            </fieldset>
        </div>
    )
}

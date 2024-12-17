import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import ENV from '../../../config/environment.js'


export const LoginScreen = () => {
    const [user, setUser] = useState({})
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)
    const [busy, setBusy] = useState(false)
    const navigate = useNavigate()

    const setEmail = (e) => {
        setUser((u) => ({...u, email: e.target.value}))
    }
    const setPass = (e) => {
        setUser((u) => ({...u, password: e.target.value}))
    }

    const login = async (e) => {
        e.preventDefault()

        setMessage('')
        setBusy(true)

        const url = ENV.API_URL + 'auth/login/'
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const statusCode = response.status

        if (statusCode === 401) {
            setMessage('Los datos ingresados son incorrectos')
            setError(true)
            setBusy(false)
            return
        }
        
        if (statusCode === 400) {
            const res = await response.json()
            setMessage(res.message)
            setError(true)
            setBusy(false)
            return
        }
        if (statusCode === 200) {
            const res = await response.json()
            localStorage.setItem('accessToken', res.data.token)
            localStorage.setItem('myPhone', res.data.phone)

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
                        <input className="forms-input" placeholder='tuemail@gmail.com' value={user.email} onChange={setEmail}/>
                    </div>
                    <div>
                        <label className="forms-label">Ingresa tu contraseña:</label> <br/>
                        <input className="forms-input" value={user.password} onChange={setPass}/>
                    </div>
                    <button className="forms-boton" type='submit'>Iniciar sesion</button> <br/>
                    {message && (<div className={error ? "error" : ""}>{message}</div>)}
                    <Link to='/recuperar-clave' className="forms-link">Olvidé mi contraseña</Link> <br/>
                    <Link to='/register' className="forms-link">No soy usuario</Link> <br/>
                </form>
            </fieldset>
        </div>
    )
}

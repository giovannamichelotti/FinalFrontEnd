import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import ENV from '../../../config/environment.js'
import './LoginScreen.css'


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
        try {
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

            if (statusCode === 200) {
                const res = await response.json()
                localStorage.setItem('accessToken', res.token)
                localStorage.setItem('myPhone', res.phone)

                navigate('/')
                return
            }

            const body = await response.json()
            let msg = 'Los datos ingresados son incorrectos'
            if (body.error) {
                msg = body.error
            }
            throw new Error(msg)
        }
        catch(err) {
            setMessage(err.message)
            setError(true)
            setBusy(false)
        }
    }

    return (
        <div className="pantalla-login">
            <div className="contenedor">
                <h1 className="sesion">Inicia sesion </h1>
                <fieldset disabled={busy}>
                    <form className="form-screen" onSubmit={login}>
                        <div>
                            <label className="forms-label">Ingresa tu email:</label> <br/>
                            <input type='email' className="forms-input" placeholder='tuemail@gmail.com' value={user.email} onChange={setEmail}/>
                        </div>
                        <div>
                            <label className="forms-label">Ingresa tu contraseña:</label> <br/>
                            <input type='password' className="forms-input" placeholder='************' value={user.password} onChange={setPass}/>
                        </div>
                        <button className="forms-boton" type='submit'>Iniciar sesion</button> <br/>
                        {message && (<div className={error ? "error" : ""}>{message}</div>)}
                        <Link to='/recover-password' className="forms-link">Olvidé mi contraseña</Link> <br/>
                        <Link to='/register' className="forms-link">No soy usuario</Link> <br/>
                    </form>
                </fieldset>
            </div>
        </div>
    )
}

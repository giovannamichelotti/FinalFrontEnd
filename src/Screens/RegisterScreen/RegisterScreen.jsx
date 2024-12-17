import React, { useState } from "react";
import { Link } from 'react-router-dom'
import ENV from '../../../config/environment.js'

export const RegisterScreen = () => {
    const [user, setUser] = useState({})
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)
    const [busy, setBusy] = useState(false)

    const setName = (e) => {
        setUser((u) => ({...u, name: e.target.value}))
    }
    const setEmail = (e) => {
        setUser((u) => ({...u, email: e.target.value}))
    }
    const setPhone = (e) => {
        setUser((u) => ({...u, phone: e.target.value}))
    }
    const setPass = (e) => {
        setUser((u) => ({...u, password: e.target.value}))
    }
    const register = async (e) => {
        e.preventDefault()
        
        setMessage('')
        setBusy(true)

        const url = ENV.API_URL + 'auth/register/'
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const statusCode = response.status

        if (statusCode === 204) {
            setMessage('El usuario ya está registrado')
            setError(true)
            setBusy(false)
            return
        }
        if (statusCode === 201) {
            setMessage('Recibirá un correo para validar su mail')
            setError(false)
            return
        }

        setMessage('Hubo un error')
        setError(true)
        setBusy(false)
    }
    
    return (
        <div>
            <h1>Registrate</h1>
            <fieldset disabled={busy}>
                <form onSubmit={register}>
                    <div>
                        <label>Ingresa tu nombre:</label>
                        <input placeholder='Nombre' value={user.name} onChange={setName}/>
                    </div>
                    <div>
                        <label>Ingresa tu email:</label>
                        <input placeholder='tuemail@gmail.com' value={user.email} onChange={setEmail}/>
                    </div>
                    <div>
                        <label>Ingresa tu telefono:</label>
                        <input placeholder='0123456789' value={user.phone} onChange={setPhone}/>
                    </div>
                    <div>
                        <label>Ingresa tu contraseña:</label>
                        <input value={user.password} onChange={setPass}/>
                    </div>
                    <button type='submit'>Registrar</button>
                    {message && (<div className={error ? "error" : ""}>{message}</div>)}
                    <Link to='/login'>Ya soy usuario</Link>
                </form>
            </fieldset>
        </div>
    )
}
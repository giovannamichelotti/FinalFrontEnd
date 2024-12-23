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
        try {
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

            const body = await response.json()
            let msg = 'Hubo un error'
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
                <h1>Registrate</h1>
                <fieldset disabled={busy}>
                    <form onSubmit={register}>
                        <div>
                            <label className="forms-label">Ingresa tu nombre:</label>
                            <input placeholder='Nombre' value={user.name} onChange={setName} className="forms-input"/>
                        </div>
                        <div>
                            <label className="forms-label">Ingresa tu email:</label>
                            <input type='email' placeholder='tuemail@gmail.com' value={user.email} onChange={setEmail} className="forms-input"/>
                        </div>
                        <div>
                            <label className="forms-label">Ingresa tu telefono:</label>
                            <input type='number' placeholder='1123456789' value={user.phone} onChange={setPhone} className="forms-input"/>
                        </div>
                        <div>
                            <label className="forms-label">Ingresa tu contraseña:</label>
                            <input type='password' placeholder="************" value={user.password} onChange={setPass} className="forms-input"/>
                        </div>
                        <button type='submit' className="forms-boton">Registrar</button> <br/>
                        {message && (<div className={error ? "error" : ""}>{message}</div>)}
                        <Link to='/login' className="forms-link">Ya soy usuario</Link>
                    </form>
                </fieldset>
            </div>
        </div>
    )
}
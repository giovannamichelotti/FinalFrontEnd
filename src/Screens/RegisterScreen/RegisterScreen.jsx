import React, { useState } from "react";
import { Link } from 'react-router-dom'

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
    const setPass = (e) => {
        setUser((u) => ({...u, pass: e.target.value}))
    }
    const register = (e) => {
        e.preventDefault()
        
        setMessage('')
        setBusy(true)

        // Llamada a la API
        const statusCode = 418

        if (statusCode === 204) {
            setMessage('El usuario ya está registrado')
            setError(true)
            setBusy(false)
            return
        }
        if (statusCode === 200) {
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
                        <label>Ingresa tu contraseña:</label>
                        <input value={user.pass} onChange={setPass}/>
                    </div>
                    <button type='submit'>Registrar</button>
                    <div>{message}</div>
                    <Link to='/login'>Ya soy usuario</Link>
                </form>
            </fieldset>
        </div>
    )
}
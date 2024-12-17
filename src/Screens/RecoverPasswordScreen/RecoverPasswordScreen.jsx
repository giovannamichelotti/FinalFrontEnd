import React, { useState } from "react";
import { Link } from 'react-router-dom'
import ENV from '../../../config/environment.js'

export const RecoverPasswordScreen = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)
    const [busy, setBusy] = useState(false)

    const recover = async (e) => {
        e.preventDefault()
        
        setMessage('')
        setBusy(true)

        const url = ENV.API_URL + 'auth/forgot-password/'
        const response = await fetch (url, {
            method: "POST",
            body: JSON.stringify({email: email}),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const statusCode = response.status

        if (statusCode === 401) {
            setMessage('El usuario no está registrado')
            setError(true)
            setBusy(false)
            return
        }
        if (statusCode === 200) {
            setMessage('Recibirá un correo para cambiar su contraseña')
            setError(false)
            return
        }

        setMessage('Hubo un error')
        setError(true)
        setBusy(false)
    }
    
    return (
        <div>
            <h1>Recuperar clave</h1>
            <fieldset disabled={busy}>
                <form onSubmit={recover}>
                    <div>
                        <label>Ingresa tu email:</label>
                        <input placeholder='tuemail@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <button type='submit'>Enviar</button>
                    {message && (<div className={error ? "error" : ""}>{message}</div>)}
                    <Link to='/login'>Iniciar sesión</Link>
                </form>
            </fieldset>
        </div>
    )
}
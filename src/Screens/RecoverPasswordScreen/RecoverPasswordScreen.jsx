import React, { useState } from "react";
import { Link } from 'react-router-dom'

export const RecoverPasswordScreen = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)
    const [busy, setBusy] = useState(false)

    const recover = (e) => {
        e.preventDefault()
        
        setMessage('')
        setBusy(true)

        // Llamada a la API
        const statusCode = 200

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
                    <div>{message}</div>
                    <Link to='/login'>Iniciar sesión</Link>
                </form>
            </fieldset>
        </div>
    )
}
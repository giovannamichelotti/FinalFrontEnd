import React, { useState } from "react";
import { Link } from 'react-router-dom'
import ENV from '../../../config/environment.js'

export const RecoverPasswordScreen = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)
    const [busy, setBusy] = useState(false)

    const recover = async (e) => {
        try {
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
                <h1>Recuperar clave</h1>
                <fieldset disabled={busy}>
                    <form onSubmit={recover}>
                        <div>
                            <label className="forms-label">Ingresa tu email:</label>
                            <input type='email' className="forms-input" placeholder='tuemail@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <button className="forms-boton" type='submit'>Enviar</button> <br/>
                        {message && (<div className={error ? "error" : ""}>{message}</div>)}
                        <Link to='/login' className="forms-link">Iniciar sesión</Link>
                    </form>
                </fieldset>
            </div>
        </div>
    )
}
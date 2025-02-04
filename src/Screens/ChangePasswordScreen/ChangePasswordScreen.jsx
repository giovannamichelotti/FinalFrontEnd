import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import ENV from '../../../config/environment.js'

export const ChangePasswordScreen = () => {
    const {token} = useParams()
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)
    const [busy, setBusy] = useState(false)
    const navigate = useNavigate()

    const changePass = async (e) => {
        try {
            e.preventDefault()

            setMessage('')
            setBusy(true)

            const url = ENV.API_URL + 'auth/reset-password/'
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify({
                    token: token,
                    password: pass,
                    password2: pass2
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const statusCode = response.status

            if (statusCode === 401) {
                setMessage('El token es invalido')
                setError(true)
                setBusy(false)
                return
            }
            if (statusCode === 400) {
                setMessage('Las claves no coinciden')
                setError(true)
                setBusy(false)
                return
            }
            if (statusCode === 200) {
                navigate('/login')
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
        <div className="contenedor">
            <h1 className="sesion">Cambiar clave</h1>
            <fieldset disabled={busy}>
                <form className="form-screen" onSubmit={changePass}>
                    <div>
                        <label className="forms-label">Ingresa tu contraseña:</label> <br/>
                        <input type='password' className="forms-input" value={pass} onChange={(e) => setPass(e.target.value)}/>
                    </div>
                    <div>
                        <label className="forms-label">Comprobá tu contraseña:</label> <br/>
                        <input type='password' className="forms-input" value={pass2} onChange={(e) => setPass2(e.target.value)}/>
                    </div>
                    <button className="forms-boton" type='submit'>Cambiar contraseña</button> <br/>
                    {message && (<div className={error ? "error" : ""}>{message}</div>)}
                </form>
            </fieldset>
        </div>
    )
}

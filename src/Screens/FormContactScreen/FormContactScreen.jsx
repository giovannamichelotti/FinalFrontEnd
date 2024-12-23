import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import ENV from '../../../config/environment.js'
import './FormContactScreen.css'

export const FormContactScreen = ({}) => {
    const navigate = useNavigate()
    const {contactoID} = useParams()
    const [contacto, setContacto] = useState ({})
    const [busy, setBusy] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)

    useEffect(() => {
        if (contactoID) {
            getContacto(contactoID)
        }
    }, []);

    const setName = (e) => {
        setContacto((u) => ({...u, name: e.target.value}))
    }
    const setPhone = (e) => {
        setContacto((u) => ({...u, phone: e.target.value}))
    }
    const setEmail = (e) => {
        setContacto((u) => ({...u, email: e.target.value}))
    }
    const setID = (id) => {
        setContacto((u) => ({...u, id: id}))
    }

    const getContacto = async (contactoID) => {
        setBusy(true)
        try{
            const url = ENV.API_URL + 'contacts/' + contactoID
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem('accessToken')
                }
            })
            const statusCode = response.status
            if (statusCode === 401) {
                navigate('/login')
                return
            }
            if (statusCode === 302) {
                const res = await response.json()
                setContacto(res.data)
                setBusy(false)
                return
            }
            navigate('/')
        }
        catch(error) {
            console.log(error)
            navigate('/')
        }
    }

    const saveContact = async (e) => {
        e.preventDefault()
        setBusy(true)
        try {
            const sufijo = contacto.id ? contacto.id : ''
            const metodo = contacto.id ? 'PUT' : 'POST'
            const url = ENV.API_URL + 'contacts/' + sufijo
            const response = await fetch(url, {
                method: metodo,
                body: JSON.stringify(contacto),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem('accessToken')
                }
            })
            const statusCode = response.status
            if (statusCode === 401) {
                navigate('/login')
                return
            } 
            if (statusCode === 200) {
                const res = await response.json()
                if (!contacto.id) {
                    setID(res.data.id)
                }
                setMessage('Contacto guardado')
                setError(false)
                setBusy(false)
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
                <Link className='form-volver' to={contacto && `/chat/` + contacto.id}><FaArrowLeft /></Link>
                <fieldset disabled={busy}>
                    <form onSubmit={saveContact}>
                        <div>
                            <label className="forms-label">Ingresa nombre:</label> <br/> 
                            <input className="forms-input" placeholder='Nombre' value={contacto.name} onChange={setName}/>
                        </div>
                        <div>
                            <label className="forms-label">Ingresa Email:</label> <br/>
                            <input type='email' className="forms-input" placeholder='Email' value={contacto.email} onChange={setEmail}/>
                        </div>
                        <div>
                            <label className="forms-label">Ingresa telefono:</label> <br/>
                            <input type='number' className="forms-input" placeholder='Telefono' value={contacto.phone} onChange={setPhone}/>
                        </div>
                        <button className="forms-boton" type='submit'>Guardar</button>
                    </form>
                </fieldset>
                {message && (<div className={error ? "error" : ""}>{message}</div>)}
            </div>
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import './FormContactScreen.css'
import { FaArrowLeft } from "react-icons/fa";
import ENV from '../../../config/environment.js'

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
            if (statusCode === 200) {
                const res = await response.json()
                setContacto(res.data)
                setBusy(false)
                return
            }
            navigate('/contactos')
        }
        catch(error) {
            console.log(error)
            navigate('/contactos')
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
                setID(res.data.id)
                setMessage('Contacto guardado')
                setError(false)
                setBusy(false)
                return
            }
            setMessage('Hubo un error')
            setError(true)
            setBusy(false)
        }
        catch(error) {
            setMessage('Hubo un error(2)')
            setError(true)
            setBusy(false)
            console.log(error)
        }
    }

    return (
        <div className='general'>
            <Link className='volver' to={contacto && `/chat/` + contacto.id}><FaArrowLeft /></Link>
            <fieldset disabled={busy}>
                <form onSubmit={saveContact}>
                    <div className='profile-nombre'>
                        <label>Ingresa nombre:</label>
                        <input placeholder='Nombre' value={contacto.name} onChange={setName}/>
                    </div>
                    <div className='profile-nombre'>
                        <label>Ingresa Email:</label>
                        <input placeholder='Email' value={contacto.email} onChange={setEmail}/>
                    </div>
                    <div className='profile-nro'>
                        <label>Ingresa telefono:</label>
                        <input placeholder='Telefono' value={contacto.phone} onChange={setPhone}/>
                    </div>
                    <button type='submit'>Guardar</button>
                </form>
            </fieldset>
            {message && (<div className={error ? "error" : ""}>{message}</div>)}
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { ChatHeaderInfo, ListaMensaje, MensajeForm } from '../../Components'
import ENV from "../../../config/environment.js"
import './ChatScreen.css'

export const ChatScreen = () => {
    const navigate = useNavigate()
    const {contactoID} = useParams()
    const [contacto, setContacto] = useState ({})
    const [mensajes, setMensajes] = useState ([])
    const [mensajesEncontrados, setMensajesEncontrados] = useState ([])
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)
    const [busy, setBusy] = useState(false)
    const [contactBusy, setContactBusy] = useState(false)

    useEffect(() => {
        getContacto(contactoID)
    }, []);
    
    const getContacto = async (contactoID) => {
        setContactBusy(true)
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
                getMensajes(res.data.phone)
                setContactBusy(false)
                return
            }
            navigate('/')
        }
        catch(error) {
            navigate('/')
        }
    }

    const getMensajes = async (phone) => {
        setBusy(true)
        setMessage('Buscando mensajes...')
        try {
            const url = ENV.API_URL + 'messages/' + phone
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
                setMensajes(res.data)
                setBusy(false)
                setMessage('')
                return
            }
            if (statusCode === 204) {
                setBusy(false)
                setMessage('')
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

    const enviarMensaje = async (mensaje) => {
        setBusy(true)
        try {
            const mensajeNuevo = {
                destination: contacto.phone,
                text: mensaje
            }
            const url = ENV.API_URL + 'messages/'
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(mensajeNuevo),
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
            if (statusCode === 201) {
                getMensajes(contacto.phone)
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

    const buscarMensajes = (texto) => {
        const mensajesEncontrados = mensajes.filter((item)=> item.texto.toLowerCase().includes(texto.toLowerCase()))
        setMensajesEncontrados(mensajesEncontrados)
    } 
    
    return (
        <div className='chat-screen'>
            <ChatHeaderInfo contacto={contacto} buscarMensajes={buscarMensajes} busy={contactBusy}/>
            <ListaMensaje mensajes={mensajes} mensajesEncontrados={mensajesEncontrados} mensaje={message} error={error}/>
            <MensajeForm mensajeEnviado={enviarMensaje} className='formulario-mensaje' busy={busy}/>
        </div>
    )
}

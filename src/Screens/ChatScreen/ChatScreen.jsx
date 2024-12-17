import React, { useEffect, useState } from 'react'
import { ChatHeaderInfo, ListaMensaje, MensajeForm } from '../../Components/Chat'
import { useParams, useNavigate } from "react-router-dom";
import './ChatScreen.css'
import ENV from "../../../config/environment.js"

/*
2. Agregar message, busy y error tal como teníamos en contactos dentro de ChatScreen en todas las llamadas a la API
3. Conectar el detalle del contacto con la API: ayuda es tomar como ejemplo lo que hicimos con el ChatScreen para traer los datos del contacto.
*/

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
            if (statusCode === 200) {
                const res = await response.json()
                setContacto(res.data)
                getMensajes(res.data.phone)
                setContactBusy(false)
                return
            }
            navigate('/contactos')
        }
        catch(error) {
            navigate('/contactos')
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
            setMessage('Hubo un error')
            setError(true)
            setBusy(false)
        }
        catch(error) {
            setMessage('Hubo un error(2)')
            setError(true)
            setBusy(false)
        }
    } 

    const enviarMensaje = async (mensaje) => {
        setBusy(true)
        try {
            const mensajeNuevo = {
                destination: contacto.phone,
                message: mensaje
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
            if (statusCode === 200) {
                getMensajes(contacto.phone)
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

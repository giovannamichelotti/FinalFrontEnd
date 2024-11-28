import React, { useEffect, useState } from 'react'
import { ChatHeaderInfo, ListaMensaje, MensajeForm } from '../../Components/Chat'
import { useParams } from "react-router-dom";
import MOOK_MENSAJES from '../../contactos.json'
import './ChatScreen.css'


export const ChatScreen = () => {
    const {contactoID} = useParams()
    const [contactos, setContactos] = useState([])
    const [contacto, setContacto] = useState ({})
    const [mensajes, setMensajes] = useState ([])
    const [mensajesEncontrados, setMensajesEncontrados] = useState ([])

    useEffect(() => {
        setContactos(MOOK_MENSAJES)
    }, []);
    
    useEffect(() => {
        const item = contactos.find(contacto => contacto.id === parseInt(contactoID) )
        setContacto(item);
        if (item) {
            const losMensajes = JSON.parse(localStorage.getItem(item.id)) || item.mensajes
            setMensajes(losMensajes)
        }
    }, [contactos]);

    const agregarMensaje = (mensaje) => {
        const mensajeNuevo = {
            autor: "yo",
            texto: mensaje,
            estado: "",
            dia: "hoy",
            hora: "23:07",
            id: mensajes.length + 1
        }
        const losMensajesNuevos = [...mensajes, mensajeNuevo]
        localStorage.setItem(contacto.id, JSON.stringify(losMensajesNuevos))
        setMensajes(losMensajesNuevos)
    }

    const buscarMensajes = (texto) => {
        const mensajesEncontrados = mensajes.filter((item)=> item.texto.toLowerCase().includes(texto.toLowerCase()))
        setMensajesEncontrados(mensajesEncontrados)
    } 
    
    return (
        <div className='chat-screen'>
            <ChatHeaderInfo contacto={contacto} buscarMensajes={buscarMensajes}/>
            <ListaMensaje mensajes={mensajes} mensajesEncontrados={mensajesEncontrados}/>
            <MensajeForm mensajeEnviado={agregarMensaje} className='formulario-mensaje'/>
        </div>
    )
}

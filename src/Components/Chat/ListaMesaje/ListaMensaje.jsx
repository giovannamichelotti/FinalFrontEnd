import React, { useEffect, useState } from 'react'
import './ListaMensaje.css'

export const ListaMensaje = ({mensajes, mensajesEncontrados, mensaje, error}) => {

const [myPhone, setMyPhone] = useState('')

useEffect(() => {
  setMyPhone(localStorage.getItem('myPhone'))
}, [])

const mensajeFueEncontrado = (mensajeId) => {
  return mensajesEncontrados.find(m => m.id == mensajeId)
}

  return (
    <div className='lista-mensaje'>
      {mensaje && (<div className={error ? 'error' : ''}>{mensaje}</div>)}
      {mensajes.map(mensaje => (
        <span 
          key={mensaje.id} 
          className={
            'mensaje ' + 
            (mensaje.origin_phone == myPhone ? 'mio' : 'otro') +
            (mensajeFueEncontrado(mensaje.id) ? ' encontrado' : '')
          }
        >
          <div className='mensaje-texto'>{mensaje.message}</div>
          <div className='mensaje-hora'>{mensaje.created_at}</div>
        </span>
      ))}
    </div>
  )   
}


/* Generar repo nuevo y hacer que la carpeta mensajeria sea ese repositorio */
import React from 'react'
import './ListaMensaje.css'

export const ListaMensaje = ({mensajes, mensajesEncontrados}) => {

const mensajeFueEncontrado = (mensajeId) => {
  return mensajesEncontrados.find(m => m.id == mensajeId)
}

  return (
    <div className='lista-mensaje'>
      {mensajes.map(mensaje => (
        <span 
          key={mensaje.id} 
          className={
            'mensaje ' + 
            (mensaje.autor === 'yo' ? 'mio' : 'otro') +
            (mensajeFueEncontrado(mensaje.id) ? ' encontrado' : '')
          }
        >
          <div className='mensaje-texto'>{mensaje.texto}</div>
          <div className='mensaje-hora'>{mensaje.hora}</div>
        </span>
      ))}
    </div>
  )   
}


/* Generar repo nuevo y hacer que la carpeta mensajeria sea ese repositorio */
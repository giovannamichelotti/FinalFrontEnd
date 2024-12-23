import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { FaRegFaceGrin } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import './MensajeForm.css'

export const MensajeForm = ({mensajeEnviado, busy}) => {
  const [mensaje, setMensaje] = useState ('')
  const cambiaMensaje = (e) => {
      setMensaje(e.target.value)
  }

  const enviarMensaje = (e) => {
      e.preventDefault()
      mensajeEnviado(mensaje)
      setMensaje ('')
  }

  return (
    <fieldset disabled={busy}>
      <form onSubmit={enviarMensaje} className='formulario'>
        <FaRegFaceGrin className='icono-form'/>
        <GoPlus className='icono-form'/>
        <input type="text" value={mensaje} onChange={cambiaMensaje} className='formulario-input'/>
        <button type='submit' className='boton-enviar'><IoSend className='icono-enviar'/></button>
      </form>
    </fieldset>
  )
}


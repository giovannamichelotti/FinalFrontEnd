import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './ContactList.css'
import { MdOutlineCameraAlt } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import MOOK_MENSAJES from '../../contactos.json'

export const ContactList = () => {
  const [contactosFiltrada, setContactosFiltrada] = useState([])
  const [termino, setTermino] = useState('')
  const buscar = (e) => {
    setTermino(e.target.value)
  }
  
  const [contactos, setContactos] = useState([])
  

    useEffect(()=>{
      setContactos(MOOK_MENSAJES)
    }, [])
        

  useEffect (() => {
    if (!termino) {
      setContactosFiltrada(MOOK_MENSAJES)
      return
    }
    const lista = contactos.filter((item)=> item.nombre.toLowerCase().includes(termino.toLowerCase()))
    setContactosFiltrada(lista)
  }, [termino])

  return (
    <div>
      <h1 className='whatsapp'>WhatsApp 
        <div className='iconos'>
          <MdOutlineCameraAlt className='camara'/>
          <BsThreeDotsVertical className='puntitos'/>
        {/* Pensé hacer un botón que despliegue 'Nuevo Grupo', 'Mensajes Destacados', Seleccionar Chats' si sobra tiempo*/}
        </div>
      </h1>
      <div className='barra-busqueda'>
        <FaMagnifyingGlass className='lupita' /> 
        <input type="text" placeholder='Buscar...' className='input-buscar' value={termino} onChange={buscar}/> 
      </div>
      <ul className='lista-contactos'>
        {contactosFiltrada.map(contacto=> (
          <li className='lista-contacto' key={contacto.id}>
            <Link className='contacto' to={`chat/` + contacto.id}>
              <img src={contacto.imagen} className='imagenes' />
              <div>
                <div className='nombre'>
                  {contacto.nombre} <br/>
                </div>
                <div className='texto'>
                  {contacto.mensajes[contacto.mensajes.length -1].texto}
                </div>
              </div>
              <div className='tiempo'>
                {contacto.mensajes[contacto.mensajes.length - 1].dia !== 'hoy' && contacto.mensajes[contacto.mensajes.length - 1].dia} &nbsp;
                {contacto.mensajes[contacto.mensajes.length - 1].hora}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}


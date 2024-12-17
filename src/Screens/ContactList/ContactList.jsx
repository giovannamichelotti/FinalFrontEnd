import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './ContactList.css'
import { MdOutlineCameraAlt } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BiSolidFolderPlus } from "react-icons/bi";
import ENV from "../../../config/environment.js"

export const ContactList = () => {
  const [contactos, setContactos] = useState([])
  const [contactosFiltrada, setContactosFiltrada] = useState([])
  const [termino, setTermino] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    getContactos()
  }, [])
  
  useEffect (() => {
    if (!termino || termino === '') {
      setContactosFiltrada(contactos)
      return
    }
    const lista = contactos.filter((item)=> item.name.toLowerCase().includes(termino.toLowerCase()))
    setContactosFiltrada(lista)
  }, [termino])

  const buscar = (e) => {
    setTermino(e.target.value)
  }

  const getContactos = async () => {
    try {
      setBusy(true)
      const url = ENV.API_URL + 'contacts/'
      const response = await fetch(url, {
        method: 'GET',
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
        setContactos(res.data)
        setContactosFiltrada(res.data)
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
    }
  }

  const nuevoContacto = () => {
    navigate('/form-contacto')
  }

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
        <input type="text" placeholder='Buscar...' className='input-buscar' value={termino} disabled={busy} onChange={buscar}/> 
      </div>
      <ul className='lista-contactos'>
        {message && (<div className={error ? "error" : ""}>{message}</div>)}
        {busy && (<div>Cargando...</div>)}
        {contactosFiltrada && !contactosFiltrada.length && !busy && !error && (<div>No hay contactos</div>)}
        {contactosFiltrada.map(contacto=> (
          <li className='lista-contacto' key={contacto.id}>
            <Link className='contacto' to={`/chat/` + contacto.id}>
              <img src={contacto.imagen} className='imagenes' />
              <div>
                <div className='nombre'>
                  {contacto.name} <br/>
                </div>
                <div className='texto'>
                  {contacto.mensajes && contacto.mensajes[contacto.mensajes.length -1].texto}
                </div>
              </div>
              {
                contacto.mensajes && (
                  <div className='tiempo'>
                {contacto.mensajes[contacto.mensajes.length - 1].dia !== 'hoy' && contacto.mensajes[contacto.mensajes.length - 1].dia} &nbsp;
                {contacto.mensajes[contacto.mensajes.length - 1].hora}
                </div>
                )
              }
            </Link>
          </li>
        ))}
      </ul>
      <button type='button' onClick={nuevoContacto} className='boton-agregar'><BiSolidFolderPlus className='icono-agregar'/></button>
    </div>
  )
}


import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './ContactList.css'
import { MdOutlineCameraAlt } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";

export const ContactList = () => {
  const [contactos, setContactos] = useState([])
  const [contactosFiltrada, setContactosFiltrada] = useState([])
  const [termino, setTermino] = useState(null)
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
    const lista = contactos.filter((item)=> item.nombre.toLowerCase().includes(termino.toLowerCase()))
    setContactosFiltrada(lista)
  }, [termino])

  const buscar = (e) => {
    setTermino(e.target.value)
  }

  const getContactos = async () => {
    try {
      setBusy(true)
      const url = 'https://itminka.com/gio/api/contacts/'
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
        setTermino('')
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
        {
          message && (
            <div className={error ? "error" : ""}>{message}</div>
          )
        }
        {
          busy && (
            <div>Cargando...</div>
          )
        }
        {
          !contactosFiltrada.length && !busy && !error && (
            <div>No hay contactos</div>
          )
        }
        {contactosFiltrada.map(contacto=> (
          <li className='lista-contacto' key={contacto.id}>
            <Link className='contacto' to={contacto && `/chat/` + contacto.id}>
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


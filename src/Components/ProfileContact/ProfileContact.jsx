import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MdOutlineCall, MdOutlineVideocam, MdOutlineMessage, MdOutlineImage } from "react-icons/md";
import { LuBell } from "react-icons/lu";
import { IoMdLock } from "react-icons/io";
import { BsClockHistory } from "react-icons/bs";
import { PiLockLaminatedLight } from "react-icons/pi";
import { FaArrowLeft, FaPencilAlt } from "react-icons/fa";
import ENV from '../../../config/environment.js'
import './ProfileContact.css'

export const ProfileContact = ({}) => {
  const navigate = useNavigate()
  const {contactoID} = useParams()
  const [contacto, setContacto] = useState ({})
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    getContacto(contactoID)
  }, []);

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
        if (statusCode === 302) {
            const res = await response.json()
            setContacto(res.data)
            setBusy(false)
            return
        }
        navigate('/')
    }
    catch(error) {
        console.log(error)
        navigate('/')
    }
}

  return (
    <div className='general'>
        <Link className='volver' to={contacto && `/chat/` + contacto.id}><FaArrowLeft /></Link>
        <Link className='lapiz' to={contacto && '/form-contact/' + contacto.id}><FaPencilAlt/></Link>
        <div className='cabecera-profile'>
          <img src={contacto && (contacto.image)} className='imagen' />
          <div className='profile-nro'>
            <div className='profile-nombre'>
              {contacto && contacto.name}
            </div>
            <div className='profile-nro2'>
              {contacto && contacto.phone}
            </div>
          </div>
          </div>
          <div className='iconos-grandes-general'>
            <div className='icono-titulo'><MdOutlineMessage className='iconos-grandes' /> Mensaje</div>
            <div className='icono-titulo'><MdOutlineCall className='iconos-grandes'/> Llamar</div>
            <div className='icono-titulo'><MdOutlineVideocam className='iconos-grandes'/> Video</div>
          </div>
          <div className='opciones'>
            <div className='opcion'>
              <div className='icono-titulo-2'><LuBell className='iconos'/> Notificaciones</div>
            </div>
            <div className='opcion'>
              <div className='icono-titulo-2'><MdOutlineImage className='iconos' /> Visibilidad de archivos multimedia</div>
            </div>
            <div className='opcion'>
              <div className='icono-titulo-2'><IoMdLock className='iconos' /> Cifrado</div>
              <span className='text'>Los cifrados y llamadas están cifrados de extremo a extremo. Toca para verificarlo.</span>
            </div>
            <div className='opcion'>
              <div className='icono-titulo-2'><BsClockHistory className='iconos' /> Mensajes temporales</div>
              <span className='text'>Desactivados</span>
            </div>
            <div className='opcion'>
              <div className='icono-titulo-2'><PiLockLaminatedLight className='iconos' /> Restringir chat</div>
              <span className='text'>Restringe y oculta este chat en este dispositivo</span>
            </div>
          </div>
    </div>
  )
}

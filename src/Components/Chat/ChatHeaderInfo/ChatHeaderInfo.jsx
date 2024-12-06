import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import './ChatHeaderInfo.css'
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

export const ChatHeaderInfo = ({contacto, buscarMensajes}) => {
  
  const [termino, setTermino] = useState('')
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false)
  const preventDefault = (e) => {
    e.preventDefault()
  }
  
  const cambiaTermino = (e) => {
    setTermino(e.target.value)
    buscarMensajes(e.target.value)
  }

  return (
    <div className='chat-header'>
      {
        contacto && (
          <>
            {
              mostrarBusqueda 
              ? (
                <form onSubmit={preventDefault}>
                <IoIosClose onClick={() => setMostrarBusqueda(false)} />
                <input type="text" value={termino} onChange={cambiaTermino} />
              </form>
              )
              : (
                <>
                  <Link className='flecha' to='/contactos'><FaArrowLeft /></Link>
                  <img className='imagen-chat' src={`/` + contacto.imagen}/>
                  <Link className='contacto-total' to={`/infocontacto/` + contacto.id}>
                    <div className='contacto-nombre'>{contacto.nombre}</div>
                    <div className='ultima-conexion'>{contacto.ultima_conexion}</div>
                  </Link>
                  <div className='iconos-header'>
                    <IoMdSearch className='icono-header'onClick={()=> setMostrarBusqueda(true)}/>
                    <BsThreeDotsVertical className='icono-header'/>
                  </div>
                </>
              )
            }
          </>
        )
      }
      
    </div>
  )
}

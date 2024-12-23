import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSearch, IoIosClose } from "react-icons/io";
import './ChatHeaderInfo.css'

export const ChatHeaderInfo = ({contacto, buscarMensajes, busy}) => {
  
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
                  {
                    busy
                    ? (
                      <div>Cargando...</div>
                    )
                    : (
                      <>
                        <Link className='flecha' to='/'><FaArrowLeft /></Link>
                        <img className='imagen-chat' src={contacto.image}/>
                        <Link className='contacto-total' to={`/contact/` + contacto.id}>
                          <div className='contacto-nombre'>{contacto.name}</div>
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
          </>
        )
      }
      
    </div>
  )
}

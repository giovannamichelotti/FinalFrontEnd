import React from 'react'
import { ChatScreen } from './Screens/ChatScreen/ChatScreen'
import { ContactList } from './Screens/ContactList/ContactList'
import { ProfileContact } from './Components/ProfileContact/ProfileContact'
import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
    return (
        <Routes>
            <Route path='/' element={<ContactList/>}/>
            <Route path='/chat/:contactoID' element={<ChatScreen/>}/>
            <Route path='/infocontacto/:contactoID' element={<ProfileContact/>}/>
        </Routes>
    )
}

export default App

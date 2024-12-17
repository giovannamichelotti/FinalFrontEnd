import React from 'react'
import { ChatScreen } from './Screens/ChatScreen/ChatScreen'
import { ContactList } from './Screens/ContactList/ContactList'
import { ProfileContact } from './Components/ProfileContact/ProfileContact'
import { LoginScreen } from './Screens/LoginScreen/LoginScreen'
import { RegisterScreen } from './Screens/RegisterScreen/RegisterScreen'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { LoaderScreen } from './Screens/LoaderScreen/LoaderScreen'
import { RecoverPasswordScreen } from './Screens/RecoverPasswordScreen/RecoverPasswordScreen'
import { ChangePasswordScreen } from './Screens/ChangePasswordScreen/ChangePasswordScreen'
import { FormContactScreen } from './Screens/FormContactScreen/FormContactScreen'

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoaderScreen/>}/>
            <Route path='/login' element={<LoginScreen/>}/>
            <Route path='/register' element={<RegisterScreen/>}/>
            <Route path='/recuperar-clave' element={<RecoverPasswordScreen/>}/>
            <Route path='/cambiar-clave/:token' element={<ChangePasswordScreen/>}/>
            <Route path='/contactos' element={<ContactList/>}/>
            <Route path='/chat/:contactoID' element={<ChatScreen/>}/>
            <Route path='/infocontacto/:contactoID' element={<ProfileContact/>}/>
            <Route path='/form-contacto/:contactoID?' element={<FormContactScreen/>}/>
        </Routes>
    )
}

export default App

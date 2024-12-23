import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ChatScreen } from './Screens/ChatScreen/ChatScreen'
import { ContactListScreen } from './Screens/ContactListScreen/ContactListScreen'
import { ProfileContact } from './Components/ProfileContact/ProfileContact'
import { LoginScreen } from './Screens/LoginScreen/LoginScreen'
import { RegisterScreen } from './Screens/RegisterScreen/RegisterScreen'
import { RecoverPasswordScreen } from './Screens/RecoverPasswordScreen/RecoverPasswordScreen'
import { ChangePasswordScreen } from './Screens/ChangePasswordScreen/ChangePasswordScreen'
import { FormContactScreen } from './Screens/FormContactScreen/FormContactScreen'
import './App.css'

function App() {
    return (
        <Routes>
            <Route path="/" element={<ContactListScreen/>}/>
            <Route path='/login' element={<LoginScreen/>}/>
            <Route path='/register' element={<RegisterScreen/>}/>
            <Route path='/recover-password' element={<RecoverPasswordScreen/>}/>
            <Route path='/change-password/:token' element={<ChangePasswordScreen/>}/>
            <Route path='/chat/:contactoID' element={<ChatScreen/>}/>
            <Route path='/contact/:contactoID' element={<ProfileContact/>}/>
            <Route path='/form-contact/:contactoID?' element={<FormContactScreen/>}/>
        </Routes>
    )
}

export default App

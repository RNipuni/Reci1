import { createContext, useState } from 'react'
// import {createContext} from 'react-native'

const UserRoot = createContext()

const MainContextWrapper = ({children})=>{
    const [user, setUser] = useState({})

    const eventHandler =  (action,payload) =>{
        switch(action){
            case 'UserRegistration':
                console.log(payload)
                userHandler(payload)
                break;
            default:
                break;
        }
    }

    const userHandler = (payload) =>{
        console.log(payload)
        setUser(payload)
    }
    return(
        <UserRoot.Provider value={{user, eventHandler}}>
            {children}
        </UserRoot.Provider>
    )
}

export default MainContextWrapper
export {UserRoot}
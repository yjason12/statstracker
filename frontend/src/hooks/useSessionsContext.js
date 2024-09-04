import {SessionsContext} from '../context/SessionContext'
import {useContext} from 'react'

export const useSessionsContext = () => {
    const context= useContext(SessionsContext)

    return context
}
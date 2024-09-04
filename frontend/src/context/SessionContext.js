import {createContext, useReducer} from 'react'

export const SessionsContext = createContext()

export const sessionsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_SESSIONS':
            return {
                sessions: action.payload
            }
        case 'CREATE_SESSION':
            return {
                sessions:[action.payload, ...state.sessions]
            }
        case 'DELETE_SESSION':
            return {
                sessions: state.sessions.filter((s) => s._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const SessionsContextProvider = ({children}) => {
    const[state, dispatch] = useReducer(sessionsReducer, {
        sessions: []
    })

    return (
        <SessionsContext.Provider value={{...state, dispatch}}>
            {children}
        </SessionsContext.Provider>
    )
}   
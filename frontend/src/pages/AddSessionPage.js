import {useEffect} from 'react'
import {useSessionsContext} from "../hooks/useSessionsContext"

//components
import SessionForm from '../components/SessionForm'


const AddSessionPage = () => {

    return (
        <div className="add-session">
            <SessionForm/>
        </div>
    )
}

export default AddSessionPage
import {useEffect} from 'react'
import {useSessionsContext} from "../hooks/useSessionsContext"

//components
import SessionForm from '../components/SessionForm'


const AddSessionPage = ({userId}) => {

    return (
        <div className="add-session">
            <SessionForm userId={userId}/>
        </div>
    )
}

export default AddSessionPage
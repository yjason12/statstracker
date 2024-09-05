import {useSessionsContext} from '../hooks/useSessionsContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const SessionDetails = ({session}) => {
    const {dispatch} = useSessionsContext()

    const handleClick = async () => {
        const response = await fetch('/api/data/' + session._id, {
            method: 'DELETE'
        })
        
        const json = await response.json()

        if(response.ok) {
            dispatch({type: 'DELETE_SESSION', payload: json})
        }

    }

    return (
        <div className = "session-details">
        <h4 style={{ color: (session.endingStack - session.startingStack) >= 0 ? '#1aac83' : 'red' }}>
            {session.endingStack - session.startingStack}
        </h4>
        <p>
            <strong>Stakes: {session.stakes}</strong>

        </p>
        <p>
            <strong>Duration: </strong>
                {session.duration <= 1.0 
                ? `${(session.duration * 60).toFixed(0)} minutes` // Convert to minutes if duration is 1.0 or less
                : `${session.duration.toFixed(1)} hours`} 
        </p>


            <p>{formatDistanceToNow(new Date(session.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>

        </div>
    )
}

export default SessionDetails
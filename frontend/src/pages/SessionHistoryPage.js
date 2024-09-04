import { useEffect } from 'react';
import { useSessionsContext } from "../hooks/useSessionsContext";

// Components
import SessionDetails from '../components/SessionDetails';

const SessionHistoryPage = ({userId}) => {
    const { sessions, dispatch } = useSessionsContext();

    useEffect(() => {
        const fetchSessions = async () => {
            const response = await fetch(`/api/data/user/${userId}`)
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_SESSIONS', payload: json });
            }
        };

        fetchSessions();
    }, [dispatch, userId]);

    return (
        <div className="session-history">
            <div className="sessions">
                {sessions && sessions.length > 0 ? (
                     [...sessions].reverse().map((session) => (
                        <SessionDetails key={session._id} session={session} /> // Add return here
                    ))
                ) : (
                    <p>No sessions to display</p>
                )}
            </div>
        </div>
    );
};

export default SessionHistoryPage;

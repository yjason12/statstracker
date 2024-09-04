import { useState, useEffect } from "react";
import { useSessionsContext } from "../hooks/useSessionsContext";

const SessionForm = () => {
    const { dispatch } = useSessionsContext();
    const [stakes, setStakes] = useState("");
    const [startingStack, setStartingStack] = useState("");
    const [endingStack, setEndingStack] = useState("");
    const [handCount, setHandCount] = useState("");
    const [error, setError] = useState("");
    const [startDate, setStartDate] = useState("");
    const [fieldErrors, setFieldErrors] = useState([]);
    const [duration, setDuration] = useState("");

    // Update session duration every second
    useEffect(() => {
        let timer;
        if (startDate) {
            timer = setInterval(() => {
                const now = new Date();
                const diff = now - new Date(startDate); // Time difference in milliseconds
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setDuration(`${hours}h ${minutes}m ${seconds}s`);
            }, 1000);
        } else {
            setDuration("N/A");
        }

        // Cleanup interval on component unmount or when session ends
        return () => clearInterval(timer);
    }, [startDate]);

    const handleStartSession = (e) => {
        e.preventDefault();
        setStartDate(new Date());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(startDate === "") {
            setError("Please start a session before trying to end one");
            return
        }

        const diff = new Date() - startDate
        const hours = diff / (1000 * 60 * 60);

        // Round to the nearest tenth decimal (one decimal place)
        const roundedHours = Math.round(hours * 10) / 10;

        const session = {duration:roundedHours, stakes, startingStack, endingStack, handCount };

        const response = await fetch('/api/data', {
            method: 'POST',
            body: JSON.stringify(session),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setFieldErrors(json.fieldErrors || []); // Ensure fieldErrors is set to an array, even if it's undefined
        }

        if (response.ok) {
            // Reset form fields
            setStakes("");
            setStartingStack("");
            setEndingStack("");
            setHandCount("");
            setError("");
            setStartDate("");
            setFieldErrors([]);
            setDuration("N/A"); // Reset duration display

            alert('Session logged');
            console.log('New session added', json);
            dispatch({ type: 'CREATE_SESSION', payload: json });
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>
                Session Duration: 
                <span
                    style={{
                        color: startDate ? 'green' : 'inherit', // Apply green color to the duration if session started
                    }}
                >
                    {` ${duration}`}
                </span>
            </h3>

            <label>Stakes:</label>
            <input
                type="text"
                onChange={(e) => setStakes(e.target.value)}
                value={stakes}
                className={Array.isArray(fieldErrors) && fieldErrors.includes('stakes') ? 'error' : ''}
            />

            <label>Starting Stack:</label>
            <input
                type="text"
                onChange={(e) => setStartingStack(e.target.value)}
                value={startingStack}
                className={Array.isArray(fieldErrors) && fieldErrors.includes('startingStack') ? 'error' : ''}
            />

            <label>Ending Stack:</label>
            <input
                type="text"
                onChange={(e) => setEndingStack(e.target.value)}
                value={endingStack}
                className={Array.isArray(fieldErrors) && fieldErrors.includes('endingStack') ? 'error' : ''}
            />

            <label>Hand Count:</label>
            <input
                type="text"
                onChange={(e) => setHandCount(e.target.value)}
                value={handCount}
                className={Array.isArray(fieldErrors) && fieldErrors.includes('handCount') ? 'error' : ''}
            />

            {/* Button container */}
            <div className="button-container">
                <button
                    className="start-session-button"
                    type="button"
                    onClick={handleStartSession}
                    disabled={!!startDate} // Disable start button if the session has started
                >
                    Start Session
                </button>
                <button className="end-session-button" type="submit">
                    End Session
                </button>
            </div>

            {error && <div className="error"> {error} </div>}
        </form>
    );
};

export default SessionForm;

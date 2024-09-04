const Session = require('../models/sessionModel')
const mongoose = require('mongoose')
//get all sessions

const getSessions = async(req, res)=> {
    const sessions = await Session.find({}).sort({createdAt:-1})
    res.status(200).json(sessions);
}
const isStrictlyNumeric = (value) => {
    // Check for non-numeric characters
    return !Number.isNaN(parseFloat(value)) && /^\d+$/.test(value);
  };

//get a single session
const getSessionsByUserId = async (req, res) =>{
    const { id: userId } = req.params; // Extract userId from route parameters

    if (!userId) {
        return res.status(400).json({ error: 'userId parameter is required' });
    }

    try {
        // Find sessions that match the userId
        const sessions = await Session.find({ userId });

        // Check if any sessions were found
        if (sessions.length === 0) {
            return res.status(404).json({ error: 'No sessions found for this user' });
        }

        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching sessions' });
    }
}

//create a new session
const createSession = async (req, res) => {
    const {userId, duration, stakes, startingStack, endingStack, handCount} = req.body
    
    let fieldErrors = []
    if(!stakes) {
        fieldErrors.push('stakes')
    }
    if(!startingStack || !isStrictlyNumeric(startingStack)) {
        fieldErrors.push('startingStack')
    }
    if(!endingStack || !isStrictlyNumeric(endingStack)){
        fieldErrors.push('endingStack')
    }
    if(!handCount|| !isStrictlyNumeric(handCount)){
        fieldErrors.push('handCount')
    }



    if(fieldErrors.length > 0){
        return res.status(400).json({error: "Please fill in or fix all of the fields", fieldErrors})
    }

    try{//create in DB
        const session = await Session.create({
            userId,
            duration,
            stakes, 
            startingStack, 
            endingStack, 
            handCount
        })
        res.status(200).json(session)
    } catch(error) {
        res.status(400).json({error: error.message})
    }

}

// delete a session 

const deleteSession = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such session'})
    }

    const session = await Session.findOneAndDelete({_id: id})
    if(!session) {
        return res.status(404).json({error: 'no session found'})
    }

    res.status(200).json(session)
}

//update a session

const updateSession = async (req, res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No session found'})
    }

    const session = await Session.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!session) {
        return res.status(400).json({error: 'No session found'})
    }

    res.status(200).json(session)

}


module.exports = {
    getSessionsByUserId,
    getSessions,
    createSession,
    deleteSession,
    updateSession
}
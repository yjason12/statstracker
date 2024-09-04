const express = require('express')
const {
    createSession,
    getSessionsByUserId,
    getSessions,
    deleteSession,
    updateSession
} = require('../controllers/sessionController')

const router = express.Router()

//get all sessions
router.get('/', getSessions)

//get session by id
router.get('/user/:id', getSessionsByUserId)


//POST a new session
router.post('/', createSession)

router.delete('/:id', deleteSession)

router.patch('/:id', updateSession)

module.exports = router
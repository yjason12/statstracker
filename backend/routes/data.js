const express = require('express')
const {
    createSession,
    getSession,
    getSessions,
    deleteSession,
    updateSession
} = require('../controllers/sessionController')

const router = express.Router()

//get all sessions
router.get('/', getSessions)

//get a single session
router.get('/:id', getSession)


//POST a new session
router.post('/', createSession)

router.delete('/:id', deleteSession)

router.patch('/:id', updateSession)

module.exports = router

const router = require('express').Router()

const Userdb = require('../users/user-model')
const restricted = require('../auth/restricted-middleware')


// make sure to add back restircited stuff

router.get('/', (req,res) => {
    
    Userdb.find()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(400).json({message: "unable to get users"})
    })
})

router.get('/tasks', (req,res) => {
    const userID = req.decodedJwt.userid
    Userdb.findById(userID)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})



module.exports = router;





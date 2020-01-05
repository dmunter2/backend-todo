const router = require('express').Router()
const restricted = require('../auth/restricted-middleware')
const CompltDb = require('./completed-model')



router.get('/', restricted, (req,res) => {

    CompltDb.find()
        .then(complete => {
            res.status(200).json(complete)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})




router.get('/task', restricted, (req,res) => {
    const id = req.decodedJwt.userid
    CompltDb.findBy(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})




router.post('/check', restricted, (req,res) => {
    // const id = req.decodedJwt.userid
    // const title = req.body.title
    // const description = req.body.description
    const item = { ...req.body, users_id: req.decodedJwt.userid}
    CompltDb.add(item)
        .then(() => {
            res.status(200).json({message: `This title was sent --${req.body.title}-- and this description was sent --${req.body.description}--`})
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


router.delete('/title', restricted, (req, res) => {
    const id = req.decodedJwt.userid
    const title = req.body.title;
    CompltDb.remove(title, id)
        .then(title => {
            res.status(200).json(title)
        })

        .catch(err => {
            res.status(500).json({ Message: "Catch error 500" })
        })
})







module.exports = router;


const router = require('express').Router()

const Tododb = require('./todo-model')
const restricted = require('../auth/restricted-middleware')




router.get('/', restricted , (req,res) => {
    Tododb.find()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(400).json(err)
        })

})



router.get('/task', restricted, (req,res) => {
    const id = req.decodedJwt.userid
    Tododb.findBy(id) 
        .then( user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})




router.post('/create', restricted, (req,res) => {
    const todo = { ...req.body, users_id: req.decodedJwt.userid}
    // const userID = req.params.id

    Tododb.add(todo) 
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})



router.put('/edit', (req,res) => {
    const id = req.decodedJwt.userid
    const todo = req.body

    Tododb.update(id, todo)


     .then(todo => {
         res.status(200).json(todo)
     })
     .catch(err => {
         res.status(400).json(err)
     })
})


// router.delete('/remove', (req,res) => {
    

    
// })


router.delete('/title', restricted, (req,res) => {
    const id = req.decodedJwt.userid
    const title = req.body.title;
    Tododb.remove(title, id)
        .then(title => {
            res.status(200).json(title)
        })
           
        .catch(err => {
            res.status(500).json({Message: "Catch error 500"})
        })
    })





module.exports = router;







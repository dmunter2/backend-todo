const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Userdb = require('../../users/user-model')
const jwt = require('jsonwebtoken')
const secrets = require('../config/secret')


router.post('/register', (req,res) => {

    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;


    Userdb.add(user)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(400).json(err)
    })
})




router.post('/login', (req,res) => {

    let {username, password} = req.body;

    Userdb.findBy({username})
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = genToken(user)
                // const username = req.body.username
                res.status(200).json({
                    message: `${user.username}`,
                    token: token,
                    user_id: `${user.id}`,
              
                })
            } else {
                res.status(401).json({message: "invalid credentials"})
            }
       
        })
        .catch(err => {
            res.status(500).json({message: "Unable to log you in"})
        })

    
    
})



function genToken(user) {
    const payload = {
        userid: user.id,
        username: user.username
    }

    const options = { expiresIn: "1h" }
    const token = jwt.sign(payload, secrets.jwtSecret, options);


    return token
}




module.exports = router;









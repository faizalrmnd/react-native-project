const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const secret = process.env.SECRET

module.exports = {
    async registerUser (req, res, next) {        
        try {
            let user = await User.create(req.body)        
            let token = jwt.sign({ id: user._id }, secret)
            
            delete user.password

            res.header({
                'Access-Control-Expose-Headers': 'token',
                token
            })            
            res.status(200).json({
                message: 'Berhasil membuat admin baru',
                user: {
                    name: user.name,
                    email: user.email
                }
            })
        } catch(err){
            next(err)
        }
        
    },

    async loginUser (req, res, next) {
        let { email, password } = req.body

        try {
            let user = await User.findOne({email})   
                                   
            if (!user || !bcrypt.compareSync(password, user.password)) {

                throw ({status: 400, message: 'Email/password salah'})

            } else {
                let token = jwt.sign({ id: user._id }, secret)
                res.header({
                    'Access-Control-Expose-Headers': 'token',
                    token
                })                
                res.status(200).json({
                    message: 'Berhasil masuk',
                    user: {
                        name: user.name,
                        email: user.email
                    }
                })
            }
        } catch(err) {
            next(err)
        }
    }
}
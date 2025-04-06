// const usermodel = require("../models/usermodel")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
// const { generateToken } = require("../utils/generateToken")

// module.exports.registerUser  = (req, res) => {
//     try {
//         let { email, password, fullname } = req.body
//         bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(password, salt,async (err, hash) => {
//                 if (err) return res.send(err.message)
//                 else {
//                 let user = await usermodel.create({
//                     email,
//                     fullname,
//                     password:hash
//                 })
//                 let token = generateToken(user)
//                 res.cookie("token",token)
//                 res.send("user created successfully")
//             }
//             })
//         })
        
//         res.send(user)
//     } catch (error) {
//         console.log(error.message);


//     }
// }
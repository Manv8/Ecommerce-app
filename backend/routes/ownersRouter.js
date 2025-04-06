// const express = require("express")
// const router = express.Router()
// const ownersModel = require("../models/ownermodel")

// if (process.env.NODE_ENV === "development") {
//     router.post("/create", async (req, res) => {

//         let onwer = await ownersModel.find();
//         if (onwer.length > 0) {
//             return res
//                 .send("You dont have permission to create Owner ")
//         }

//         let { fullname, email, password } = req.body
//         let createdOwner = await ownersModel.create({
//             fullname,
//             email,
//             password
//         })
//         res.send(createdOwner);
//     })
// }
// a

// router.get("/admin", (req, res) => {
//     res.render("createproducts")
// })


// module.exports = router
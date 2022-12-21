const router = require("express").Router();
const { model } = require("mongoose");
const User = require("../models/User");
const bcrypt = require('bcrypt');
//register
router.post("/register",async (req, res) =>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password,salt);
        const newUser = new User(
            {
                username:req.body.username,
                email:req.body.email,
                password:hashPass,
            }
        )
        const user = await newUser.save();
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
});
router.post("/login",async (req, res) => {
    try{
        const user = await User.findOne({username: req.body.username})
        !user && res.status(400).json("Wrong credentials!")

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials!")


        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})

//solve the problem about database!
module.exports = router 

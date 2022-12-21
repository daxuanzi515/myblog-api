const router = require("express").Router();
const { model } = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require('bcrypt');
//create post
router.post("/", async(req, res) => {
    const newPost = new Post(req.body);
    try
    {
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})

//update post
router.put("/:id",async (req, res) =>{
    try
    {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username)
        {
            try{
                const updatePost = await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{new:true});
                res.status(200).json(updatePost);
            }
            catch(err)
            {
                res.status(500).json(err);
            }
        }
        else{
            res.status(401).json("You can only update your post.")
        }
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});
//delete
router.delete("/:id",async (req, res) =>{
    try
    {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username)
        {
            try{
                await post.delete();
                res.status(200).json("Post Delete.");
            }
            catch(err)
            {
                res.status(500).json(err);
            }
        }
        else{
            res.status(401).json("You can only update your post.")
        }
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});
//get post
router.get("/:id", async (req, res)=>{
    try{
        const user = await Post.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})
//all post
router.get("/", async (req, res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    try{
        let posts;
        if(username)
        {
            posts = await Post.find({username});
        }
        else if(catName)
        {
            posts = await Post.find({
                categories:{$in:[catName]}
            })
        }
        else{
            posts = await Post.find();
        }
        res.status(200).json(posts);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})
//solve the problem about database!
module.exports = router 

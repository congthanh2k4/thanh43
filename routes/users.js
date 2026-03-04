var express = require('express');
var router = express.Router();

let { dataUser } = require('../utils/data');

// GET ALL USERS
router.get('/', function(req,res){
    res.send(dataUser)
});

// GET USER BY USERNAME
router.get('/:username', function(req,res){
    let username = req.params.username

    let user = dataUser.find(u => u.username == username)

    if(!user){
        return res.status(404).send({message:"User not found"})
    }

    res.send(user)
});

// CREATE USER
router.post('/', function(req,res){
    let newUser = {
        ...req.body,
        creationAt: new Date(),
        updatedAt: new Date()
    }

    dataUser.push(newUser)
    res.send(newUser)
});

// UPDATE USER
router.put('/:username', function(req,res){
    let username = req.params.username

    let user = dataUser.find(u => u.username == username)

    if(!user){
        return res.status(404).send({message:"User not found"})
    }

    Object.assign(user, req.body)
    user.updatedAt = new Date()

    res.send(user)
});

// DELETE USER
router.delete('/:username', function(req,res){
    let username = req.params.username

    let index = dataUser.findIndex(u => u.username == username)

    if(index == -1){
        return res.status(404).send({message:"User not found"})
    }

    dataUser.splice(index,1)
    res.send({message:"Deleted"})
});

module.exports = router;
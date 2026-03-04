var express = require('express');
var router = express.Router();

let { dataRole, dataUser } = require('../utils/data');


// GET ALL ROLE
router.get('/', function(req,res){
    res.send(dataRole);
});

// GET USERS BY ROLE
router.get('/:id/users', function(req,res){

    let id = req.params.id

    let users = dataUser.filter(
        u => u.role.id == id
    )

    res.send(users)
});

// GET ROLE BY ID
router.get('/:id', function(req,res){
    let id = req.params.id;

    let role = dataRole.find(r => r.id == id);

    if(!role){
        return res.status(404).send({message:"Role not found"})
    }

    res.send(role);
});


// CREATE ROLE
router.post('/', function(req,res){

    let newRole = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        creationAt: new Date(),
        updatedAt: new Date()
    }

    dataRole.push(newRole)

    res.send(newRole)
});


// UPDATE ROLE
router.put('/:id', function(req,res){

    let id = req.params.id;

    let role = dataRole.find(r => r.id == id)

    if(!role){
        return res.status(404).send({message:"Role not found"})
    }

    role.name = req.body.name
    role.description = req.body.description
    role.updatedAt = new Date()

    res.send(role)
});


// DELETE ROLE
router.delete('/:id', function(req,res){

    let id = req.params.id

    let index = dataRole.findIndex(r => r.id == id)

    if(index == -1){
        return res.status(404).send({message:"Role not found"})
    }

    dataRole.splice(index,1)

    res.send({message:"Deleted"})
});


module.exports = router;
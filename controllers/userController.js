import * as User from '../models/userModel.js'

const getUsers = async(req, res)=>{
    console.log("user controller hits....")
    try{

        const users = await User.getAllUsers();

        res.status(200).json(users);

    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

const createUser = async(req, res)=>{
    const {name, email, password, phone, role} = req.body
    try{
        const createdUser = await User.createUser({name, email, password, phone, role})
        res.status(200).json({user: createdUser})

    }catch(err){
        res.status(500).json({error: err.message})

    }
}

export {getUsers, createUser};

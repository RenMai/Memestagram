'use strict';

const userModel = require('../models/userModel');

const user_list_get = async (req, res) => {
    const users = await userModel.getAllUsers();
    res.json(users);
};


const user_get = async (req, res) => {
    const params= [req.params.name];
    const user= await userModel.getUser(params);
    await res.json(user);
};

module.exports ={
    user_list_get,
    user_get,
};
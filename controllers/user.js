const User = require('../models/users');

async function handleGetAllUsers(req, res) {
    const allUsers = await User.find({});

    res.status(200).json(allUsers);
}

async function handleGetUser(req, res) {
    const user = await User.findById(req.params.id);

    if (user) {
        return res.status(200).json(user)
    } else {
        return res.status(400).json(`User not found for this ${req.params.id}`);
    }
}

async function handleCreateUsers(req, res) {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ mgs: 'Body required'});
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        gender: body.gender,
        email: body.email,
        jobTitle: body.job_title
    });

    if (result) {
        console.log("result: ", result);
        res.status(201).json({msg: 'User successfully created', id: result._id});
    } else {
        res.status(400).json({msg: 'Something went wrong'});
    }
    
}

async function handleUpdateUsers (req, res) {
    if (!req.params || !req.params.id) {
        return res.status(400).json({ msg: 'Request params are required'});
    } else if (!req.body || !req.body.first_name || !req.body.last_name || !req.body.email || !req.body.gender || !req.body.job_title) {
        return res.status(400).json({ mgs: 'Body required'});
    }

    const body = req.body;

    const params = {
        firstName: body.first_name,
        lastName: body.last_name,
        gender: body.gender,
        email: body.email,
        jobTitle: body.job_title
    };

    const result = await User.findByIdAndUpdate(req.params.id, params);

    if (result) {
        console.log("result: ", result);
        res.status(201).json({msg: 'User successfully updated'});
    } else {
        res.status(400).json({msg: 'Something went wrong'});
    }
}

async function handleDeleteUsers(req, res) {
    const result = await User.findByIdAndDelete(req.params.id);

    if (result) {
        console.log("result: ", result);
        res.status(201).json({msg: 'User successfully created'});
    } else {
        res.status(400).json({msg: 'Something went wrong'});
    }
}

module.exports = {
    handleGetAllUsers,
    handleCreateUsers,
    handleUpdateUsers,
    handleDeleteUsers,
    handleGetUser
}
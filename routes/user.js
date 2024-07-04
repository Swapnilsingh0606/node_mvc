const express = require('express');

const { handleGetAllUsers, handleCreateUsers, handleDeleteUsers, handleUpdateUsers, handleGetUser } = require('../controllers/user')

const router = express.Router();

// router.get('/users', async (req, res) => {
//     const allUsers = await User.find({});
//     const html = `
//     <ul>
//         ${allUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join('')}
//     </ul>`;

//     res.send(html);
// });

router
    .route('/')
    .get(handleGetAllUsers)
    .post(handleCreateUsers);

router
    .route('/:id')
    .get(handleGetUser)
    .put(handleUpdateUsers)
    .delete(handleDeleteUsers)

module.exports = router;
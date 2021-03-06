'use strict';
// loginRoute
const express = require('express');
const router= express.Router();
const passport= require('../utils/pass');
const userModel = require('../models/userModel');
const session = require('express-session');
const {body, sanitizeBody} = require('express-validator');
const authController= require('../controllers/authController');

passport.serializeUser((user, done)=> {
    console.log(user);
	done(null, user.email); //FOR LOGIN
});

passport.deserializeUser((username, done)=> {
	// User.findById(id,  (err, user)=> {
		done(null, {username: username});
	// });
});

router.use(session({ 
	secret: 'keyboard cat', 
	resave: true, 
	saveUninitialized: true 
}));

router.use(passport.initialize());
router.use(passport.session());

router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    //console.log(passport.authenticate);
    authController.login
);

router.get('/logout', authController.logout);

router.post('/register',
	[
	body('name', 'minimum 3 characters').isLength({min: 3}),
	body('username', 'email is not valid').isEmail(),
	body('password', 'at least one upper case letter').matches('(?=.*[A-Z]).{8,}'),
	sanitizeBody('name').escape(),
	],
	authController.user_create_post, 
	authController.login,
);

module.exports= router;


















// router.get('/', userController.user_list_get);

// router.get('', userController.user_get);
// router.get('/user/:id', (req, res) => {
//     res.send(`You request a user with id ${req.params.id}`);
//   });
  
// router.post('/user', (req, res) => {
//     res.send('With this endpoint you can get users.');
//   });
// router.put('/user', (req, res) => {
//     res.send('With this endpoint you can edit users.');
//   });
// router.delete('/user', (req, res) => {
//     res.send('With this endpoint you can delete users.');
//   });
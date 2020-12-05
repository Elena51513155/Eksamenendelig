var express = require('express');
var router = express.Router();

// Require controller modules.
var user_controller = require('../controllers/usersController');
var front_controller = require('../controllers/frontController');
var matches_controller = require('../controllers/matchesController');

// view frontend
router.get('/', front_controller.frontpage_get);

router.post('/login', front_controller.login_post);

router.get('/logout', front_controller.logout);

//register frontend
//User register form
router.get('/register', user_controller.user_create_get);

router.post('/register', user_controller.user_create_post);


// CRUD for users
router.get('/user', user_controller.user_detail);

router.get('/user/update', user_controller.user_create_get);

router.post('/user/update', user_controller.user_create_post);

router.get('/user/:id/delete', user_controller.user_delete_get);

router.post('/user/:id/delete', user_controller.user_delete_post);

router.get('/user/:id/update', user_controller.user_update_get);

router.post('/user/:id/update', user_controller.user_update_post);

router.get('/user/:id', user_controller.user_detail);

router.get('/users', user_controller.user_list_possible_matches);

router.post('/user/:id/updatepassword/:newpassword', user_controller.user_update_password_get);


// CRUD for matches
router.get('/matches/get-more', matches_controller.show_possible_match);

router.post('/matches/:id/:name', matches_controller.make_skip_match);

router.get('/matches', matches_controller.see_all_matches);

module.exports = router;
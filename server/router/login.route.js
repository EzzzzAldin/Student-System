const router = require('express').Router();

const loginController = require('../controller/login.controller');
const verify = require('../controller/validation/verifyToken');

router.post('/login', loginController.postLogin);

router.get('/user', loginController.getLogin);

module.exports = router;
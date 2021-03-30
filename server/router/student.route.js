const router = require('express').Router();

const studentController = require('../controller/student.contoller');
const verify = require('../controller/validation/verifyToken');

router.get('/data', verify.authToken, studentController.getAllData);

router.get('/arrangement-student', verify.authToken, studentController.arrangementStudent);

router.get('/genral-data', verify.authToken, studentController.getGneralData);


module.exports = router;
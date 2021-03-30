const router = require('express').Router();

const adminController = require('../controller/admin.controller');
const verify = require('../controller/validation/verifyToken');

router.post('/register-admin', verify.authToken, adminController.postAdminRegister);

router.post('/register-student', verify.authToken, adminController.postStudentRegister);

router.post('/add-level', verify.authToken, adminController.addLevelStudent);

router.post('/add-subjects', verify.authToken, adminController.addSubjects);

router.put('/add-degrees', verify.authToken, adminController.addDegrees);

router.post('/student-data', verify.authToken, adminController.getAllData);

router.get('/data-admin', verify.authToken, adminController.getadminData);


module.exports = router;
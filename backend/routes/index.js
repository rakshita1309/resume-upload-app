const router = require('express').Router();
//middleware
const { signupValidation, signinValidation } = require('../middlewares/Validation');
//controllers
const signup = require('../controllers/UserSignup');
const signin = require('../controllers/UserSignin');


router.post('/signup', signupValidation, signup);
router.post('/login', signinValidation, signin);


module.exports = router;
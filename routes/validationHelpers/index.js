const { check, validationResult } = require('express-validator');


const validationHelpers = {
	userValidations: [
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please include a valid email').normalizeEmail().isEmail(),
		check('password', 'Please enter a password with six or more characters').isLength({ min: 6 })
	]

}

module.exports = validationHelpers
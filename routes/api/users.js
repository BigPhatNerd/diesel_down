const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { check, validationResult } = require('express-validator');
const { userValidations } = require('../validationHelpers');



//@route POST api/users
//@desc Register route
//@access Public
router.post('/register', userValidations,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            user = new User({
                email,
                password
            });
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                process.env.JWT_SECRET, { expiresIn: 3600000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');

        }
    });


module.exports = router
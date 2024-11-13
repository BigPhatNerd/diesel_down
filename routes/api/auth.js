const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { check, validationResult } = require('express-validator');
//@route GET api/auth
//@desc loadUser
//@access Public

router.get('/', auth, async (req, res) => {
    console.log("I made it here", { user: req.user })
    try {
        const user = await User.findById(req.user.id).select('-password')
        console.log({ user })
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
});

// @route  POST api/auth
// @descr   login
// @access  Public
router.post('/',
    [

        check('email', 'Please include a valid email'),
        check('password', 'Password is required.')
            .exists()
    ],
    async (req, res) => {
        console.log("Is this the problem")
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;


        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid credentials' }] });
            }
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                process.env.JWT_SECRET, { expiresIn: 3600000 },
                (err, token) => {
                    console.log("token in api/auth.js", { token })
                    if (err) throw err;

                    res.json({ token, email: user.email });
                });

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');

        }
    });




module.exports = router

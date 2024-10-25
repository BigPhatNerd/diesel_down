const express = require('express');
const router = express.Router();
const { Appointment, User } = require('../../models');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

//@route GET api/appointment/all
//@desc Get all appointments
//@access Public
router.get('/all', async (req, res) => {
	try {
		const appointments = await Appointment.find().populate('user', ['email']);
		res.json(appointments);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route GET api/appointment/me
//@desc Get current user's appointment
//@access Private
router.get('/me', auth, async (req, res) => {
	try {
		const appointments = await Appointment.find({ user: req.user.id });
		if (!appointments.length) {
			return res.status(400).json({ msg: 'No appointments found for this user' });
		}
		res.json(appointments);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

//@route POST api/appointment
//@desc Create a new appointment for the user
//@access Private
router.post('/', auth, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const newAppointment = new Appointment({
			...req.body,
			user: req.user.id
		});

		await newAppointment.save();
		res.json(newAppointment);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});


//@route GET api/appointment/user/:user_id
//@desc Get appointments by user ID
//@access Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const appointments = await Appointment.find({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
		if (!appointments) return res.status(400).json({ msg: 'Appointment not found' });
		res.json(appointments);
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Appointments not found' });
		}
		res.status(500).send('Server error');
	}
});

//@route DELETE api/appointment
//@desc Delete user's appointment and user profile
//@access Private
router.delete('/', auth, async (req, res) => {
	try {
		// Remove appointment
		await Appointment.findOneAndRemove({ user: req.user.id });
		// Remove user
		await User.findOneAndRemove({ _id: req.user.id });
		res.json({ msg: 'User and appointment deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;

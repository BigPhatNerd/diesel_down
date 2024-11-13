const express = require('express');
const multer = require('multer');
const upload = multer();
const router = express.Router();
const { Appointment, User } = require('../../models');

// @route POST /webhooks/jotform
// @desc Handle incoming webhook from JotForm
// @access Public
router.post('/jotform/book-dyno', async (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString(); // Collect chunks into `body`
    });

    req.on('end', async () => {
        const match = body.match(/name="rawRequest"\r\n\r\n([\s\S]*?)\r\n--------------------------/);
        if (match && match[1]) {
            try {
                const parsedData = JSON.parse(match[1]);

                const appointmentData = {
                    name: parsedData.q3_name,
                    email: parsedData.q4_email,
                    phone: parsedData.q5_celPhone.full,
                    address: {
                        line1: parsedData.q6_address.addr_line1,
                        line2: parsedData.q6_address.addr_line2,
                        city: parsedData.q6_address.city,
                        state: parsedData.q6_address.state,
                        postal: parsedData.q6_address.postal,
                    },
                    appointmentDetails: {
                        implementation: parsedData.q8_appointment.implementation,
                        date: parsedData.q8_appointment.date,
                        duration: parseInt(parsedData.q8_appointment.duration, 10),
                        timezone: parsedData.q8_appointment.timezone,
                    },
                    vehicle: {
                        vin: parsedData.q9_vehicleVin,
                        info: parsedData.q12_vehicleInfo.replace(/\+/g, ' '),
                        engineType: parsedData.q13_engineType,
                        transmissionType: parsedData.q14_transmissionType,
                    },
                    tuningGoal: parsedData.q15_tuningGoal,
                    primaryUse: parsedData.q16_primaryUse,
                    knownIssues: parsedData.q17_knownMechanical,
                    eventId: parsedData.event_id,
                };

                const appointment = new Appointment(appointmentData);
                await appointment.save();

                // Associate with a user (if user email exists)
                const user = await User.findOne({ email: parsedData.q4_email });
                if (user) {
                    user.appointments.push(appointment._id);
                    await user.save();
                }

                res.status(201).json({ msg: 'Appointment saved successfully', appointment });
            } catch (error) {
                console.error('Error processing appointment:', error);
                res.status(400).send('Error processing appointment');
            }
        } else {
            console.error('rawRequest not found');
            res.status(400).send('rawRequest field not found in the payload');
        }
    });

    req.on('error', (err) => {
        console.error('Error receiving data:', err.message);
        res.status(500).send('Server Error');
    });
});

router.post('/jotform/login', async (req, res) => { })

module.exports = router;

const { Schema, model } = require('mongoose');

const AppointmentSchema = new Schema({
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true },
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
        line1: { type: String, required: true },
        line2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postal: { type: String, required: true },
    },
    appointmentDetails: {
        implementation: { type: String, required: true },
        date: { type: Date, required: true },
        duration: { type: Number, required: true },
        timezone: { type: String, required: true },
    },
    vehicle: {
        vin: { type: String, required: true },
        info: { type: String, required: true },
        engineType: { type: String, required: true },
        transmissionType: { type: String, required: true },
    },
    tuningGoal: { type: String, required: true },
    primaryUse: { type: String, required: true },
    knownIssues: { type: String },
    eventId: { type: String, required: true },
});

const Appointment = model('Appointment', AppointmentSchema);
module.exports = Appointment;

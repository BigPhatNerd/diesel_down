const { Schema, model } = require('mongoose');

const AppointmentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    celPhone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    vehicleVIN: {
        type: String,
        required: true
    },
    vehicleInfoAndUpgrades: {
        type: String,
        required: true
    },
    vehiclePics: {
        type: [String], // Store file paths or URLs for uploaded pics
    },
    vehicleVideos: {
        type: [String], // Store file paths or URLs for uploaded videos
    },
    desiredMusic: {
        type: String
    },
    selectedOptions: [
        {
            name: String,
            descr: String,
            price: Number,
            id: Number
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Appointment = model('Appointment', AppointmentSchema);
module.exports = Appointment;

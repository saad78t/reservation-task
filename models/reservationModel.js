const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  ReservationId: {
    type: Number,
    required: [true, 'A patient must have a reservation ID'],
  },
  PatientName: {
    type: String,
    required: [true, 'A patient must have a name'],
    trim: true,
    maxlength: [
      40,
      'A Patient name must have less or equal than 40 characters',
    ],
    minlength: [5, 'A Patient name must have more or equal than 5 characters'],
  },
  PatientPhone: {
    type: Number,
    required: [true, 'A patient must have a phone number'],
  },
  ReservationDate: {
    type: Date,
    required: [true, 'A patient must have a reservation date'],
    trim: true,
  },
  ReservationTime: {
    type: String,
    required: [true, 'A patient must have a time'],
    trim: true,
    unique: [true, 'This time is already boocked!. Please select another time'],
  },
  Description: {
    type: String,
    trim: true,
    maxlength: [
      40,
      'A Patient description status must have less or equal than 60 characters',
    ],
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;

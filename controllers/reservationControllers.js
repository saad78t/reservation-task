const Reservation = require('./../models/reservationModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.aliasResevationsAday = async (req, res, next) => {
  req.query.limit = 4;
  req.query.sort = 'ReservationDate';
  req.query.fields =
    'ReservationId,PatientName,PatientPhone,ReservationDate,ReservationTime';
  next();
};

exports.getAllReservations = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Reservation.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const allReservations = await features.query;

  res.status(200).json({
    status: 'success',
    result: allReservations.length,
    data: {
      allReservations,
    },
  });
});

exports.getReservation = catchAsync(async (req, res, next) => {
  const oneReservation = await Reservation.findById(req.params.id);

  if (!oneReservation) {
    return next(new AppError('No reservation found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      oneReservation,
    },
  });
});

exports.createReservation = catchAsync(async (req, res, next) => {
  const newReservation = await Reservation.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      newReservation,
    },
  });
});

exports.updateReservation = catchAsync(async (req, res, next) => {
  const update = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!update) {
    return next(new AppError('No reservation found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      update,
    },
  });
});

exports.deleteReservation = catchAsync(async (req, res, next) => {
  const oneReservation = await Reservation.findByIdAndDelete(req.params.id);
  if (!oneReservation) {
    return next(new AppError('No reservation found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

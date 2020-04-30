const express = require('express');
const app = express();

app.use(express.json());
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const reservationRouter = require('./routes/reservationRoutes');
const userRouter = require('./routes/userRoutes');

app.use(morgan('dev'));

app.use('/api/v1/reservations', reservationRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

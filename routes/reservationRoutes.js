const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/reservationControllers');
const authController = require('./../controllers/authController');

router
  .route('/reservations-a-day')
  .get(controllers.aliasResevationsAday, controllers.getAllReservations);
router
  .route('/')
  .get(authController.protect, controllers.getAllReservations)
  .post(controllers.createReservation);
router
  .route('/:id')
  .get(controllers.getReservation)
  .patch(controllers.updateReservation)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    controllers.deleteReservation
  );

module.exports = router;

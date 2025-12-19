const express = require("express");
const bookingRouter = express.Router();
const bookingController = require("../Controllers/bookingController");
const authController = require("../Controllers/authController");

bookingRouter.route("/")
    .get(bookingController.getAllBookings)
    .post(authController.protect, bookingController.createBooking);

bookingRouter.route("/my-bookings")
    .get(authController.protect, bookingController.getMyBookings);

bookingRouter.route("/:id")
    .get(bookingController.getBooking)
    .patch(bookingController.updateBooking);

bookingRouter.route("/user/:userId")
    .get(bookingController.getUserBookings);

bookingRouter.route("/provider/:providerId")
    .get(bookingController.getProviderBookings);

module.exports = bookingRouter;
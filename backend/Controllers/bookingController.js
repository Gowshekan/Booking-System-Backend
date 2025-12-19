const Booking = require("../Models/Booking");

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json({
            status: "success",
            results: bookings.length,
            bookings
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                status: "fail",
                message: "Booking not found"
            });
        }
        res.status(200).json({
            status: "success",
            booking
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.createBooking = async (req, res) => {
    try {
        const { service, customer, provider, date, time, address, totalAmount } = req.body;
        
        if (!service || !customer || !provider || !date || !time || !address || !totalAmount) {
            return res.status(400).json({
                status: "fail",
                message: "Missing required fields"
            });
        }
        
        const newBooking = await Booking.create(req.body);
        
        res.status(201).json({
            status: "success",
            booking: newBooking
        });
    } catch (error) {
        console.error('Booking creation error:', error);
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!booking) {
            return res.status(404).json({
                status: "fail",
                message: "Booking not found"
            });
        }
        res.status(200).json({
            status: "success",
            booking
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({customer: req.params.userId});
        res.status(200).json({
            status: "success",
            results: bookings.length,
            bookings
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({customer: req.user._id});
        res.status(200).json({
            status: "success",
            results: bookings.length,
            bookings
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

exports.getProviderBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({provider: req.params.providerId});
        res.status(200).json({
            status: "success",
            results: bookings.length,
            bookings
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};
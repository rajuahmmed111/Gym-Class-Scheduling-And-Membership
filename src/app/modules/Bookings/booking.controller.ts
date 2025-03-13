import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookingService } from './booking.service';

// Create a new booking
const createBooking = catchAsync(async (req, res) => {
  const { classScheduleId } = req.body;
  const traineeId = req.user.id;

  const result = await BookingService.createBooking(traineeId, classScheduleId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

// Get booking by ID
const getBookingById = catchAsync(async (req, res) => {
  const { bookingId } = req.params;

  const result = await BookingService.getBookingById(bookingId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking retrieved successfully',
    data: result,
  });
});

// Get my bookings 
const getMyBookings = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const result = await BookingService.getMyBookings(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

// Cancel booking
const cancelBooking = catchAsync(async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user.id 

  const result = await BookingService.cancelBooking(bookingId, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking cancelled successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getBookingById,
  getMyBookings,
  cancelBooking
};

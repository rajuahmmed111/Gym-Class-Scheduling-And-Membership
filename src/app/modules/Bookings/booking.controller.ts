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

export const BookingController = {
  createBooking,
};

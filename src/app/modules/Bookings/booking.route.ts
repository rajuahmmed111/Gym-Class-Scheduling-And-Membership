import express from 'express';
import auth from '../../middleware/auth';
import { Role } from '@prisma/client';
import { BookingController } from './booking.controller';

const router = express.Router();

// Get booking by ID
router.get('/:id', auth(), BookingController.getBookingById);


// Get my bookings (for trainee)
router.get('/my-bookings', auth(), BookingController.getMyBookings);

// Get bookings by class schedule (for admin and trainer)
router.get(
  '/class-schedule/:classScheduleId',
  auth(Role.ADMIN, Role.TRAINER),
  BookingController.getBookingsByClassSchedule
);

// Create a new booking (only TRAINEE)
router.post('/create', auth(Role.TRAINEE), BookingController.createBooking);

// Cancel booking
router.patch('/:id/cancel', auth(), BookingController.cancelBooking);

export const bookingRoute = router;

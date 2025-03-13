import { Role } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';

// Create a new booking
const createBooking = async (traineeId: string, classScheduleId: string) => {
  // Check if trainee exists and is a TRAINEE
  const trainee = await prisma.user.findUnique({
    where: { id: traineeId },
  });

  if (!trainee) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid trainee');
  }

  // Check if class schedule exists
  const classSchedule = await prisma.classSchedule.findUnique({
    where: { id: classScheduleId },
  });
  if (!classSchedule) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class schedule not found');
  }

  // // Check if class is future
  // if (classSchedule.startTime < new Date()) {
  //   throw new ApiError(httpStatus.FORBIDDEN, 'Class is already started');
  // }

  // Check if class has available slots (max 10 trainees)
  const totalBookings = await prisma.booking.count({
    where: { classScheduleId },
  });
  if (totalBookings >= 10) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Class is full');
  }

  // Check if trainee has already booked this class
  const existingBooking = await prisma.booking.findFirst({
    where: {
      traineeId,
      classScheduleId,
    },
  });
  if (existingBooking) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Trainee has already booked this class'
    );
  }

  // Create a new booking
  const booking = await prisma.booking.create({
    data: { traineeId, classScheduleId },
  });

  return booking;
};

// Get booking by ID
const getBookingById = async (bookingId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  return booking;
};

// Get my bookings
const getMyBookings = async (userId: string) => {
  const bookings = await prisma.booking.findMany({
    where: { traineeId: userId },
  });
  if (!bookings) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No bookings found');
  }
  return bookings;
};

// todo: implement role  logic here
// Get bookings by class schedule (for admin and trainer)
const getBookingsByClassSchedule = async (
  classScheduleId: string,
  role: Role
) => {
  if (role === Role.ADMIN || role === Role.TRAINER) {
    const bookings = await prisma.booking.findMany({
      where: { classScheduleId },
    });
    if (!bookings) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No bookings found');
    }
    return bookings;
  } else {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not authorized to view this data'
    );
  }
};

// Cancel booking
const cancelBooking = async (bookingId: string, userId: string) => {
  // user validation
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // booking validation
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  // Only the booking owner or the admin can cancel the booking
  const isTrainee = user.id === booking.traineeId;
  const isAdmin = user.role === Role.ADMIN;
  if (!isTrainee && !isAdmin) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You are not authorized to cancel this booking'
    );
  }

  // Update the booking status to CANCELLED
  booking.status = 'CANCELLED';
  await prisma.booking.update({ where: { id: bookingId }, data: booking });

  return booking;
};

export const BookingService = {
  createBooking,
  getBookingById,
  getMyBookings,
  getBookingsByClassSchedule,
  cancelBooking,
};

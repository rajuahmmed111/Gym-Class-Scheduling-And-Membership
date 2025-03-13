import express from 'express';
import { authRoutes } from '../modules/Auth/auth.routes';
import { userRoute } from '../modules/User/user.route';
import path from 'path';
import { bookingRoute } from '../modules/Bookings/booking.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/bookings',
    route: bookingRoute
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

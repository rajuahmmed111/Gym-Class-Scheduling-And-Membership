# Project Title: Gym Management System

# Live Demo

# Entity-Relationship (ER) Diagram

# Installation and Setup

       1. Clone the repository : https://github.com/rajuahmmed111/Gym-Class-Scheduling-And-Membership.git

       Create a .env file:
        In the root directory of the project, create a .env file and add the following variables. Adjust the values according to your setup.

        # Basic
        NODE_ENV=development # do not add this when deploying to production
DATABASE_URL="mongodb+srv://ticket-management-system:eEdx5K0CP5kDIsoa@cluster0.wqymbxc.mongodb.net/ticket-management-system?retryWrites=true&w=majority&appName=Cluster0"
PORT = 5000

JWT_SECRET=8cae8bb543258529ea845512a6190994cac61b323cb84dba2bedf27cb
35bae7b4a4ae45e92f6d5c7e4199481bd0c5cbe9ac694e2d693b90d0d5
3f4691acdf38a
EXPIRES_IN=1d
REFRESH_TOKEN_SECRET=54c97a8391e5ad06f3cbd09ca23439ed82f1c06029694a815011b4a4b
bc504e4e8400b61540cb0986da43f571f76e0b7e2b2a6f20d69564c342
9ebaa63e58173
REFRESH_TOKEN_EXPIRES_IN=7d
RESET_PASS_TOKEN=3e4f8b9a7f8c5b1e4e7e5d9b7190d6f5 
RESET_PASS_TOKEN_EXPIRES_IN=1h


   # Features
Authentication API: Complete authentication system using JWT for secure token-based authentication and bcrypt for password hashing.
File Upload: Implemented using Multer with efficient file handling and short-term storage.
Data Validation: Robust data validation using Zod and Prisma
Logging: Logging with Winston and file rotation using DailyRotateFile.
API Request Logging: Logging API requests using Morgan

# Tech Stack
Typescript,
Node.js,
Express,
Mongoose
Bcrypt
JWT
NodeMailer
Multer
ESLint
Prettier
Winston
Daily-winston-rotate-file
Morgen


# Getting Started
Follow these steps to set up and run the project locally.

 Prerequisites
Ensure you have the following installed:

Node.js

# Uber Backend API

A comprehensive backend API for an Uber-like ride-sharing application built with Node.js, TypeScript, Express, and Appwrite.

## Features

- **User Management**: Complete CRUD operations for users, drivers, and riders
- **Vehicle Management**: Car registration and management for drivers
- **Payment System**: Multiple payment method support (cash, card, wallet)
- **Ride Management**: Complete ride lifecycle from booking to completion
- **Rating System**: Driver and rider rating functionality
- **Background Checks**: Driver verification and background check management
- **Real-time Data**: Active ride tracking and status updates

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: Appwrite (NoSQL)
- **Authentication**: Appwrite Auth
- **File Storage**: Appwrite Storage

## Project Structure

```
src/
├── config/
│   └── appwrite.ts          # Appwrite configuration
├── controllers/
│   ├── userController.ts    # User management
│   ├── driverController.ts  # Driver operations
│   ├── riderController.ts   # Rider operations
│   ├── carController.ts     # Vehicle management
│   ├── paymentMethodController.ts # Payment methods
│   └── rideController.ts    # Ride operations
├── models/
│   ├── userModel.ts         # User data layer
│   ├── driverModel.ts       # Driver data layer
│   ├── riderModel.ts        # Rider data layer
│   ├── carModel.ts          # Car data layer
│   ├── paymentMethodModel.ts # Payment method data layer
│   └── rideModel.ts         # Ride data layer
├── routes/
│   ├── userRoutes.ts        # User endpoints
│   ├── driverRoutes.ts      # Driver endpoints
│   ├── riderRoutes.ts       # Rider endpoints
│   ├── carRoutes.ts         # Car endpoints
│   ├── paymentMethodRoutes.ts # Payment method endpoints
│   ├── rideRoutes.ts        # Ride endpoints
│   └── index.ts             # Route aggregation
├── types/
│   └── models.ts            # TypeScript interfaces
└── index.ts                 # Application entry point
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Appwrite account and project

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd uber-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   APPWRITE_PROJECT_ID=your_project_id
   APPWRITE_API_KEY=your_api_key
   APPWRITE_DATABASE_ID=uber_db
   PORT=3000
   ```

4. **Appwrite Setup**
   
   Create the following collections in your Appwrite project:
   
   ### Users Collection
   - `user_id` (string, required)
   - `role` (string, required, enum: driver, rider)
   - `first_name` (string, required)
   - `last_name` (string, required)
   - `phone` (string, optional)
   - `email` (string, optional)
   - `profile_image_id` (string, optional)

   ### Drivers Collection
   - `rating` (number, required)
   - `verified` (boolean, required)
   - `background_check_status` (string, required, enum: pending, passed, failed)
   - `background_check_expires_at` (string, optional)
   - `driver_license_number` (string, required)
   - `license_expires_at` (string, required)
   - `driver_license_image_id` (string, optional)
   - `car` (string, optional, relationship to cars)
   - `user` (string, optional, relationship to users)
   - `paymentMethod` (string, optional, relationship to payment_methods)

   ### Riders Collection
   - `home_address` (string, optional)
   - `work_address` (string, optional)
   - `total_rides` (number, required)
   - `average_rating` (number, required)
   - `user` (string, optional, relationship to users)
   - `paymentMethod` (string, optional, relationship to payment_methods)

   ### Cars Collection
   - `vehicle_plate` (string, required)
   - `vehicle_model` (string, required)
   - `vehicle_year` (number, required)
   - `car_seats` (number, required)
   - `insurance_expires_at` (string, required)
   - `car_image_id` (string, optional)
   - `license_image_id` (string, optional)
   - `driver` (string, optional, relationship to drivers)

   ### Payment Methods Collection
   - `method` (string, required, enum: cash, card, wallet)
   - `details` (string, optional)

   ### Rides Collection
   - `origin_address` (string, required)
   - `destination_address` (string, required)
   - `origin_latitude` (number, required)
   - `origin_longitude` (number, required)
   - `destination_latitude` (number, required)
   - `destination_longitude` (number, required)
   - `ride_time` (number, required)
   - `fare_price` (number, required)
   - `payment_status` (string, required, enum: paid, pending, failed)
   - `drivers` (string, optional, relationship to drivers)
   - `riders` (string, optional, relationship to riders)

   ### Ride History Collection
   - `rides` (string, optional, relationship to rides)
   - `riders` (string, optional, relationship to riders)
   - `drivers` (string, optional, relationship to drivers)

   Create the following storage buckets:
   - `profile_images`
   - `car_images`
   - `license_images`

5. **Build the project**
   ```bash
   npm run build
   ```

6. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Documentation

The complete API documentation is available in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm start` - Start production server
- `npm run clean` - Clean build directory
- `npm run seedDrivers` - Seed sample driver data
- `npm run seedRiders` - Seed sample rider data
- `npm run seedRides` - Seed sample ride data

## Database Relationships

The application uses the following relationships:

- **User** ↔ **Driver/Rider** (one-to-one)
- **Driver** ↔ **Car** (one-to-one)
- **Driver/Rider** ↔ **PaymentMethod** (one-to-one)
- **Driver** ↔ **Ride** (one-to-many)
- **Rider** ↔ **Ride** (one-to-many)

## Error Handling

The API includes comprehensive error handling:

- **400** - Bad Request (validation errors)
- **404** - Not Found
- **409** - Conflict (resource already exists)
- **500** - Internal Server Error

All errors return a consistent format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

## Validation

The API includes comprehensive input validation:

- Required field validation
- Data type validation
- Range validation (coordinates, ratings, etc.)
- Enum validation (payment methods, statuses, etc.)
- Business logic validation

## Security

- Input sanitization and validation
- Proper error handling without exposing sensitive information
- Environment variable configuration
- Appwrite authentication integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please open an issue in the repository.

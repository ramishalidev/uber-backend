# Uber Backend API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
All endpoints require proper authentication. Include your Appwrite API key in the request headers.

## Response Format
All API responses follow this format:
```json
{
  "success": true/false,
  "data": {...} or "message": "...",
  "error": "..." // only on errors
}
```

---

## Users API

### Create User
**POST** `/users`
```json
{
  "user_id": "appwrite_auth_uid",
  "role": "driver" | "rider",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890",
  "email": "john@example.com",
  "profile_image_id": "image_id"
}
```

### Get User by ID
**GET** `/users/:id`

### Get User by Auth UID
**GET** `/users/by-user-id/:userId`

### Update User
**PUT** `/users/:id`
```json
{
  "first_name": "Jane",
  "last_name": "Smith",
  "phone": "+1234567890"
}
```

### Delete User
**DELETE** `/users/:id`

### List Users
**GET** `/users?role=driver&limit=20&offset=0`

---

## Payment Methods API

### Create Payment Method
**POST** `/payment-methods`
```json
{
  "method": "card" | "cash" | "wallet",
  "details": "Visa ending in 1234"
}
```

### Get Payment Method
**GET** `/payment-methods/:id`

### Update Payment Method
**PUT** `/payment-methods/:id`
```json
{
  "method": "wallet",
  "details": "Digital wallet"
}
```

### Delete Payment Method
**DELETE** `/payment-methods/:id`

### List Payment Methods
**GET** `/payment-methods?method=card&limit=20&offset=0`

---

## Cars API

### Create Car
**POST** `/cars`
```json
{
  "vehicle_plate": "ABC123",
  "vehicle_model": "Toyota Camry",
  "vehicle_year": 2020,
  "car_seats": 4,
  "insurance_expires_at": "2024-12-31T23:59:59Z",
  "car_image_id": "car_image_id",
  "license_image_id": "license_image_id",
  "driver": "driver_document_id"
}
```

### Get Car by ID
**GET** `/cars/:id`

### Get Car by Driver
**GET** `/cars/by-driver/:driverId`

### Update Car
**PUT** `/cars/:id`
```json
{
  "vehicle_model": "Honda Accord",
  "car_seats": 5
}
```

### Delete Car
**DELETE** `/cars/:id`

### List Cars
**GET** `/cars?driver=driver_id&limit=20&offset=0`

---

## Drivers API

### Create Driver
**POST** `/drivers`
```json
{
  "rating": 4.5,
  "verified": true,
  "background_check_status": "passed",
  "background_check_expires_at": "2024-12-31T23:59:59Z",
  "driver_license_number": "DL123456789",
  "license_expires_at": "2025-06-30T23:59:59Z",
  "driver_license_image_id": "license_image_id",
  "car": "car_document_id",
  "user": "user_document_id",
  "paymentMethod": "payment_method_id"
}
```

### Get Driver by ID
**GET** `/drivers/:id`

### Get Driver by User
**GET** `/drivers/by-user/:userId`

### Get Verified Drivers
**GET** `/drivers/verified/list`

### Update Driver
**PUT** `/drivers/:id`
```json
{
  "rating": 4.8,
  "verified": true,
  "background_check_status": "passed"
}
```

### Delete Driver
**DELETE** `/drivers/:id`

### List Drivers
**GET** `/drivers?verified=true&background_check_status=passed&limit=20&offset=0`

---

## Riders API

### Create Rider
**POST** `/riders`
```json
{
  "home_address": "123 Main St, City, State",
  "work_address": "456 Business Ave, City, State",
  "total_rides": 0,
  "average_rating": 0,
  "user": "user_document_id",
  "paymentMethod": "payment_method_id"
}
```

### Get Rider by ID
**GET** `/riders/:id`

### Get Rider by User
**GET** `/riders/by-user/:userId`

### Update Rider
**PUT** `/riders/:id`
```json
{
  "home_address": "789 New St, City, State",
  "total_rides": 5
}
```

### Delete Rider
**DELETE** `/riders/:id`

### List Riders
**GET** `/riders?limit=20&offset=0`

### Increment Rides Count
**PATCH** `/riders/:id/increment-rides`

### Update Rating
**PATCH** `/riders/:id/rating`
```json
{
  "rating": 4.5
}
```

---

## Rides API

### Create Ride
**POST** `/rides`
```json
{
  "origin_address": "123 Start St, City, State",
  "destination_address": "456 End Ave, City, State",
  "origin_latitude": 40.7128,
  "origin_longitude": -74.0060,
  "destination_latitude": 40.7589,
  "destination_longitude": -73.9851,
  "ride_time": 1800,
  "fare_price": 25.50,
  "payment_status": "pending",
  "drivers": "driver_document_id",
  "riders": "rider_document_id"
}
```

### Get Ride by ID
**GET** `/rides/:id`

### Get Rides by Driver
**GET** `/rides/by-driver/:driverId`

### Get Rides by Rider
**GET** `/rides/by-rider/:riderId`

### Get Active Rides
**GET** `/rides/active/list`

### Update Ride
**PUT** `/rides/:id`
```json
{
  "fare_price": 30.00,
  "payment_status": "paid"
}
```

### Delete Ride
**DELETE** `/rides/:id`

### List Rides
**GET** `/rides?payment_status=pending&limit=20&offset=0`

### Update Payment Status
**PATCH** `/rides/:id/payment-status`
```json
{
  "status": "paid"
}
```

---

## Error Codes

- `400` - Bad Request (validation errors)
- `404` - Not Found
- `409` - Conflict (resource already exists)
- `500` - Internal Server Error

## Query Parameters

### Pagination
- `limit` - Number of items per page (default: 20)
- `offset` - Number of items to skip (default: 0)

### Filtering
- `role` - Filter users by role (driver/rider)
- `method` - Filter payment methods by type
- `driver` - Filter cars by driver ID
- `verified` - Filter drivers by verification status
- `background_check_status` - Filter drivers by background check status
- `payment_status` - Filter rides by payment status

## Environment Variables

Create a `.env` file with the following variables:

```env
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key
APPWRITE_DATABASE_ID=uber_db
```

## Database Collections

The following collections need to be created in Appwrite:

1. `users` - User profiles
2. `drivers` - Driver information
3. `riders` - Rider information
4. `cars` - Vehicle information
5. `payment_methods` - Payment method details
6. `rides` - Ride records
7. `ride_history` - Ride history (read model)

## Storage Buckets

The following storage buckets need to be created:

1. `profile_images` - User profile pictures
2. `car_images` - Vehicle images
3. `license_images` - Driver license images

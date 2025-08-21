// ── base identity
export interface User {
  $id?: string;
  user_id: string;        // Appwrite Auth UID
  role: 'driver' | 'rider';
  first_name: string;
  last_name: string;
  phone?: string;
  email?: string;
  profile_image_id?: string;
}

// ── payment
export interface PaymentMethod {
  $id?: string;
  method: 'cash' | 'card' | 'wallet';
  details?: string;
}

// ── car
export interface Car {
  $id?: string;
  vehicle_plate: string;
  vehicle_model: string;
  vehicle_year: number;
  car_seats: number;
  insurance_expires_at: string; // ISO datetime
  car_image_id?: string;
  driver?: string;      // drivers.$id  (relationship)
}

// ── driver
export interface Driver {
  $id?: string;
  rating: number;
  verified: boolean;
  background_check_status: 'pending' | 'passed' | 'failed';
  background_check_expires_at?: string;
  driver_license_number: string;
  license_expires_at: string;
  driver_license_image_id?: string;
  car?: string;         // cars.$id      (relationship)
  user?: string;        // users.$id     (relationship)
  paymentMethod?: string; // paymentMethods.$id
}

// ── rider
export interface Rider {
  $id?: string;
  home_address?: string;
  work_address?: string;
  total_rides: number;
  average_rating: number;
  users?: string;                // users.$id
  paymentMethod?: string;       // paymentMethods.$id
}

// ── ride
export interface Ride {
  $id?: string;
  origin_address: string;
  destination_address: string;
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
  ride_time: number; // seconds
  fare_price: number;
  payment_status: 'paid' | 'pending' | 'failed';
  drivers?: string;   // drivers.$id
  riders?: string;    // riders.$id
}

// ── ride history (flat read model)
export interface RideHistory {
  $id?: string;
  rides?: string;    // rides.$id
  riders?: string;   // riders.$id
  drivers?: string;  // drivers.$id
}
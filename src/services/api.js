/**
 * API Service Module - Single Responsibility Principle
 * Responsible for handling all API calls and data operations
 */

// Simulate API delay
const API_DELAY = 1000; // 1 second

// Simulate occasional errors (10% chance)
const ERROR_RATE = 0.1;

/**
 * Simulates a network delay
 * @param {number} ms - Delay in milliseconds
 * @returns {Promise} - Promise that resolves after delay
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Simulates API error
 * @returns {boolean} - True if error should occur
 */
const shouldSimulateError = () => Math.random() < ERROR_RATE;

/**
 * Creates a new reservation
 * @param {Object} reservationData - Reservation data
 * @param {string} reservationData.firstName - First name
 * @param {string} reservationData.lastName - Last name
 * @param {string} reservationData.date - Reservation date (YYYY-MM-DD)
 * @param {number} reservationData.guests - Number of guests
 * @returns {Promise<Object>} - Promise that resolves with reservation confirmation
 * @throws {Error} - Throws error if reservation fails
 */
export const createReservation = async (reservationData) => {
  try {
    // Validate input data
    if (!reservationData || typeof reservationData !== 'object') {
      throw new Error('Invalid reservation data');
    }

    const { firstName, lastName, date, guests } = reservationData;

    // Validate required fields
    if (!firstName || !lastName || !date || !guests) {
      throw new Error('All fields are required');
    }

    // Validate data types
    if (typeof firstName !== 'string' || typeof lastName !== 'string') {
      throw new Error('Name fields must be strings');
    }

    if (typeof guests !== 'number' || guests < 1 || guests > 20) {
      throw new Error('Number of guests must be between 1 and 20');
    }

    // Validate date format and range
    const reservationDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 1);

    if (isNaN(reservationDate.getTime())) {
      throw new Error('Invalid date format');
    }

    if (reservationDate < tomorrow) {
      throw new Error('Reservation date must be tomorrow or later');
    }

    if (reservationDate > maxDate) {
      throw new Error('Reservation date cannot be more than one month ahead');
    }

    // Simulate API delay
    await delay(API_DELAY);

    // Simulate occasional errors
    if (shouldSimulateError()) {
      throw new Error('Reservation service temporarily unavailable. Please try again.');
    }

    // Simulate successful reservation
    const reservationId = `RES-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const confirmation = {
      id: reservationId,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      date: date,
      guests: guests,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      confirmationCode: Math.random().toString(36).substr(2, 8).toUpperCase()
    };

    return confirmation;

  } catch (error) {
    // Re-throw validation errors
    if (error.message.includes('Invalid') || 
        error.message.includes('required') || 
        error.message.includes('must be') ||
        error.message.includes('cannot be')) {
      throw error;
    }

    // Handle unexpected errors
    console.error('Reservation API Error:', error);
    throw new Error('An unexpected error occurred. Please try again.');
  }
};

/**
 * Checks availability for a specific date
 * @param {string} date - Date to check (YYYY-MM-DD)
 * @returns {Promise<Object>} - Promise that resolves with availability info
 */
export const checkAvailability = async (date) => {
  try {
    await delay(500); // Shorter delay for availability check

    // Simulate availability check
    const isAvailable = Math.random() > 0.1; // 90% chance of availability
    
    return {
      date: date,
      available: isAvailable,
      maxGuests: isAvailable ? 20 : 0,
      message: isAvailable 
        ? 'Tische verfügbar' 
        : 'Leider keine Verfügbarkeit für dieses Datum'
    };

  } catch (error) {
    console.error('Availability check error:', error);
    throw new Error('Verfügbarkeitsprüfung fehlgeschlagen');
  }
};

/**
 * Gets reservation by ID
 * @param {string} reservationId - Reservation ID
 * @returns {Promise<Object>} - Promise that resolves with reservation details
 */
export const getReservation = async (reservationId) => {
  try {
    await delay(API_DELAY);

    if (!reservationId) {
      throw new Error('Reservation ID is required');
    }

    // Simulate reservation lookup
    if (Math.random() < 0.1) {
      throw new Error('Reservation not found');
    }

    return {
      id: reservationId,
      status: 'confirmed',
      // ... other reservation details
    };

  } catch (error) {
    console.error('Get reservation error:', error);
    throw error;
  }
};

// Export all API functions
export default {
  createReservation,
  checkAvailability,
  getReservation
};

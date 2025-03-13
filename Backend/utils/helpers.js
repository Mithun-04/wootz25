const moment = require('moment'); // Optional: Use moment.js for date formatting
const { v4: uuidv4 } = require('uuid'); // To generate unique identifiers

// Function to sanitize input (e.g., removing unnecessary spaces and trimming strings)
const sanitizeInput = (input) => {
    if (typeof input === 'string') {
        return input.trim(); // Trim the string to remove leading/trailing spaces
    }
    return input;
};

// Function to format date (e.g., in YYYY-MM-DD format)
const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD'); // Format date using moment.js
};

// Function to generate a unique identifier (UUID)
const generateUUID = () => {
    return uuidv4(); // Generates a unique identifier using UUID v4
};

// Function to validate email format using regex
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email); // Returns true if valid, false otherwise
};

// Function to calculate the difference between two dates in days
const dateDiffInDays = (startDate, endDate) => {
    const start = moment(startDate);
    const end = moment(endDate);
    return end.diff(start, 'days'); // Difference in days between two dates
};

module.exports = {
    sanitizeInput,
    formatDate,
    generateUUID,
    validateEmail,
    dateDiffInDays,
};

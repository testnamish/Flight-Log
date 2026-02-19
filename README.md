# Flight Management System

A simple flight management system built with Node.js and Express.

## Features

- Add new flights with details (Flight Number, Aircraft Type, Origin, Destination, Departure Time)
- View all flights in a table
- Mark flights as departed
- Form validation
- Responsive design

## Technologies Used

- Backend: Node.js, Express.js
- Frontend: HTML5, CSS3, JavaScript
- Storage: JSON file

## Setup Instructions

### Prerequisites
You need to have Node.js installed on your computer. Download it from https://nodejs.org/

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/flight-management-system.git
cd flight-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## How to Use

1. Add Flight: Fill in the form on the homepage and click "Add Flight"
2. View Flights: Click "View Flights" to see all flights in a table
3. Mark as Departed: Click the "Mark as Departed" button to update flight status

## Project Structure

```
flight-management-system/
├── public/
│   ├── index.html      - Homepage with add flight form
│   ├── flights.html    - View flights page
│   ├── styles.css      - CSS styling
│   └── script.js       - Client-side JavaScript
├── server.js           - Express server
├── package.json        - Project dependencies
└── README.md           - Documentation
```

## API Endpoints

- POST /add-flight - Add a new flight
- GET /flights - View flights page
- GET /api/flights - Get all flights as JSON
- PATCH /update-status/:id - Update flight status to DEPARTED

## Future Improvements

- Add search and filter functionality
- Implement flight deletion
- Add more status types (delayed, cancelled, etc.)
- Add pagination for large datasets

## Author
- Namish G S

Created as part of a coding assignment to demonstrate full-stack development skills.

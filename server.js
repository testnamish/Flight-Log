const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'flights.json');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize flights.json if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

// Helper function to read flights from JSON file
function readFlights() {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
}

// Helper function to write flights to JSON file
function writeFlights(flights) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(flights, null, 2));
}

// Route: Serve homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route: Add new flight
app.post('/add-flight', (req, res) => {
    const { flightNumber, aircraftType, origin, destination, scheduledDeparture } = req.body;

    // Basic validation
    if (!flightNumber || !aircraftType || !origin || !destination || !scheduledDeparture) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const flights = readFlights();

    // Create new flight object
    const newFlight = {
        id: Date.now().toString(), // Simple ID generation
        flightNumber,
        aircraftType,
        origin,
        destination,
        scheduledDeparture,
        status: 'SCHEDULED',
        createdAt: new Date().toISOString()
    };

    flights.push(newFlight);
    writeFlights(flights);

    res.redirect('/flights');
});

// Route: Get all flights (render flights page)
app.get('/flights', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'flights.html'));
});

// Route: API to get flights data as JSON
app.get('/api/flights', (req, res) => {
    const flights = readFlights();
    res.json(flights);
});

// Route: Update flight status
app.patch('/update-status/:id', (req, res) => {
    const { id } = req.params;
    const flights = readFlights();

    const flightIndex = flights.findIndex(flight => flight.id === id);

    if (flightIndex === -1) {
        return res.status(404).json({ error: 'Flight not found' });
    }

    flights[flightIndex].status = 'DEPARTED';
    writeFlights(flights);

    res.json({ message: 'Flight status updated successfully', flight: flights[flightIndex] });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Open your browser and go to http://localhost:${PORT}`);
});

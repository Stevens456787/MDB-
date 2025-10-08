const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const User = require('./models/user');
const Location = require('./models/location');
const cors = require('cors');
require('dotenv').config({ path: 'C:/Users/Rnyamari/Music/MDB/Mongodb/.env' });

console.log('Environment Variables:', process.env.MONGODB_URI);

const app = express();

// Serve favicon
app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')));

connectDB();

app.use(express.json());
app.use(cors());
app.use(express.static('.'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

app.post('/api/users', async (req, res) => {
    try {
        const { name, email, password, phoneNumber, address } = req.body;
        const user = new User({ name, email, password, phoneNumber, address });
        await user.save();
        // Here you would typically save the user to the database
        // For now, we'll just return the user data as a response
        res.status(201).json({ name, email, password, phoneNumber, address });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }   
}
);
app.post('/api/locations', async (req, res) => {
    try {
        const { name, address, coordinates } = req.body;
        const location = new Location({ name, address, coordinates });
        await location.save();
        // Here you would typically save the location to the database
        // For now, we'll just return the location data as a response
        res.status(201).json({ name, address, coordinates });
    }
    catch (error) {
        console.error('Error creating location:', error);
        res.status(500).json({ message: 'Server error' });
    }   
}
);
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/locations', async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};
startServer();
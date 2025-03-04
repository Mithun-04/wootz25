const Event = require('../models/Event');

// Create a new event
exports.createEvent = async (req, res) => {
    const { title, description, date, location } = req.body;

    try {
        const newEvent = new Event({
            title,
            description,
            date,
            location,
            organizer: req.userId,  // Assuming the user is authenticated
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get an event by ID
exports.getEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an event
exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, date, location } = req.body;

    try {
        let event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the logged-in user is the event creator
        if (event.createdBy.toString() !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Update event fields
        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.location = location || event.location;

        await event.save();
        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.createdBy.toString() !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await event.remove();
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

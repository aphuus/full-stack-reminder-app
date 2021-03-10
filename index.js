const path = require('path');
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Reminder = require('./models/reminder');

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(cors());

app.get('/api/reminders', (req, res) => {
  Reminder.find({}).then((reminders) => {
    res.json(reminders);
  });
});

app.get('/api/reminders/:id', (req, res) => {
  Reminder.findById(req.params.id)
    .then((reminder) => {
      if (reminder) {
        res.json(reminder);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ error: 'malformatted id' });
    });
});

app.delete('/api/reminders/:id', (req, res) => {
  Reminder.findByIdAndDelete(req.params.id)
    .then((reminder) => {
      if (reminder) {
        res.json(reminder);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
});

app.post('/api/reminders/', (req, res) => {
  const body = req.body;

  if (!body.name && !body.timestamp) {
    return res.status(400).json({
      error: 'name and timestamp missing',
    });
  }
  if (!body.name) {
    return res.status(400).json({
      error: 'name missing',
    });
  }
  if (!body.timestamp) {
    return res.status(400).json({
      error: 'timestamp missing',
    });
  }

  const reminder = new Reminder({
    name: body.name,
    timestamp: body.timestamp,
  });

  reminder.save().then((savedReminder) => {
    res.json(savedReminder);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const path = require('path');
const { response, request } = require('express');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// morgan logger
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(cors());

reminders = [
  {
    name: 'Buy some eggs',
    timestamp: '2021-11-10T13:00:00.141Z',
    id: 1,
  },
  {
    name: 'Make an omelette',
    timestamp: '2021-11-11T08:00:00.141Z',
    id: 2,
  },
  {
    name: 'Wash dishes',
    timestamp: '2021-11-11T09:00:00.000Z',
    id: 3,
  },
  {
    name: 'Buy more eggs',
    timestamp: '2021-11-11T13:00:00.000Z',
    id: 4,
  },
];

app.get('/api/reminders', (req, res) => {
  res.json(reminders);
});

app.get('/api/reminders/:id', (req, res) => {
  const id = Number(req.params.id);
  const reminder = reminders.find((reminder) => reminder.id === id);
  if (reminder) {
    res.json(reminder);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/reminders/:id', (req, res) => {
  const id = Number(req.params.id);
  reminders = reminders.filter((reminder) => reminder.id !== id);

  res.status(204).end();
});

const generateId = () => {
  const maxId =
    reminders.length > 0 ? Math.max(...reminders.map((x) => x.id)) : 0;
  return maxId + 1;
};

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
  if (
    reminders.some(
      (reminder) => reminder.name.toLowerCase() === body.name.toLowerCase()
    )
  ) {
    return res.status(400).json({
      error: 'name must be unique',
    });
  }

  const reminder = {
    name: body.name,
    timestamp: body.timestamp,
    id: generateId(),
  };

  reminders = reminders.concat(reminder);

  res.json(reminder);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

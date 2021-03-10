const mongoose = require('mongoose');

const password = process.argv[2];
const name = process.argv[3];
const timestamp = process.argv[4];

const url = `mongodb+srv://fullstack-aleksi:${password}@reminders-cluster.abgby.mongodb.net/reminder-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const reminderSchema = new mongoose.Schema({
  name: String,
  timestamp: String,
});

const Reminder = mongoose.model('Reminder', reminderSchema);

const reminder = new Reminder({
  name: name,
  timestamp: timestamp,
});

if (process.argv.length === 3) {
  Reminder.find({}).then((result) => {
    console.log(`Reminders:`);
    result.forEach((result) => {
      console.log(result.name, result.timestamp);
    });
    mongoose.connection.close();
  });
}

if (process.argv.length === 5) {
  reminder.save().then((response) => {
    console.log(
      `adding person Reminder ${name} at ${timestamp} to the reminder database`
    );
    mongoose.connection.close();
  });
}

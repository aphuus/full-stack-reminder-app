import React from 'react';
import axios from 'axios';

const RemindersList = (props) => {
  const { reminders, setReminders } = props;

  const handleDelete = (name, id) => {
    if (window.confirm(`Do you want to delete (${name})`)) {
      axios
        .delete(`http://localhost:3001/api/reminders/${id}`)
        .then(setReminders(reminders.filter((reminder) => reminder.id !== id)));
    }
  };

  return (
    <div>
      <h2>Reminders</h2>
      {reminders.map((reminder) => (
        <p key={reminder.id}>
          {reminder.timestamp} {reminder.name}
          <button onClick={() => handleDelete(reminder.name, reminder.id)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default RemindersList;

import { useEffect, useState } from 'react';
import axios from 'axios';
import ReminderForm from './components/ReminderForm';
import RemindersList from './components/RemindersList';

const App = () => {
  // initializing states
  const [reminders, setReminders] = useState([]);
  const [newName, setNewName] = useState('');
  const [newTime, setNewTime] = useState(new Date());

  // initializing timestamp formatting
  const dateOptions = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  // fetch intialized data from server -p3001 / reminders
  useEffect(() => {
    axios.get('http://localhost:3001/api/reminders').then((response) => {
      setReminders(response.data);
    });
  }, []);

  // handlers for state changing or form submitting
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleTimeChange = (time) => {
    setNewTime(time);
  };
  const handleNewReminder = (event) => {
    event.preventDefault();

    if (reminders.some((x) => x.name.toLowerCase() === newName.toLowerCase())) {
      window.alert(`${newName} is already in the topic list`);
      setNewName('');
      setNewTime(new Date());
    } else {
      const newReminderObject = {
        name: newName,
        timestamp: newTime.toLocaleString('fi-FI', dateOptions),
        id: reminders.length + 1,
      };
      setReminders(reminders.concat(newReminderObject));
      axios.post('http://localhost:3001/api/reminders', newReminderObject);
      setNewName('');
      setNewTime(new Date());
    }
  };

  return (
    <div>
      <ReminderForm
        handleNewReminder={handleNewReminder}
        newName={newName}
        handleNameChange={handleNameChange}
        handleTimeChange={handleTimeChange}
        newTime={newTime}
      />
      <RemindersList reminders={reminders} setReminders={setReminders} />
    </div>
  );
};

export default App;

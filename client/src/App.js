import { useEffect, useState } from 'react';
import axiosService from './services/reminders';
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
    axiosService.getAll().then((response) => setReminders(response));
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
      };
      setReminders(reminders.concat(newReminderObject));
      axiosService.create(newReminderObject);
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

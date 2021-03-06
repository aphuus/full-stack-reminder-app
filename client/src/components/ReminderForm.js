import React from 'react'
import DateTimePicker from 'react-datetime-picker'

function ReminderForm(props) {
  const {
    handleNewReminder,
    handleNameChange,
    handleTimeChange,
    newName,
    newTime,
  } = props

  return (
    <div>
      <h2>Add Reminder</h2>
      <form onSubmit={handleNewReminder}>
        <div>
          <label htmlFor='reminder-name'>Topic: </label>
          <input
            type='text'
            id='reminder-name'
            name='reminder-name'
            value={newName}
            required
            onChange={handleNameChange}
          />
        </div>
        <span>Time: </span>
        <DateTimePicker
          id='reminder-time'
          name='reminder-time'
          onChange={handleTimeChange}
          value={newTime}
          required
        />
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
    </div>
  )
}

export default ReminderForm

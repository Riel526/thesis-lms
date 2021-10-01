import { useContext } from 'react'
import AppContext from '../context/AppContext'
import Calendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'

export default function FullCalendar(props) {
  const { setModalAttributes } = useContext(AppContext)

  const handleDateClick = (e) => {
    // bind with an arrow function
    let today = new Date()
    today.setHours(0, 0, 0, 0)

    let tomorrow = new Date()

    if (e.date < today) {
      tomorrow.setDate(today.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)
    } else {
      tomorrow.setDate(e.date.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)
    }
  }

  const handleEventClick = (e) => {}

  return (
    <Calendar
      {...props}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={props.events}
      eventBackgroundColor="#E87D35"
      eventBorderColor="#E87D35"
      showNonCurrentDates={false}
      dateClick={(e) => handleDateClick(e)}
      eventDisplay={'auto'}
      eventClick={(e) => handleEventClick(e.event)}
      displayEventTime={props.displayEventTime}
    />
  )
}

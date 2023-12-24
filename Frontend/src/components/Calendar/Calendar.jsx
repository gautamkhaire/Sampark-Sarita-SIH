import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid'

import useCalendar from "./useCalendar";
import { createEventId } from "@/data/data";
import css from './Calendar.module.css';

const Calendar = () => {

  const { currentEvents, setCurrentEvents } = useCalendar()

  const handleEvents = async (events) => {
      await Promise.resolve(setCurrentEvents(events))
  }

  const handleDateSelect = (selectInfo) => {
      let title = prompt('Please enter a title for the event')
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect();


      if (title) {
          calendarApi.addEvent({
              id: createEventId(),
              title,
              start: selectInfo.start,
              end: selectInfo.end,
              allDay: selectInfo.allDay
          })
      }
  }

  const handleEventClick = (clickInfo) => {
      if (
          confirm('Are you sure you want to delete this event?')

      ) {
          clickInfo.event.remove()
      }
  }

  return (
          <div className={css.card}>
              <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                  headerToolbar={{

                      left: 'prev,next today',
                      center: "title",
                      right: "dayGridMonth,timeGridWeek,timeGridDay"

                  }}

                  allDaySlot={false}
                  initialView="timeGridWeek"
                  slotDuration={"01:00:00"}
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  weekends={true}
                  nowIndicator={true}
                  initialEvents={currentEvents}
                  eventsSet={handleEvents}
                  select={handleDateSelect}
                  eventClick={handleEventClick}
              />
          </div>
  )
}

export default Calendar
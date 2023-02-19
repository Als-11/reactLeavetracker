import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

const BigCalendar = ({ events }) => {
  console.log("eventssss", events);
  return (
    <>
      {events.length > 0 ? (
        <div>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            defaultDate={new Date("01-01-2020").setFullYear(
              new Date().getFullYear()
            )}
          />
        </div>
      ) : null}
    </>
  );
};
export default BigCalendar;

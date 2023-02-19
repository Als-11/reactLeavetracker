import React from "react";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";

const CalendarTimeline = ({ groups, items }) => {
  return (
    <div style={{ marginTop: "15px", marginBottom: "25px" }}>
      {items.length > 0 ? (
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={moment(
            new Date("01-01-2020").setFullYear(new Date().getFullYear())
          )}
          defaultTimeEnd={moment(
            new Date("12-31-2020").setFullYear(new Date().getFullYear())
          )}
        />
      ) : null}
    </div>
  );
};

export default CalendarTimeline;

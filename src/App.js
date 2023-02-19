import { useState } from "react";
import "./App.css";
import CalendarTimeline from "./containers/calendar-timeline";
import moment from "moment";
import { read, utils } from "xlsx";
import BigCalendar from "./containers/big-calendar";

function App() {
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [bgEvents, setBigevents] = useState([]);

  const onFileChange = (e) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = function () {
      const workBook = read(reader.result, { type: "binary", cellDates: true });
      const jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = utils.sheet_to_json(sheet);
        return initial;
      }, {});
      console.log(jsonData, "jsonDAta");
      const sheet = jsonData.Sheet1;
      const grps = jsonData.Sheet1.map((x) => ({
        id: x.__rowNum__,
        title: x.Name,
      }));
      console.log("grpsssss", grps);
      setGroups(grps);
      const events = [];
      const bigEvents = [];
      sheet.forEach((y) => {
        const vals = Object.keys(y);
        vals.forEach((x, i) => {
          if (x !== "Name") {
            events.push({
              id: parseInt(y.__rowNum__ + "" + i),
              group: y.__rowNum__,
              title: y[x],
              start_time: moment(x),
              end_time: moment(x).add(1, "day"),
            });
            bigEvents.push({
              id: parseInt(y.__rowNum__ + "" + i),
              title: `${y[x]} (${y.Name})`,
              start: moment(x),
              end: moment(x).add(1, "day"),
              allDay: true,
            });
          }
        });
        console.log("eventsss", events);
        setItems(events);
        setBigevents(bigEvents);
      });
    };
  };
  return (
    <div className="App">
      <input type={`file`} id={`file-upload`} onChange={onFileChange} />
      <CalendarTimeline groups={groups} items={items} />
      <BigCalendar events={bgEvents} />
    </div>
  );
}

export default App;

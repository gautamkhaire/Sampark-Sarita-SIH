import moment from "moment/moment";

let eventGuid = 0;
let todayStr = moment().format("YYYY-MM-DD"); // YYYY-MM-DD of today
export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "Meeting 1",
    start: todayStr + "T09:00:00",
  },
  {
    id: createEventId(),
    title: "Meeting 2",
    start: moment(todayStr).add(1, "days").format("YYYY-MM-DD") + "T16:00:00",
  },
  {
    id: createEventId(),
    title: "Meeting 3",
    start: moment(todayStr).add(2, "days").format("YYYY-MM-DD") + "T20:00:00",
  },
  {
    id: createEventId(),
    title: "Meeting 4",
    start: moment(todayStr).add(3, "days").format("YYYY-MM-DD") + "T09:00:00",
  },
  {
    id: createEventId(),
    title: "Meeting 5",
    start: moment(todayStr).add(5, "days").format("YYYY-MM-DD") + "T13:00:00",
  },
  {
    id: createEventId(),
    title: "Meeting 6",
    start: moment(todayStr).add(6, "days").format("YYYY-MM-DD") + "T13:00:00",
  },
];

export function createEventId() {
  return String(eventGuid++);
}


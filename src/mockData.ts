import { EventTypeEnum } from "./types/enums";
import { UserRecord } from "./types/interfaces";

export const MockUserRecords: UserRecord[] = [
  {
    id: "1",
    name: "佳佳",
    records: EventTypeEnum.COMPENSATORY,
    date: new Date("2024-12-09"),
    timeRange: {
      start: "09:00",
      end: "18:00",
    },
    hours: 9,
  },
  {
    id: "2",
    name: "佳佳",
    records: EventTypeEnum.OVERTIME,
    date: new Date("2024-12-17"),
    timeRange: {
      start: "13:00",
      end: "18:00",
    },
    hours: 5,
  },
  {
    id: "3",
    name: "佳佳",
    records: EventTypeEnum.COMPENSATORY,
    date: new Date("2024-12-20"),
    timeRange: {
      start: "09:00",
      end: "12:00",
    },
    hours: 3,
  },
  {
    id: "4",
    name: "佳佳",
    records: EventTypeEnum.OVERTIME,
    date: new Date("2024-12-23"),
    timeRange: {
      start: "09:00",
      end: "18:00",
    },
    hours: 9,
  },
  {
    id: "5",
    name: "佳佳",
    records: EventTypeEnum.COMPENSATORY,
    date: new Date("2024-12-24"),
    timeRange: {
      start: "13:00",
      end: "18:00",
    },
    hours: 5,
  },
];

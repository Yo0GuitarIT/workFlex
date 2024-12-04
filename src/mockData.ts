import { EventTypeEnum } from "./types/enums";
import { UserRecord } from "./types/interfaces";

export const MockUserRecords: UserRecord[] = [
  {
    id: "1",
    name: "佳佳",
    records: EventTypeEnum.OVERTIME,
    date: "2024-12-09",
    timeRange: {
      start: "09:00",
      end: "18:00",
    },
    hours: 9,
    createdAt: "2024-12-09 18:00:00",
  },
  {
    id: "2",
    name: "佳佳",
    records: EventTypeEnum.OVERTIME,
    date: "2024-12-17",
    timeRange: {
      start: "13:00",
      end: "18:00",
    },
    hours: 5,
    createdAt: "2024-12-17 18:00:00",
  },
  {
    id: "3",
    name: "佳佳",
    records: EventTypeEnum.COMPENSATORY,
    date: "2024-12-20",
    timeRange: {
      start: "09:00",
      end: "12:00",
    },
    hours: 3,
    createdAt: "2024-12-20 12:00:00",
  },
  {
    id: "4",
    name: "佳佳",
    records: EventTypeEnum.OVERTIME,
    date: "2024-12-23",
    timeRange: {
      start: "09:00",
      end: "18:00",
    },
    hours: 9,
    createdAt: "2024-12-23 18:00:00",
  },
  {
    id: "5",
    name: "佳佳",
    records: EventTypeEnum.COMPENSATORY,
    date: "2024-12-24",
    timeRange: {
      start: "13:00",
      end: "18:00",
    },
    hours: 5,
    createdAt: "2024-12-24 18:00:00",
  },
];

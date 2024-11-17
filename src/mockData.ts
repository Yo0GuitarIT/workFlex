import { DurationEnum, EventTypeEnum } from "./types/enums";
import { CalendarEvent } from "./types/interfaces";

export const MockData: CalendarEvent[] = [
  {
    id: "1",
    userId: "001",
    userName: "佳佳",
    date: "2024-11-1",
    type: EventTypeEnum.COMPENSATORY,
    duration: DurationEnum.FULL_DAY,
  },
  {
    id: "2",
    userId: "001",
    userName: "佳佳",
    date: "2024-11-09",
    type: EventTypeEnum.OVERTIME,
    duration: DurationEnum.FULL_DAY,
  },
  {
    id: "3",
    userId: "001",
    userName: "佳佳",
    date: "2024-11-17",
    type: EventTypeEnum.COMPENSATORY,
    duration: DurationEnum.HALF_DAY,
  },
  {
    id: "4",
    userId: "001",
    userName: "佳佳",
    date: "2024-11-23",
    type: EventTypeEnum.OVERTIME,
    duration: DurationEnum.HALF_DAY,
  },
];

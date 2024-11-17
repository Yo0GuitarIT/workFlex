import { DurationEnum, EventTypeEnum } from "./types/enums";
import { CalendarEvent } from "./types/interfaces";

export const MockData: CalendarEvent[] = [
  {
    id: "1",
    userId: "001",
    userName: "佳佳",
    date: "2024-11-09", // 加班日
    type: EventTypeEnum.OVERTIME,
    duration: DurationEnum.FULL_DAY,
  },
  {
    id: "2",
    userId: "001",
    userName: "佳佳",
    date: "2024-11-17", // 加班日
    type: EventTypeEnum.OVERTIME,
    duration: DurationEnum.HALF_DAY_AFTERNOON,
  },
  {
    id: "3",
    userId: "001",
    userName: "佳佳",
    date: "2024-11-20", // 補休日
    type: EventTypeEnum.COMPENSATORY,
    duration: DurationEnum.HALF_DAY_MORNING,
  },
  {
    id: "4",
    userId: "001",
    userName: "佳佳",
    date: "2024-11-23", //  加班日
    type: EventTypeEnum.OVERTIME,
    duration: DurationEnum.FULL_DAY,
  },
  {
    id: "5",
    userId: "001",
    userName: "佳佳",
    date: "2024-11-24", // 補休日
    type: EventTypeEnum.COMPENSATORY,
    duration: DurationEnum.HALF_DAY_AFTERNOON,
  }
];

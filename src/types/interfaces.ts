import { DurationEnum, EventTypeEnum } from "./enums";

export interface CalendarEvent {
  id: string;
  userId: string;
  userName: string;
  date: string; // YYYY-MM-DD
  type: EventTypeEnum;
  duration: DurationEnum;
}

import { EventTypeEnum } from "./enums";

/**
 * 時間範圍
 */
export interface TimeRange {
  start: string; // HH:mm
  end: string; // HH:mm
}

/**
 * 使用者紀錄
 */
export interface UserRecord {
  id: string;
  name: string;
  event: EventTypeEnum;
  date: Date;
  timeRange: TimeRange;
  hours: number;
}

export interface EditRecord {
  id: string;
  event: EventTypeEnum;
  date: Date;
  timeRange: TimeRange;
}

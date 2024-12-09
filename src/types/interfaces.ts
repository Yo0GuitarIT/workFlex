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
  records: EventTypeEnum;
  date: string; // YYYY-MM-DD
  timeRange: TimeRange;
  hours: number;
  createdAt: string; // YYYY-MM-DD HH:mm:ss
}

export interface EditRecord{
  record:string;
  date: string;
  startTime: string;
  endTime: string;
}
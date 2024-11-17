/** 
 * 事件類型
 * @enum {string}
 * @readonly
 */
export enum EventTypeEnum {
  /** 加班 */
  OVERTIME = "overtime",
  /** 補休 */
  COMPENSATORY = "compensatory",
}

/**
 * 時間長度
 * @enum {string}
 * @readonly
 */
export enum DurationEnum {
  /** 全天 */
  FULL_DAY = "fullDay",
  /** 上半天 */
  HALF_DAY_MORNING = "halfDayMorning",
  /** 下半天 */
  HALF_DAY_AFTERNOON = "halfDayAfternoon",
}

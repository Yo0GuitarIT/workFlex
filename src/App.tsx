import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CameraIcon,
  ClockIcon,
  DoubleArrowDownIcon,
  EraserIcon,
  Pencil1Icon,
  PersonIcon,
  CalendarIcon,
} from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn, formatDateToString } from "./lib/utils";

import { useEffect, useState } from "react";
import EventIndicator from "./components/EventIndicator";
import { MockUserRecords } from "./mockData";
import { EventTypeEnum } from "./types/enums";
import { EditRecord, UserRecord } from "./types/interfaces";
import { PlusCircleIcon } from "lucide-react";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [records, setRecords] = useState<UserRecord[]>([]);
  const [editRecord, setEditRecord] = useState<EditRecord>({
    id: "",
    record: "",
    date: new Date(),
    timeRange: {
      start: "",
      end: "",
    },
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const today = new Date();

  const weeks = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];

  /**
   * 切換至上個月
   * @returns {void}
   */
  const handlePrevMonth = (): void => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  /**
   * 切換至下個月
   * @returns {void}
   */
  const handleNextMonth = (): void => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  /**
   * 取得指定日期的事件
   * @param {number} year - 年份
   * @param {number} month - 月份
   * @param {number} day - 日期
   * @returns {UserRecord[]}
   */
  const getEventsForData = (
    year: number,
    month: number,
    day: number,
  ): UserRecord[] => {
    // 將日期資料轉換成日期資料型態 yyyy-MM-dd
    const dateData = new Date(year, month, day);
    // 將日期資料轉換成字串
    const targetDateStr = formatDateToString(dateData);
    // 取得符合日期的事件
    return records.filter((event) => {
      // 轉換事件日期成字串
      const eventDateStr = formatDateToString(event.date);
      return eventDateStr === targetDateStr;
    });
  };

  const handleEditRecord = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: string,
  ) => {
    setEditRecord((prev) => ({
      ...prev,
      [item]: e.target.value,
    }));
  };

  const handleDialogOnClick = (record: UserRecord) => {
    setEditRecord((prev) => ({
      ...prev,
      id: record.id,
      record: record.records as unknown as string,
      date: record.date,
      timeRange: { start: record.timeRange.start, end: record.timeRange.end },
    }));
  };

  const handleCalenderOnSelect = (date: Date | undefined) => {
    if (date) {
      setEditRecord((prev) => ({
        ...prev,
        date: date,
      }));
    }
  };

  const handleRadioGroupOnValueChange = (event: string) => {
    setEditRecord((prev) => ({
      ...prev,
      record: event,
    }));
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    setEditRecord((prev) => ({
      ...prev,
      id: id,
    }));

    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === id
          ? {
              ...record,
              records: (editRecord.record as EventTypeEnum) || record.records,
              date: editRecord.date || record.date,
              timeRange: {
                start: editRecord.timeRange.start || record.timeRange.start,
                end: editRecord.timeRange.end || record.timeRange.end,
              },
            }
          : record,
      ),
    );

    setEditRecord({
      id: "",
      record: "",
      date: new Date(),
      timeRange: {
        start: "",
        end: "",
      },
    });
  };

  const handleDeleteRecord = (id: string) => {
    setRecords((prevRecords) =>
      prevRecords.filter((record) => record.id !== id),
    );
  };

  useEffect(() => {
    // 模擬API取得資料
    setTimeout(() => {
      setRecords(MockUserRecords);
    }, 1000);
  }, []);

  return (
    <div className="w-100vw">
      <div className="mb-2 bg-slate-400 p-2">
        <div className="flex justify-between">
          <p className="text-3xl font-bold">{`${today.getFullYear()}-${
            today.getMonth() + 1
          }-${today.getDate()}`}</p>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon">
                <DoubleArrowDownIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Hi,佳佳 🕊</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>登出</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mx-2 flex justify-between">
        <div className="flex items-center gap-2">
          <Button size="icon" onClick={handlePrevMonth}>
            <ArrowLeftIcon />
          </Button>
          <p>{`${year}年${month + 1}月`}</p>
          <Button size="icon" onClick={handleNextMonth}>
            <ArrowRightIcon />
          </Button>
        </div>
        <Button variant="outline">
          <PlusCircleIcon />
          新增
        </Button>
      </div>

      <div className="my-2 bg-gray-300 p-2">
        <div className="mb-1 grid grid-cols-7 gap-1">
          {weeks.map((week, i) => (
            <div className="w-full bg-blue-100 text-center" key={i}>
              {week}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 grid-rows-5 gap-1">
          {Array.from({ length: 35 }).map((_, i) => {
            // 當天日期號碼
            const dayNumber = i - firstDay + 1;

            // 是否為今天
            const isToday =
              dayNumber === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();

            // 取得當天的事件
            const dayEvents = getEventsForData(year, month, dayNumber);

            return (
              <div key={i} className="h-16 w-full bg-white">
                {dayNumber > 0 && dayNumber <= daysInMonth ? (
                  <div className="flex">
                    <div className="flex flex-col items-center gap-1">
                      <p
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${isToday ? "bg-blue-100" : ""}`}
                      >
                        {dayNumber}
                      </p>
                      {dayEvents.length > 0 && (
                        <>
                          {dayEvents.map((event) => (
                            <EventIndicator
                              key={event.id}
                              color={
                                event.records === EventTypeEnum.OVERTIME
                                  ? "red"
                                  : "green"
                              }
                            />
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="my-2 flex flex-col space-y-2">
        <p className="text-2xl">本月紀錄</p>
        {records?.map((record) => (
          <Card key={record.id}>
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-400">
                  {record.records === EventTypeEnum.OVERTIME ? (
                    <ClockIcon />
                  ) : (
                    <CameraIcon />
                  )}
                </div>
                <Separator orientation="vertical" className="mx-2" />
                <div>
                  <p>
                    {formatDateToString(record.date)}
                    {record.records === EventTypeEnum.OVERTIME
                      ? " 加班"
                      : " 補休"}
                  </p>
                  <div className="flex space-x-2">
                    <PersonIcon />
                    <p className="text-sm text-gray-600">
                      {record.name}・{record.timeRange.start}~
                      {record.timeRange.end}・{record.hours}小時
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDialogOnClick(record)}
                    >
                      <Pencil1Icon />
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>編輯</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>修改加班或補休紀錄</DialogDescription>
                    <form
                      className="space-y-2"
                      id={editRecord.id}
                      onSubmit={(e) => handleOnSubmit(e, editRecord.id)}
                    >
                      <RadioGroup
                        defaultValue={editRecord.record}
                        onValueChange={handleRadioGroupOnValueChange}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={EventTypeEnum.OVERTIME}
                            className="text-zinc-500 focus:ring-zinc-900 data-[state=checked]:bg-zinc-900 data-[state=checked]:text-white"
                          />
                          <Label htmlFor={EventTypeEnum.OVERTIME}>加班</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={EventTypeEnum.COMPENSATORY}
                            className="text-zinc-500 focus:ring-zinc-900 data-[state=checked]:bg-zinc-900 data-[state=checked]:text-white"
                          />
                          <Label htmlFor={EventTypeEnum.COMPENSATORY}>
                            補修
                          </Label>
                        </div>
                      </RadioGroup>

                      <div className="space-x-2">
                        <Label htmlFor="date">日期</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !record.date && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon />
                              {record.date ? (
                                formatDateToString(editRecord.date)
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={record.date}
                              onSelect={handleCalenderOnSelect}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Label htmlFor="startTime">開始時間</Label>
                        <Input
                          className="w-32"
                          id="startTime"
                          defaultValue={editRecord.timeRange.start}
                          onChange={(e) => handleEditRecord(e, "startTime")}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Label htmlFor="endTime">結束時間</Label>
                        <Input
                          className="w-32"
                          id="endTime"
                          defaultValue={editRecord.timeRange.end}
                          onChange={(e) => handleEditRecord(e, "endTime")}
                        />
                      </div>

                      <DialogFooter className="mt-4">
                        <DialogClose asChild>
                          <Button type="submit">儲存</Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDeleteRecord(record.id)}
                >
                  <EraserIcon />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;

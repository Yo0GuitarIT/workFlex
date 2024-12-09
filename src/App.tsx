import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CameraIcon,
  ClockIcon,
  DoubleArrowDownIcon,
  EraserIcon,
  Pencil1Icon,
  PersonIcon,
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

import { useEffect, useState } from "react";
import EventIndicator from "./components/EventIndicator";
import { MockUserRecords } from "./mockData";
import { EventTypeEnum } from "./types/enums";
import { EditRecord, UserRecord } from "./types/interfaces";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [records, setRecords] = useState<UserRecord[]>([]);
  const [editRecord, setEditRecord] = useState<EditRecord>({
    id: "",
    record: "",
    date: "",
    startTime: "",
    endTime: "",
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
   * @param {string} date
   * @returns {UserRecord[]}
   */
  const getEventsForData = (date: string): UserRecord[] => {
    return MockUserRecords.filter((event) => event.date === date);
  };

  /**
   * 格式化日期
   * @param {number} year
   * @param {number} month
   * @param {number} day
   * @returns {string}
   */
  const formatDate = (year: number, month: number, day: number): string => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day,
    ).padStart(2, "0")}`;
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

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    console.log(id);
    e.preventDefault();
    setEditRecord((prev) => ({
      ...prev,
      id: id,
    }));

    console.log("submit", editRecord);

    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === id
          ? {
              ...record,
              records: (editRecord.record as EventTypeEnum) || record.records,
              date: editRecord.date || record.date,
              timeRange: {
                start: editRecord.startTime || record.timeRange.start,
                end: editRecord.endTime || record.timeRange.end,
              },
            }
      : record,
      ),
    );

    setEditRecord({
      id: "",
      record: "",
      date: "",
      startTime: "",
      endTime: "",
    });
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

      <div className="mx-2 flex items-center gap-2">
        <Button size="icon" onClick={handlePrevMonth}>
          <ArrowLeftIcon />
        </Button>
        <p>{`${year}年${month + 1}月`}</p>
        <Button size="icon" onClick={handleNextMonth}>
          <ArrowRightIcon />
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
            const day = i - firstDay + 1;
            const isToday =
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();
            const currentDate = formatDate(year, month, day);
            const dayEvents = getEventsForData(currentDate);
            return (
              <div key={i} className="h-16 w-full bg-white">
                {day > 0 && day <= daysInMonth ? (
                  <div className="flex">
                    <div className="flex flex-col items-center gap-1">
                      <p
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${isToday ? "bg-blue-100" : ""}`}
                      >
                        {day.toString()}
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
                    {record.date.split("-")[1]}/{record.date.split("-")[2]}
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
                    <Button variant="outline" size="icon">
                      <Pencil1Icon />
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>編輯</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>修改加班或補休紀錄</DialogDescription>
                    <form
                      id={record.id}
                      onSubmit={(e) => handleOnSubmit(e, record.id)}
                    >
                      <RadioGroup
                        defaultValue={record.records}
                        onValueChange={(value) =>
                          handleEditRecord(
                            {
                              target: { value },
                            } as React.ChangeEvent<HTMLInputElement>,
                            "record",
                          )
                        }
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

                      <Label htmlFor="date">日期</Label>
                      <Input
                        id="date"
                        defaultValue={record.date}
                        onChange={(e) => handleEditRecord(e, "date")}
                      />

                      <Label htmlFor="startTime">開始時間</Label>
                      <Input
                        id="startTime"
                        defaultValue={record.timeRange.start}
                        onChange={(e) => handleEditRecord(e, "startTime")}
                      />

                      <Label htmlFor="endTime">結束時間</Label>
                      <Input
                        id="endTime"
                        defaultValue={record.timeRange.end}
                        onChange={(e) => handleEditRecord(e, "endTime")}
                      />

                      <DialogFooter className="mt-4">
                        <DialogClose asChild>
                          <Button type="submit">儲存</Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" size="icon">
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

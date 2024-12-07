import "@radix-ui/themes/styles.css";
import {
  Theme,
  Heading,
  Container,
  IconButton,
  Flex,
  Box,
  Grid,
  Text,
  Avatar,
  Card,
  Separator,
  Badge,
  Button,
  TextField,
  SegmentedControl,
} from "@radix-ui/themes";
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
} from "@/components/ui/dropdown-menu"


import { useState } from "react";
import EventIndicator from "./components/EventIndicator";
import { MockUserRecords } from "./mockData";
import { EventTypeEnum } from "./types/enums";
import { UserRecord } from "./types/interfaces";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  return (
    <Theme>
      <Container size="1">
        <Box p="2" mb="2" style={{ backgroundColor: "var(--blue-5)" }}>
          <Flex justify="between" align="center" gap="2">
            <Heading>{`${today.getFullYear()}-${
              today.getMonth() + 1
            }-${today.getDate()}`}</Heading>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <IconButton>
                  <DoubleArrowDownIcon />
                </IconButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>Hi,佳佳 🕊</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>登出</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Flex>
        </Box>

        <Box pb="2">
          <Flex gap="2">
            <IconButton onClick={handlePrevMonth}>
              <ArrowLeftIcon />
            </IconButton>
            <Heading>{`${year}年${month + 1}月`}</Heading>
            <IconButton onClick={handleNextMonth}>
              <ArrowRightIcon />
            </IconButton>
          </Flex>
        </Box>

        <Box p="2" style={{ backgroundColor: "var(--gray-3)" }}>
          <Box mb="2">
            <Grid columns="7">
              {weeks.map((week, i) => (
                <Box key={i} style={{ backgroundColor: "var(--blue-5)" }}>
                  <Flex justify="center">
                    <Text>{week}</Text>
                  </Flex>
                </Box>
              ))}
            </Grid>
          </Box>
          <Grid columns="7" rows="5" gap="1">
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - firstDay + 1;
              const isToday =
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();
              const currentDate = formatDate(year, month, day);
              const dayEvents = getEventsForData(currentDate);
              return (
                <Box
                  key={i}
                  p="1"
                  style={{
                    backgroundColor: "var(--gray-1)",
                    aspectRatio: "1",
                  }}
                >
                  {day > 0 && day <= daysInMonth ? (
                    <>
                      <Dialog>
                        <DialogTrigger>
                          <Box width="100%" height="100%">
                            <Flex direction="column" justify="center">
                              {isToday ? (
                                <>
                                  <Avatar size="1" fallback={day.toString()} />
                                  {dayEvents.length > 0 && (
                                    <Flex>
                                      <EventIndicator color="green" />
                                    </Flex>
                                  )}
                                </>
                              ) : (
                                <>
                                  <Text>{day}</Text>
                                  {dayEvents.length > 0 && (
                                    <Flex>
                                      {dayEvents.map((event) => (
                                        //todo: 未來拓展多人同天事件
                                        <EventIndicator
                                          key={event.id}
                                          color={
                                            event.records ===
                                            EventTypeEnum.OVERTIME
                                              ? "red"
                                              : "green"
                                          }
                                        />
                                      ))}
                                    </Flex>
                                  )}
                                </>
                              )}
                            </Flex>
                          </Box>
                        </DialogTrigger>

                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </>
                  ) : null}
                </Box>
              );
            })}
          </Grid>
        </Box>
        <Flex my="2" gap="2" direction="column">
          <Heading>本月紀錄</Heading>
          {MockUserRecords.map((record) => (
            <Card key={record.id}>
              <Flex align="center" justify="between">
                <Flex align="center" gap="2">
                  <Badge
                    size="2"
                    color={
                      record.records === EventTypeEnum.OVERTIME
                        ? "blue"
                        : "green"
                    }
                  >
                    {record.records === EventTypeEnum.OVERTIME ? (
                      <ClockIcon />
                    ) : (
                      <CameraIcon />
                    )}
                  </Badge>
                  <Separator orientation="vertical" size="3" />
                  <Flex direction="column">
                    <Text>
                      {record.date.split("-")[1]}/{record.date.split("-")[2]}
                      {record.records === EventTypeEnum.OVERTIME
                        ? "加班"
                        : "補休"}
                    </Text>
                    <Flex align="center" gap="2">
                      <PersonIcon />
                      <Text size="2" color="gray">
                        {record.name}・{record.timeRange.start}~
                        {record.timeRange.end}・{record.hours}小時
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex gap="2">
                  <IconButton color="orange" variant="surface">
                    <Dialog>
                      <DialogTrigger>
                        <Pencil1Icon />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>編輯</DialogTitle>

                        <Flex direction="column" gap="2">
                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              類型
                            </Text>
                            <SegmentedControl.Root
                              defaultValue={record.records}
                            >
                              <SegmentedControl.Item
                                value={EventTypeEnum.OVERTIME}
                              >
                                加班
                              </SegmentedControl.Item>
                              <SegmentedControl.Item
                                value={EventTypeEnum.COMPENSATORY}
                              >
                                補休
                              </SegmentedControl.Item>
                            </SegmentedControl.Root>
                          </label>
                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              日期
                            </Text>
                            <TextField.Root
                              defaultValue={record.date}
                              placeholder="輸入您的日期"
                            />
                          </label>
                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              開始時間
                            </Text>
                            <TextField.Root
                              defaultValue={record.timeRange.start}
                              placeholder="輸入您的開始時間"
                            />
                          </label>
                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              結束時間
                            </Text>
                            <TextField.Root
                              defaultValue={record.timeRange.end}
                              placeholder="輸入您的結束時間"
                            />
                          </label>
                        </Flex>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="soft">儲存</Button>
                          </DialogClose>
                          <DialogClose>
                            <Button variant="soft" color="gray">
                              取消
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </IconButton>
                  <IconButton color="red" variant="surface">
                    <EraserIcon />
                  </IconButton>
                </Flex>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Container>
    </Theme>
  );
}

export default App;

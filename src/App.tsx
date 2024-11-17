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
  Dialog,
  Card,
  Separator,
} from "@radix-ui/themes";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CameraIcon,
  ClockIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const today = new Date();

  const weeks = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <Theme>
      <Container size="1">
        <Box p="2" mb="2" style={{ backgroundColor: "var(--blue-5)" }}>
          <Flex justify="between" align="center" gap="2">
            <Heading>{`${today.getFullYear()}-${
              today.getMonth() + 1
            }-${today.getDate()}`}</Heading>

            <Text>補休剩餘時間 0 天</Text>
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
          <Grid columns="7" rows="5" gap="2">
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - firstDay + 1;
              const isToday =
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();
              return (
                <Box
                  key={i}
                  p="1"
                  style={{
                    backgroundColor: "var(--blue-2)",
                    aspectRatio: "1",
                  }}
                >
                  {day > 0 && day <= daysInMonth ? (
                    <>
                      <Dialog.Root>
                        <Dialog.Trigger>
                          <Box
                            width="100%"
                            height="100%"
                            onClick={() => {
                              console.log("click");
                            }}
                          >
                            <Avatar
                              size="2"
                              color={isToday ? "red" : "indigo"}
                              radius="full"
                              fallback={
                                day > 0 && day <= daysInMonth ? day : ""
                              }
                            />
                          </Box>
                        </Dialog.Trigger>

                        <Dialog.Content>
                          <Dialog.Title>編輯</Dialog.Title>
                          <Dialog.Description size="2" mb="4">
                            Make changes to your profile.
                          </Dialog.Description>
                        </Dialog.Content>
                      </Dialog.Root>
                    </>
                  ) : null}
                </Box>
              );
            })}
          </Grid>
        </Box>
        <Flex my="2" gap="2" direction="column">
          <Heading>本月紀錄</Heading>
          <Card>
            <Flex gap="3" align="center">
              <Box
                style={{
                  borderRadius: "0.5rem",
                  backgroundColor: "var(--green-4)",
                  width: "2rem",
                  height: "2rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ClockIcon />
              </Box>
              <Separator orientation="vertical" size="3" />
              <Flex direction="column">
                <Text>11/17 加班</Text>
                <Flex align="center" gap="2">
                  <PersonIcon />
                  <Text size="2" color="gray">
                    整天
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>

          <Card>
            <Flex gap="3" align="center">
              <Box
                style={{
                  borderRadius: "0.5rem",
                  backgroundColor: "var(--orange-4)",
                  width: "2rem",
                  height: "2rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CameraIcon />
              </Box>
              <Separator orientation="vertical" size="3" />
              <Flex direction="column">
                <Text>11/20 補修</Text>
                <Flex align="center" gap="2">
                  <PersonIcon />
                  <Text size="2" color="gray">
                   下半天
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </Theme>
  );
}

export default App;

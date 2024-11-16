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
} from "@radix-ui/themes";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const weeks = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <>
      <Theme>
        <Container size="4">
          <Box p="2">
            <Flex gap="2" justify="center">
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
        </Container>
      </Theme>
    </>
  );
}

export default App;

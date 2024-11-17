import { CameraIcon, PersonIcon, ClockIcon } from "@radix-ui/react-icons";
import { Card, Flex, Box, Separator, Text } from "@radix-ui/themes";
import { EventTypeEnum } from "../types/enums";

interface RecordCardProps {
  userName: string;
  date: string;
  type: string;
  duration: string;
}

function RecordCard({ date, type, userName, duration }: RecordCardProps) {
  /**
   * Formats a date string in the format "YYYY-MM-DD" to "MM/DD".
   * @param  {string} date
   * @returns {string}
   */
  const formatDate = (date: string): string => {
    const [_year, month, day] = date.split("-");
    return `${month}/${day}`;
  };

  const formatType = (type: string): string => {
    return type === "overtime" ? "加班" : "補休";
  };

  const formatDuration = (duration: string): string => {
    let result = "";
    switch (duration) {
      case "fullDay":
        result = "整天";
        break;
      case "halfDayMorning":
        result = "上半天";
        break;
      case "halfDayAfternoon":
        result = "下半天";
        break;
    }
    return result;
  };

  return (
    <Card>
      <Flex gap="3" align="center">
        <Box
          style={{
            borderRadius: "0.5rem",
            backgroundColor: type === EventTypeEnum.OVERTIME ? "var(--red-4)" : "var(--green-4)",
            width: "2rem",
            height: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        {type === EventTypeEnum.OVERTIME ? <ClockIcon /> : <CameraIcon />}
        </Box>
        <Separator orientation="vertical" size="3" />
        <Flex direction="column">
          <Text>
            {`${formatDate(date)}`} {formatType(type)}
          </Text>
          <Flex align="center" gap="2">
            <PersonIcon />
            <Text size="2" color="gray">
              {userName}・{formatDuration(duration)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}

export default RecordCard;

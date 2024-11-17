import { Box } from "@radix-ui/themes";

enum IndicatorEnum {
  green = "var(--green-9)",
  red = "var(--red-9)",
}

interface IndicatorProps {
  color: keyof typeof IndicatorEnum;
}

function EventIndicator({ color }: IndicatorProps) {
  return (
    <Box
      mr="1"
      style={{
        borderRadius: "100%",
        backgroundColor: IndicatorEnum[color],
        width: "0.5rem",
        height: "0.5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></Box>
  );
}

export default EventIndicator;

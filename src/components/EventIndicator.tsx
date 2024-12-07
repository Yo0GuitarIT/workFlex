interface IndicatorProps {
  color: "green" | "red";
}

function EventIndicator({ color }: IndicatorProps) {
  return (
    <div
      className={`mr-1 flex h-2 w-2 items-center justify-center rounded-full ${
        color === "green" ? "bg-green-500" : "bg-red-500"
      }`}
    />
  );
}

export default EventIndicator;

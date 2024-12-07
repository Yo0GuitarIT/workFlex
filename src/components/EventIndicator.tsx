interface IndicatorProps {
  color: "green" | "red";
}

function EventIndicator({ color }: IndicatorProps) {
  return (
    <div
      className={`mr-1 rounded-full w-2 h-2 flex justify-center items-center ${
        color === "green" ? "bg-green-500" : "bg-red-500"
      }`}
    />
    
  );
}

export default EventIndicator;

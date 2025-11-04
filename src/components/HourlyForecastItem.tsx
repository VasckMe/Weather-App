interface HourlyForecastItemProps {
    time: string;
    iconName: string;
    temp: string;
    isNow?: boolean;
  }
  
  export const HourlyForecastItem = ({
    time,
    iconName,
    temp,
    isNow = false,
  }: HourlyForecastItemProps) => {
    
    const containerClasses = isNow
      ? "bg-primary/20 text-primary border border-primary"
      : "bg-background-dark/50 dark:bg-black/20";
    
    const timeClasses = isNow ? "text-sm font-bold" : "text-sm";
  
    return (
      <div
        className={`flex-shrink-0 w-24 p-4 rounded-lg flex flex-col items-center ${containerClasses}`}
      >
        <p className={timeClasses}>{time}</p>
        <span className="material-symbols-outlined my-2 text-3xl">{iconName}</span>
        <p className="font-bold">{temp}</p>
      </div>
    );
  };
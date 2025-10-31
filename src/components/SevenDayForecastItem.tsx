interface SevenDayForecastItemProps {
    day: string;
    iconName: string;
    description: string;
    temps: string;
  }
  
  export const SevenDayForecastItem = ({
    day,
    iconName,
    description,
    temps,
  }: SevenDayForecastItemProps) => {
    return (
      <div className="flex items-center justify-between bg-background-dark/50 dark:bg-black/20 p-3 rounded-lg">
        <p className="font-medium w-1/4">{day}</p>
        <div className="flex items-center w-1/4">
          <span className="material-symbols-outlined text-primary mr-2">
            {iconName}
          </span>
          <span>{description}</span>
        </div>
        <p className="w-1/4 text-center">{temps}</p>
      </div>
    );
  };
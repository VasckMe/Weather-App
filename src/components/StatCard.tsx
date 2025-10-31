interface StatCardProps {
    iconName: string;
    title: string;
    value: string;
  }
  
  export const StatCard = ({ iconName, title, value }: StatCardProps) => {
    return (
      <div className="bg-background-dark/50 dark:bg-black/20 p-4 rounded-lg flex flex-col items-center justify-center">
        <span className="material-symbols-outlined text-primary mb-2">
          {iconName}
        </span>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">{value}</p>
      </div>
    );
  };
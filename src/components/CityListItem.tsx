interface CityListItemProps {
    icon: string;
    cityName: string;
    countryCode: string;
    temperature: number;
    weatherDescription: string;
}

export const CityListItem = ({ icon, cityName, countryCode, temperature, weatherDescription } : CityListItemProps) => {
    return <div className="w-200 h-fit rounded-lg flex justify-between p-2 items-center shadow-md bg-white dark:bg-[#111618] shadow-sm">
        <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-lg bg-background-light dark:bg-[#283339] size-12">
                <span>{icon}</span>
            </div>
            <div className="flex flex-col justify-center">
                <span className="text-gray-800 dark:text-white">{cityName}</span>
                <span className="text-gray-600 dark:text-[#9db0b9]">{temperature}°C</span>
            </div>
        </div>
        <div>
            <button className="flex items-center justify-center  px-4 bg-[#283339] text-white text-sm hover:bg-gray-700">View details</button>
        </div>
    </div>
}

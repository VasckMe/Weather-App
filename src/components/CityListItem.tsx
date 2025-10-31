import { Link } from 'react-router-dom';

interface CityListItemProps {
    icon: string;
    cityName: string;
    countryCode: string;
    temperature: number;
    weatherDescription: string;
}

export const CityListItem = ({ icon, cityName, countryCode, temperature, weatherDescription } : CityListItemProps) => {
    return (
        <div className="w-200 h-fit rounded-lg flex justify-between p-2 items-center shadow-md bg-[#111618] shadow-sm">
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-lg bg-background-light dark:bg-[#283339] size-12">
                    <span>{icon}</span>
                </div>
                <div className="flex flex-col justify-center">
                    <span className="text-white">{cityName}</span>
                    <span className="text-[#9db0b9]">{temperature}°C</span>
                </div>
            </div>
            <div>
                <Link 
                    to={`/details/${cityName}`} 
                    className="flex items-center justify-center rounded-lg px-4 py-2 bg-[#283339] text-white text-sm hover:bg-gray-700" 
                >
                    View details
                </Link>
            </div>
        </div>
    )
}
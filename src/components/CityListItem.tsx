interface CityListItemProps {
    icon: string;
    cityName: string;
    countryCode: string;
    temperature: number;
    weatherDescription: string;
}

export const CityListItem = ({ icon, cityName, countryCode, temperature, weatherDescription } : CityListItemProps) => {
    return <div className="w-100 h-fit rounded-md border border-neutral-400 flex justify-between p-2 items-center shadow-md">
        <div className="flex item-center">
            <span>(icon)</span>
            <div className="flex flex-col">
                <span>(cityName), (countryCode)</span>
                <span>(weatherDescription)</span>
            </div>
        </div>
        <div>
            <span className="text-xl font bold">(temperature)</span>
        </div>
    </div>
}
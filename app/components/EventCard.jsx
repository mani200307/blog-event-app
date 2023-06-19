import React, { useEffect, useState } from 'react';

const EventCard = ({ timeline, name, venue, startDate, time, categ, desc }) => {
    const [day, setDay] = useState();
    const [month, setMonth] = useState("");
    const [convtime, setConvTime] = useState();

    const convertTime = (time) => {
        const [hours, minutes, seconds] = time.split(':');
        const d = new Date();
        d.setHours(hours);
        d.setMinutes(minutes);
        d.setSeconds(seconds);
        const formattedTime = d.toLocaleString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        return formattedTime;
    };

    useEffect(() => {
        const date = new Date(startDate);
        const options = { day: 'numeric', month: 'short' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        setDay(formattedDate.split(' ')[1]);
        setMonth(formattedDate.split(' ')[0]);
        const resTime = convertTime(time);
        setConvTime(resTime);
    }, [timeline, startDate, time]);

    return (
        <div className="cursor-context-menu lg:flex lg:w-fit xs:w-64 rounded-lg shadow-lg">
            <div className="bg-gray-500 rounded-lg lg:w-36 py-4 block shadow-inner">
                <div className="text-center tracking-wide">
                    <div className="text-white font-bold text-4xl ">{day}</div>
                    <div className="text-white font-normal text-2xl">{month}</div>
                    <div className="text-white font-normal mt-1 text-sm">{convtime}</div>
                </div>
            </div>
            <div className="w-96 h-fit xs:w-64 lg:w-11/12 xl:w-full px-1 bg-white py-5 lg:px-2 lg:py-2">
                <div className="font-semibold text-gray-900 text-2xl text-center lg:text-left px-2">
                    {name}
                </div>
                <div className="flex ml-1 xs:justify-center lg:justify-between mt-2 xs:gap-2">
                    <div className="text-black w-fit p-0.5 bg-gray-100 rounded-full font-medium text-xs text-center lg:text-left px-2">
                        {venue}
                    </div>
                    <div className="text-white w-fit p-0.5 bg-gray-500 rounded-full font-medium text-xs text-center lg:text-left px-2">
                        {categ}
                    </div>
                </div>
                <div className="text-gray-800 lg:w-96 text-sm pt-1 text-center lg:text-left px-2">
                    {desc}
                </div>
            </div>
        </div>
    );
};

export default EventCard;

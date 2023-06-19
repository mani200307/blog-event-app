import React, { useEffect, useState } from 'react';

const EventCard = ({ timeline, name, venue, startDate, time, categ, desc }) => {
    const [day, setDay] = useState();
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
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
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        setDay(formattedDate.split(' ')[1].replace(',', ''));
        setMonth(formattedDate.split(' ')[0]);
        setYear(formattedDate.split(' ')[2]);

        const resTime = convertTime(time);
        setConvTime(resTime);
    }, [timeline, startDate, time]);

    return (
        <div className="cursor-context-menu lg:flex lg:w-fit md:flex md:w-fit sm:w-64 xs:w-64 rounded-lg shadow-lg">
            <div className="bg-gray-500 rounded-lg lg:w-36 md:w-36 py-4 block shadow-inner">
                <div className="text-center tracking-wide">
                    <div className="text-white font-bold text-4xl ">{day}</div>
                    <div className="text-white font-normal text-2xl">{month}</div>
                    <div className="text-white font-normal text-lg">{year}</div>
                    <div className="text-white font-normal mt-1 text-sm">{convtime}</div>
                </div>
            </div>
            <div className="w-96 h-fit sm:w-64 xs:w-64 lg:w-11/12 md:w-11/12 xl:w-full px-1 py-5 md:px-2 md:py-2 lg:px-2 lg:py-2">
                <div className="font-semibold text-2xl text-center lg:text-left px-2">
                    {name}
                </div>
                <div className="flex ml-1 sm:justify-center xs:justify-center lg:justify-between md:justify-between mt-2 xs:gap-2">
                    <div className="w-fit p-0.5 bg-base-300 rounded-full font-medium text-xs text-center md:text-left lg:text-left px-2">
                        {venue}
                    </div>
                    <div className="text-white w-fit p-0.5 bg-gray-500 rounded-full font-medium text-xs text-center md:text-left lg:text-left px-2">
                        {categ}
                    </div>
                </div>
                <div className="lg:w-96 md:w-96 text-sm pt-1 text-center md:text-left lg:text-left px-2">
                    {desc}
                </div>
            </div>
        </div>
    );
};

export default EventCard;

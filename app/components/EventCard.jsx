"use client"

import React, { useEffect, useState } from 'react'

const EventCard = ({ name, venue, startDate, time, categ, desc }) => {

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
    }

    useEffect(() => {
        var date = new Date(startDate);
        var day = date.getDate();
        setDay(day)
        var month = date.toLocaleString('default', { month: 'long' });
        setMonth(month)

        var resTime = convertTime(time)
        setConvTime(resTime)
    }, []);

    return (
        <div className="lg:flex lg:w-fit xs:w-64 rounded-lg shadow-lg">
            <div className="bg-gray-400 rounded-lg lg:w-36 py-4 block shadow-inner">
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
                <div className='flex ml-1 xs:justify-center lg:justify-between mt-2 xs:gap-2'>
                    <div className="text-gray-600 w-fit bg-gray-100 rounded-full font-medium text-xs text-center lg:text-left px-2">
                        {venue}
                    </div>
                    <div className="text-black w-fit bg-gray-300 rounded-full font-medium text-xs text-center lg:text-left px-2">
                        {categ}
                    </div>
                </div>
                <div className="text-gray-800 lg:w-96 text-sm pt-1 text-center lg:text-left px-2">
                    {desc}
                </div>
            </div>
        </div>
    )
}

export default EventCard
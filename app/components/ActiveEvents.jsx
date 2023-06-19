"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';

const ActiveEvents = () => {
    const [events, setEvents] = useState([]);
    const [curDate, setCurDate] = useState();
    const [isLogged, setIsLogged] = useState(""); // Move isLogged declaration here

    useEffect(() => {
        const supabase = createClientComponentClient();

        const getData = async () => {
            const date = new Date();
            var getYear = date.toLocaleString("default", { year: "numeric" });
            var getMonth = date.toLocaleString("default", { month: "2-digit" });
            var getDay = date.toLocaleString("default", { day: "2-digit" });
            var dateFormat = getYear + "-" + getMonth + "-" + getDay;
            setCurDate(dateFormat);
            console.log(dateFormat);

            const { data, error } = await supabase
                .from('events')
                .select("*")
                .eq('date', dateFormat);

            console.log(data);
            setEvents(data);
        };

        getData();

        function getCookie(name) {
            var cookieArr = document.cookie.split(";");

            for (var i = 0; i < cookieArr.length; i++) {
                var cookiePair = cookieArr[i].split("=");

                if (name == cookiePair[0].trim()) {
                    return decodeURIComponent(cookiePair[1]);
                }
            }

            return null;
        }

        const getCurUser = async () => {
            var isLogged = getCookie("isLogged");
            try {
                if (isLogged != "") {
                    const user = await supabase.auth.getUser();
                    setIsLogged(user.data.user.email);
                    console.log(user.data.user.email);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getCurUser();
    }, []);

    return (
        <>
            {isLogged && (
                <div className='flex flex-col gap-2'>
                    <h1 className="text-2xl">Events Active Today</h1>
                    <div className='mt-5 space-y-3'>
                        {events && events.map((event, index) => (
                            curDate === event.date && (
                                <EventCard
                                    key={index}
                                    name={event.name}
                                    venue={event.venue}
                                    startDate={event.date}
                                    time={event.time}
                                    desc={event.body}
                                    categ={event.category}
                                />
                            )
                        ))}
                    </div>
                    {!events.length && <h1>No events today..</h1>}
                </div>
            )}
        </>
    );
};

export default ActiveEvents;

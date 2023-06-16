"use client"

import Header from '@/app/components/Header'
import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import EventCard from '@/app/components/EventCard'

const Page = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {

        const supabase = createClientComponentClient()

        const getData = async () => {
            const { data, error } = await supabase
                .from('events')
                .select("*")

            console.log(data);
            setEvents(data);
        }

        getData();

    }, [])

    return (
        <div className="h-screen bg-white pt-8 px-4 flex-1">
            <Header type='View Events' />
            <div className='mt-10 grid lg:grid-cols-3 lg:gap-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-2'>
                {events.map((event, index) => (
                    <EventCard key={index} name={event.name} venue={event.venue} startDate={event.date} time={event.time} desc={event.body} categ={event.category} />
                ))}
            </div>
        </div>
    )
}

export default Page
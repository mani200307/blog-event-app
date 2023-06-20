"use client"

import Header from '@/app/components/Header';
import React, { useEffect, useState } from 'react';
import EventCard from '@/app/components/EventCard';
import pic from '../../assets/filter.png';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const Page = () => {
    const [events, setEvents] = useState([]);
    const [category, setCategory] = useState();
    const supabase = createClientComponentClient();
    const [timeline, setTimeline] = useState("All Events");
    const [loading, setLoading] = useState(false);
    const [len, setLen] = useState(1);

    const clearFilter = () => {
        const getData = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('events')
                .select("*")
                .order('date', { ascending: true });

            setLoading(false);
            setEvents(data);
            setLen(data.length);
        };
        getData();
    };

    const applyFilter = () => {
        const getData = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('events')
                .select("*")
                .eq('category', category);

            setLoading(false);
            setEvents(data);
            setLen(data.length);
        };
        getData();
    };

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('date', { ascending: true });

            setLoading(false)
            setEvents(data);
            setLen(data.length);
        };
        getData();
    }, []);

    const timelineChanged = (e) => {
        const timeline = e.target.value;
        const currentDate = new Date().toISOString().slice(0, 10);
        setTimeline(timeline);

        if (timeline === 'Past Events') {
            const getData = async () => {
                setLoading(true)
                const { data, error } = await supabase
                    .from('events')
                    .select('*')
                    .lt('date', currentDate)
                    .order('date', { ascending: true });

                setLoading(false)
                setEvents(data);
                setLen(data.length);
            };
            getData();
        } else if (timeline === 'Upcoming Events') {
            const getData = async () => {
                setLoading(true)
                const { data, error } = await supabase
                    .from('events')
                    .select('*')
                    .gte('date', currentDate)
                    .order('date', { ascending: true });

                setLoading(false)
                setEvents(data);
                setLen(data.length);
            };
            getData();
        } else {
            const getData = async () => {
                setLoading(true)
                const { data, error } = await supabase
                    .from('events')
                    .select('*')
                    .order('date', { ascending: true });

                setLoading(false)
                setEvents(data);
                setLen(data.length);
            };
            getData();
        }
    };

    return (
        <div className="h-screen overflow-x-hidden overflow-scroll pt-8 px-4 flex-1">
            <Header type="Events" />
            <select onChange={timelineChanged} className="select -ml-3 mt-6 items-center select-sm border-none">
                <option value="All Events">All Events</option>
                <option value="Past Events">Past Events</option>
                <option value="Upcoming Events">Upcoming Events</option>
            </select>
            <div className="flex mt-2 gap-10">
                <button onClick={() => window.my_modal_2.showModal()}>
                    <div className="w-10 rounded-full flex gap-2">
                        <Image alt="filter" width={20} height={20} src={pic} />
                        <span className="no-underline">Filter</span>
                    </div>
                </button>
                <div onClick={clearFilter} className="border-gray-500 bg-gray-400 flex items-center hover:cursor-pointer px-2 rounded-full">
                    <h1 className="text-black text-sm mr-1">X</h1>
                    <span className="no-underline text-sm text-white">Clear Filter</span>
                </div>
            </div>
            <dialog id="my_modal_2" className="modal">
                <form method="dialog" className="modal-box w-fit">
                    <h1 className="text-xl">Filter</h1>
                    <div className="w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-lg">Category</span>
                        </label>
                        <select onChange={(e) => setCategory(e.target.value)} className="select select-sm select-bordered">
                            <option disabled>Select category</option>
                            <option value="Other">Other</option>
                            <option value="Music">Music</option>
                            <option value="News">News</option>
                            <option value="Technology">Technology</option>
                            <option value="Sports">Sports</option>
                            <option value="Art">Art</option>
                        </select>
                    </div>
                    <button onClick={applyFilter} className="mt-4 btn">Apply</button>
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            {loading && <span className="mb-3 mt-1 loading loading-spinner loading-md"></span>}
            <div className="mt-10 mb-3 space-y-5 gap-2">
                {events.map((event, index) => (
                    <EventCard
                        key={index}
                        timeline={timeline}
                        name={event.name}
                        venue={event.venue}
                        startDate={event.date}
                        time={event.time}
                        desc={event.body}
                        categ={event.category}
                    />
                ))}
            </div>
            {len == 0 && <h1>No records..</h1>}
        </div>
    );
};

export default Page;

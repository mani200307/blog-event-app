"use client"

import Header from '@/app/components/Header'
import React, { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Page = () => {
    const supabase = createClientComponentClient()
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState("");
    const [venue, setVenue] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState("");
    const [category, setCategory] = useState("");
    const [body, setBody] = useState("");

    const createEvent = async () => {
        try {
            setLoading(true);

            const { error } = await supabase
                .from('events')
                .insert({ name: title, category: category, venue: venue, date: startDate, time: time, body: body })
                .single()

            console.log({ name: title, category: category, venue: venue, date: startDate, time: time, body: body });

            alert("Event created successfully");

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="w-full flex mt-7 lg:flex-col md:flex-col sm:flex-col xs:flex-col">
            <Header type='Schedule event' />
            <div className="h-full flex lg:flex-row md:flex-row sm:flex-col xs:flex-col gap-5 mt-4 pt-8">
                <div className="form-control lg:flex-1 md:flex-1 flex-col space-y-5 w-full max-w-xs">
                    <div>
                        <label className="label">
                            <span className="label-text text-black text-lg">What is your event name?</span>
                        </label>
                        <input type="text" placeholder="Event name" onChange={(e) => setTitle(e.target.value)} className="input input-bordered border-gray-300 max-w-xs w-60" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text text-black text-lg">Where is that happening?</span>
                        </label>
                        <input type="text" placeholder="Event Venue" onChange={(e) => setVenue(e.target.value)} className="input input-bordered border-gray-300 max-w-xs w-60" />
                    </div>
                    <div className="w-full max-w-xs">
                        <label className="label">
                            <span className="label-texttext-lg">What is your event category?</span>
                        </label>
                        <select onChange={(e) => setCategory(e.target.value)} className="select select-md select-bordered border-gray-300">
                            <option disabled>Select category</option>
                            <option defaultChecked>Music</option>
                            <option>News</option>
                            <option>Technology</option>
                            <option>Sports</option>
                            <option>Art</option>
                        </select>
                    </div>
                </div>
                <div className="form-control flex-1 flex-col space-y-5 w-full max-w-xs mb-3">
                    <div>
                        <label className="label">
                            <span className="label-text text-black text-lg">When is that happening?</span>
                        </label>
                        <div className='ms-1'>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='hover:cursor-pointer hover:font-semibold' />
                        </div>
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text text-black text-lg">At what time?</span>
                        </label>
                        <input type="time" placeholder="Event time" onChange={(e) => setTime(e.target.value)} className="input input-bordered border-gray-300 max-w-xs w-60" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text text-lg">About your event</span>
                        </label>
                        <textarea onChange={(e) => setBody(e.target.value)} placeholder="Event description" className="input input-lg input-bordered border-gray-300max-w-xs w-80 h-60" />
                    </div>
                    <button onClick={createEvent} className='btn w-fit'>CREATE</button>
                </div>
            </div>
        </form>
    )
}

export default Page
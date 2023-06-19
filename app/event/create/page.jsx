"use client"

import Header from '@/app/components/Header'
import React, { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Page = () => {
    const supabase = createClientComponentClient()
    const [title, setTitle] = useState("");
    const [venue, setVenue] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState("");
    const [category, setCategory] = useState("");
    const [body, setBody] = useState("");
    const [isCreated, setIsCreated] = useState(false);

    const resetForm = () => {
        setTitle('');
        setVenue('');
        setStartDate(new Date());
        setTime('');
        setCategory('');
        setBody('');
    }

    const createEvent = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('events')
                .insert({ name: title, category: category, venue: venue, date: startDate, time: time, body: body })
                .single()

            setIsCreated(true);
            resetForm();

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="h-full overflow-x-hidden w-full flex mt-7 lg:flex-col md:flex-col sm:flex-col xs:flex-col">
            <Header type='Schedule Event' />
            {
                isCreated &&
                <div className="alert w-fit mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Event created successfully</span>
                </div>
            }
            <div className="flex lg:flex-row md:flex-row sm:flex-col xs:flex-col gap-5 mt-2 pt-4">
                <div className="form-control lg:flex-1 md:flex-1 flex-col space-y-5 w-full max-w-xs">
                    <div>
                        <label className="label">
                            <span className="label-text text-lg">What is your event name?</span>
                        </label>
                        <input type="text" placeholder="Event name" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered max-w-xs w-60" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text text-lg">Where is that happening?</span>
                        </label>
                        <input type="text" placeholder="Event Venue" value={venue} onChange={(e) => setVenue(e.target.value)} className="input input-bordered max-w-xs w-60" />
                    </div>
                    <div className="w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-lg">What is your event category?</span>
                        </label>
                        <select onChange={(e) => setCategory(e.target.value)} value={category} className="select select-md select-bordered">
                            <option>Select Category</option>
                            <option>Other</option>
                            <option>Music</option>
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
                            <span className="label-text text-lg">When is that happening?</span>
                        </label>
                        <div className='ms-1'>
                            <input type='date' value={startDate} className='cursor-pointer bg-inherit' onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text text-lg">At what time?</span>
                        </label>
                        <input type="time" placeholder="Event time" value={time} onChange={(e) => setTime(e.target.value)} className="input input-bordered cursor-pointer max-w-xs w-60" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text text-lg">About your event</span>
                        </label>
                        <textarea onChange={(e) => setBody(e.target.value)} value={body} placeholder="Event description" className="input input-lg input-bordered max-w-xs w-80 h-60" />
                    </div>
                    <button onClick={createEvent} className='btn btn-neutral w-fit'>CREATE</button>
                </div>
            </div>
        </form>
    )
}

export default Page
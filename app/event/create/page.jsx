"use client"

import Header from '@/app/components/Header'
import React, { use, useState } from 'react'
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
    const [errTitle, setErrTitle] = useState(' ');
    const [errVenue, setErrVenue] = useState(' ');
    const [errStartDate, setErrStartDate] = useState(' ');
    const [errTime, setErrTime] = useState(' ');
    const [errCategory, setErrCategory] = useState('Select a Category');
    const [errBody, setErrBody] = useState(' ');
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setTitle('');
        setVenue('');
        setStartDate(new Date());
        setTime('');
        setCategory('');
        setBody('');
    }

    const validateForm = (e) => {
        const { name, value } = e.target;

        if (name === 'title') {
            if (value.trim() === '') {
                setErrTitle("It shouldn't be empty");
            } else {
                setErrTitle('');
            }
            setTitle(value);
        } else if (name === 'venue') {
            if (value.trim() === '') {
                setErrVenue("It shouldn't be empty");
            } else {
                setErrVenue('');
            }
            setVenue(value);
        } else if (name === 'startDate') {
            if (value.trim() === '') {
                setErrStartDate("It shouldn't be empty");
            } else {
                setErrStartDate('');
            }
            setStartDate(value);
        } else if (name === 'category') {
            if (value.trim() === 'Select Category') {
                setErrCategory("Select a category");
            } else {
                setErrCategory('');
            }
            setCategory(value);
        }
        else if (name === 'body') {
            if (value.trim() === '') {
                setErrBody("It shouldn't be empty");
            } else {
                setErrBody('');
            }
            setBody(value);
        } else if (name === 'time') {
            if (value.trim() === '') {
                setErrTime("It shouldn't be empty");
            } else {
                setErrTime('');
            }
            setTime(value);
        }
    };

    const createEvent = async (e) => {
        e.preventDefault();
        if (!(errTitle !== '' || errBody !== '' || errCategory !== '' || errStartDate !== '' || errTime !== '' || errVenue !== '')) {
            setLoading(true);
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
            setLoading(false);
        }
    };

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
            <div className='flex flex-col mt-2 pt-4'>
                <div className="flex lg:flex-row md:flex-row sm:flex-col xs:flex-col gap-5">
                    <div className="form-control lg:flex-1 md:flex-1 flex-col space-y-5 w-full max-w-xs">
                        <div>
                            <label className="label">
                                <span className="label-text text-lg">What is your event name?</span>
                            </label>
                            <div className="flex flex-col">
                                <input name='title' type="text" placeholder="Event name" value={title} onChange={validateForm} className="input input-bordered max-w-xs w-60" />
                                {errTitle !== '' && <span className="text-sm text-red-500 max-w-xs mt-2">{errTitle}</span>}
                            </div>
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text text-lg">Where is that happening?</span>
                            </label>
                            <div className="flex flex-col">
                                <input name='venue' type="text" placeholder="Event Venue" value={venue} onChange={validateForm} className="input input-bordered max-w-xs w-60" />
                                {errVenue !== '' && <span className="text-sm text-red-500 max-w-xs mt-2">{errVenue}</span>}
                            </div>
                        </div>
                        <div className="w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg">What is your event category?</span>
                            </label>
                            <div className="flex flex-col">
                                <select name='category' onChange={validateForm} value={category} className="select select-md select-bordered">
                                    <option>Select Category</option>
                                    <option>Other</option>
                                    <option>Music</option>
                                    <option>News</option>
                                    <option>Technology</option>
                                    <option>Sports</option>
                                    <option>Art</option>
                                </select>
                                {errCategory !== '' && <span className="text-sm text-red-500 max-w-xs mt-2">{errCategory}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="form-control flex-1 flex-col space-y-5 w-full max-w-xs mb-3">
                        <div>
                            <label className="label">
                                <span className="label-text text-lg">When is that happening?</span>
                            </label>
                            <div className='ms-1 w-fit'>
                                <div className="flex flex-col">
                                    <input name='startDate' type='date' value={startDate} className='cursor-pointer bg-inherit' onChange={validateForm} />
                                    {errStartDate !== '' && <span className="text-sm text-red-500 max-w-xs mt-2">{errStartDate}</span>}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text text-lg">At what time?</span>
                            </label>
                            <div className="flex flex-col">
                                <input name='time' type="time" placeholder="Event time" value={time} onChange={validateForm} className="input input-bordered cursor-pointer max-w-xs w-60" />
                                {errTime !== '' && <span className="text-sm text-red-500 max-w-xs mt-2">{errTime}</span>}
                            </div>
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text text-lg">About your event</span>
                            </label>
                            <div className="flex flex-col">
                                <textarea name='body' onChange={validateForm} value={body} placeholder="Event description" className="input input-lg input-bordered max-w-xs w-80 h-60" />
                                {errBody !== '' && <span className="text-sm text-red-500 max-w-xs mt-2">{errBody}</span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button onClick={createEvent} className='btn btn-neutral w-fit mb-2'>CREATE</button>
                </div>
            </div>
            {loading && <h1>Loading..</h1>}
        </form>
    )
}

export default Page
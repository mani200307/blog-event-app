"use client"

import Link from 'next/link'
import React from 'react'
import useStore from '../context/store'

const Sidebar = () => {

    const toggleButton = useStore(state => state.toggleButton)
    const setToggleButton = useStore(state => state.setToggleButton)

    const toggleButtonAction = () => {
        setToggleButton()
    }

    console.log(toggleButton);

    return (
        <div className='h-screen gap-5 w-1/3 px-4 pt-8 pb-4 flex flex-col'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center pl-1 gap-4'>
                    <h1 className='text-2xl font-medium'>BlogEvent</h1>
                </div>
                <input type="checkbox" onClick={toggleButtonAction} className="toggle toggle-info" />
            </div>
            <div className={'flex flex-col items-start gap-2 mt-3'}>
                <Link href='/blog/create' className='text-xl flex items-center cursor-pointer hover:bg-slate-100 rounded w-full overflow-hidden whitespace-nowrap'><h1>Create Blog</h1></Link>
                <Link href='/blog/view' className='text-xl flex items-center cursor-pointer hover:bg-slate-100 rounded w-full overflow-hidden whitespace-nowrap'><h1>View Blogs</h1></Link>
                <Link href='/event/create' className='text-xl flex items-center cursor-pointer hover:bg-slate-100 rounded w-full overflow-hidden whitespace-nowrap'><h1>Schedule Event</h1></Link>
                <Link href='/event/view' className='text-xl flex items-center cursor-pointer hover:bg-slate-100 rounded w-full overflow-hidden whitespace-nowrap'><h1>View Events</h1></Link>
            </div>
        </div>
    )
}

export default Sidebar
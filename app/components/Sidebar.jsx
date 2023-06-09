"use client"

import React from 'react'
import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/outline';

const Sidebar = () => {

    return (
        <div className="drawer h-screen w-1/12 bg-slate-200 gap-5 flex flex-col">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col pt-5 px-2 items-center justify-center">
                    <label htmlFor="my-drawer-2" className="btn bg-slate-300 drawer-button lg:hidden">
                        <Bars3Icon
                            className="block h-5 w-5 text-white"
                            aria-hidden="true"
                        />
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <div className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center pl-1 gap-4'>
                                <Link href='/'><h1 className='text-2xl font-medium cursor-pointer'>BlogEvent</h1></Link>
                            </div>
                        </div>
                        <div className={'flex flex-col items-start gap-2 mt-3'}>
                            <Link href='/blog/create' className='text-xl flex items-center cursor-pointer hover:bg-slate-100 rounded w-full overflow-hidden whitespace-nowrap'><h1>Create Blog</h1></Link>
                            <Link href='/blog/view' className='text-xl flex items-center cursor-pointer hover:bg-slate-100 rounded w-full overflow-hidden whitespace-nowrap'><h1>View Blogs</h1></Link>
                            <Link href='/event/create' className='text-xl flex items-center cursor-pointer hover:bg-slate-100 rounded w-full overflow-hidden whitespace-nowrap'><h1>Schedule Event</h1></Link>
                            <Link href='/event/view' className='text-xl flex items-center cursor-pointer hover:bg-slate-100 rounded w-full overflow-hidden whitespace-nowrap'><h1>View Events</h1></Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <div className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center pl-1 gap-4'>
                        <Link href='/'><h1 className='text-2xl font-medium cursor-pointer'>BlogEvent</h1></Link>
                        </div>
                    </div>
                    <div className={'flex flex-col items-start gap-2 mt-3'}>
                        <Link href='/blog/create' className='text-xl flex items-center cursor-pointer hover:bg-slate-100 rounded w-full overflow-hidden whitespace-nowrap'><h1>Create Blog</h1></Link>
                        <Link href='/blog/view' className='text-xl flex items-center cursor-pointer hover:bg-slate-100 rounded w-full overflow-hidden whitespace-nowrap'><h1>View Blogs</h1></Link>
                        <Link href='/event/create' className='text-xl flex items-center cursor-pointer hover:bg-slate-100 rounded w-full overflow-hidden whitespace-nowrap'><h1>Schedule Event</h1></Link>
                        <Link href='/event/view' className='text-xl flex items-center cursor-pointer hover:bg-slate-100 rounded w-full overflow-hidden whitespace-nowrap'><h1>View Events</h1></Link>
                    </div>
                </div>
            </div> */}
        </div>

    )
}

export default Sidebar